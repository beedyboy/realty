import Property from "../models/Property";
import dbConnect from "../utils/dbConnect";

dbConnect();

export default async function (req, res) {
  try {
    const {
      query: { id },
    } = req;

    await Property.findById(id, (err, doc) => {
      //  console.log({doc}, 'id: ', id)
      if (err) {
        return res.status(400).send({ success: false, err });
      } else {
        return res.status(200).send({ success: true, data: doc });
      }
    }).catch((err) => {
      console.log({ err });
      res.send({ success: false, err });
    });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
}
