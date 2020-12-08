import { 
  Box,
  Text, 
  Skeleton,
  SimpleGrid,
  Flex, 
  Container, 
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react"; 
import shortId from "short-id";
import Head from "next/head";
import ClientLayout from "../../../templates/client/ClientLayout"; 
import { observer } from "mobx-react";
import { MdChevronRight, MdCheckCircle } from "react-icons/md"; 
import PerfectScrollBar from "react-perfect-scrollbar";
import NormalCard from "../../../components/Card/NormalCard";
import { useMobxStores } from "../../../stores/stores";


const forRent = (props) => {
  const { query } = props;
  const { productStore } = useMobxStores();
  const { getProductById, loading, rents } = productStore;
  const [data, setData] = useState({
    id: "",
    title: "",
    numOfBedRooms: "",
    city: "",
    province: "",
    category: "",
    price: "",
    numOfBathRooms: "",
    propertyType: "",
    images: [],
    isSaleOrRent: "",
    numOfGarages: "",
    petsAllowed: "",
    furnished: "",
    serviced: "",
    shared: "",
    description: "",
  });

  const [activeImage, setActiveImage] = useState("");
  useEffect(() => { 
    const { forrent, reference } = query;
    // getProductById(reference);
    console.log({forrent})
  }, []);

  useEffect(() => {
    const rp = rents && rents._id;
    if (rp) {
      setData((state) => ({
        ...state,
        id: rents._id,
        title: rents.title,
        numOfBedRooms: rents.numOfBedRooms,
        city: rents.city,
        province: rents.province,
        category: rents.category,
        price: rents.price,
        numOfBathRooms: rents.numOfBathRooms,
        propertyType: rents.propertyType,
        isSaleOrRent: rents.isSaleOrRent,
        numOfGarages: rents.numOfGarages,
        petsAllowed: rents.petsAllowed,
        furnished: rents.furnished,
        serviced: rents.serviced,
        images: JSON.parse(rents.images),
        shared: rents.shared,
        description: rents.description,
      }));
    }
  }, [rents]);
  
return (
    <>
      <Head>
        <title>Property for rent</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientLayout>
        <Box
          // height={["auto", "35rem"]}
          pt={["5rem", "7rem"]}
          pb="3rem"
          w="100vw"
        >
          <PerfectScrollBar>
         

            <Container mt="1rem" maxW="xl" d="flex" bg="teal">
              <Flex
                align={["center", "flex-start"]}
                flexDir={["column", "row"]}
                justify={["space-between"]}
                w="100%"
              >
                <Box flexBasis="60%">
                <Skeleton isLoaded={!loading}>
          <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="10px">
            {rents &&
              rents.map((property) => <NormalCard key={property._id} data={property} />)}
          </SimpleGrid>
        </Skeleton>
                </Box>
                <Box flexBasis="30%">
                  <Text>
                  filter here
                  </Text>
                </Box>
              </Flex>
            </Container>
          </PerfectScrollBar>
        </Box>

        
      </ClientLayout>
    </>
  );
};
forRent.getInitialProps = async ({ query }) => {
  return { query };
};

export default observer(forRent);
 