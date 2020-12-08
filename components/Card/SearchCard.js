import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const SearchCard = ({ data }) => {
  const imageUrl = JSON.parse(data.images);
  const setMeta = () => {
    let title = "";
    if (data.propertyType) {
      title += `${data.propertyType} for ${data.isSaleOrRent} `;
    }
    if (data.city) {
      title += ` in ${data.city}`;
    }
    return title;
  };
  const features = () => {
    switch (data.category) {
      case "land":
        return null;
        break;

      case "house":
        return (
          <>
            <Flex justify="space-between" align="space-between">
              <i className="fa fa-bed"></i> {data.numOfBedRooms}
              <i className="fa fa-bathtub"></i> {data.numOfBathRooms}
              <i className="fa fa-car"></i> {data.numOfGarages}
            </Flex>
          </>
        );
        break;

      default:
        break;
    }
  };
  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="10px">
        <Box flexBasis={["100%", "30%", "30%"]}>
          {" "}
          <Image boxSize="230px" src={imageUrl[0]} alt={data.title} />
        </Box>
        <Box flexBasis={["100%", "30%", "30%"]}>
          {" "}
          <Flex flexDir="column" align="space-between" justify="space-between">
            <Flex
              flexDir="row"
              align="space-between"
              justify="space-between"
              borderBottom="2px"
            >
              <Text color="tomato">{data.price || ""}</Text>
              {features()}
            </Flex>
            <Link href={`/property/details?reference=${data._id}`}>
              <a> {setMeta()} </a>
            </Link>
            <i className="fa fa-map-marker"></i>{" "}
            {` ${data.city} ${data.province}`}
            <Box>
              <a
                href={`https://api.whatsapp.com/send?phone=23437351836&amp;text=Hi ${`/property/details?reference=${data._id}`};source=&amp;data=&amp;app_absent=`}
                className="float"
                target="_blank"
              >
                <i className="fa fa-whatsapp"></i>
              </a>
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default SearchCard;
