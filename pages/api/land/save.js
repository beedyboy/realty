import nextConnect from "next-connect";
import middleware from "../middleware/middleware";
import Property from "../models/Property";
import dotenv from "dotenv";
import helper from "../utils/helper";
import dbConnect from "../utils/dbConnect";
const handler = nextConnect();

dotenv.config();
handler.use(middleware);
dbConnect();
handler.post(async (req, res) => {
  try {
    const {
      city,
      province,
      price,
      category,
      propertyType,
      isSaleOrRent,
      title,
      description,
    } = req.body;
    let urls = [];
    var image = JSON.parse(JSON.stringify(req.files)).image;

    var imageSize = Object.keys(image).length;
    //  console.log('total  size ', imageSize )

    let count = 0;

    if (imageSize > 0) {
      let pay_image = {
        main_image: "",
        first_image: "",
      };

      for (const [key, value] of Object.entries(image)) {
        console.log("path: ", key);
        await helper.uploader(value.path).then((newPath) => {
          console.log(newPath.url);
          urls.push(newPath.url);
          // fs.unlinkSync(value[0].path);
        });
        count += 1;
      }
    }

    // do stuff with files and body
    if (count === imageSize) {
      let images = JSON.stringify(urls);
      const newProperty = await Property.create({
        province: province,
        city: city,
        price: price,
        images: images,
        title: title,
        propertyType: propertyType,
        isSaleOrRent: isSaleOrRent,
        category: category,
        description: description,
      });
      newProperty.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
          success: true,
          data: doc,
          message: "New property created successfully",
        });
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

handler.put(async (req, res) => {
  res.end("async/await is also supported!");
});
handler.patch(async (req, res) => {
  throw new Error("Throws me around! Error can be caught and handled.");
});

handler.get(async (req, res) => {
  try {
    const lands = await Property.find({category: 'land'});
    res.status(200).json({ success: true, data: lands });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
