import { Box, Container, Divider, Flex, IconButton, Image, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { MdRoom } from "react-icons/md";
import { FaBath } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";

const NormalCard = ({ data }) => {
  const imageUrl = JSON.parse(data.images); 
 const features = () => { 
    switch (data.category) {
      case 'land':
        return null;
        break;
    
      case 'house':
         return (
         <>
         <i className="fa fa-bed"></i> {data.numOfBedRooms}
         <i className="fa fa-bathtub"></i> {data.numOfBathRooms}
         <i className="fa fa-car"></i> {data.numOfGarages}
           {/* <IconButton icon={<MdRoom />} size="sm" /> {data.numOfBedRooms} Bedrooms
            <IconButton icon={<GiHomeGarage />} size="sm" /> {data.numOfBathRooms} Bathrooms
            <IconButton icon={<GiHomeGarage />} size="sm" /> {data.numOfGarages} Garages */}
      </>
         )
        break;
    
      default:
        break;
    }
  }
  return (
    <>
      <Link href={`/property/details?reference=${data._id}`}>
      <a>
      <Box
        mt="5px"
        mb="2rem"
        height="300px"
        backgroundColor="white"
        display="flex"
        // maxW={['sm', 'lg']}
        w={[300, 360, 460]}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
          <Flex align="space-between" justify="space-between" flexDir="column">
              <Container maxW="xl" display="flex">
                  <Flex justifyContent="space-between" flexDir="column">
      
          <Text>{data.title || ""}</Text>
          <Spacer />
          <Flex align="space-between" justify="space-between">
            <Image boxSize="230px" src={imageUrl[0]} alt={data.title} />
            <Spacer />
            <Flex flexDir="column" align="space-between" justify="space-between">
            <Text color="gray.500">{data.description || ""}</Text>
            <Divider />
            <Container><Text color="tomato">{data.price || ""}</Text></Container>
            </Flex>
          </Flex>
          </Flex>
        </Container>
        <Spacer />
          <Box  backgroundColor="#99C5CE"  w="100%" height="40px">
            {features()} 
           
          </Box>
        </Flex>
       
      </Box>
      </a></Link>
    </>
  );
};

export default NormalCard;
