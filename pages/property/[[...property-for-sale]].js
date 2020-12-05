import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    List,
    ListItem,
    ListIcon,
    Box,
    Text,
    Heading,
    Skeleton,
    Flex,
    Center,
    Stack,
    Image,
    Container,
    Spacer,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useMobxStores } from "../../stores/stores"; 
  import shortId from "short-id";
  import Head from "next/head";
  import ClientLayout from "../../templates/client/ClientLayout"; 
  import { observer } from "mobx-react";
  import { MdChevronRight, MdCheckCircle } from "react-icons/md";
  import SubscribeForm from "../../components/NewsLetter/SubscribeForm";
  import PerfectScrollBar from "react-perfect-scrollbar";
import NormalCard from "../../components/Card/NormalCard";
  
 
  const forSale = (props) => {
    const { query } = props;
    const { productStore } = useMobxStores();
    const { getProductById, loading, sales } = productStore;
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
      const { forSale, reference } = query;
      getProductById(reference);
    }, []);
 
    useEffect(() => {
      const rp = product && product._id;
      if (rp) {
        setData((state) => ({
          ...state,
          id: product._id,
          title: product.title,
          numOfBedRooms: product.numOfBedRooms,
          city: product.city,
          province: product.province,
          category: product.category,
          price: product.price,
          numOfBathRooms: product.numOfBathRooms,
          propertyType: product.propertyType,
          isSaleOrRent: product.isSaleOrRent,
          numOfGarages: product.numOfGarages,
          petsAllowed: product.petsAllowed,
          furnished: product.furnished,
          serviced: product.serviced,
          images: JSON.parse(product.images),
          shared: product.shared,
          description: product.description,
        }));
      }
    }, [product]);
    const change_image = (e) => {
      setActiveImage(e);
    };
  return (
      <>
        <Head>
          <title>Property for sale</title>
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
              {sales &&
                sales.map((property) => <NormalCard key={property._id} data={property} />)}
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
  forSale.getInitialProps = async ({ query }) => {
    return { query };
  };
  
  export default observer(forSale);
   