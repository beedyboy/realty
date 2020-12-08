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
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import shortId from "short-id";
import Head from "next/head";
import ClientLayout from "../../templates/client/ClientLayout";
import UAParser from "ua-parser-js";
// import { isMobile } from 'react-device-detect';
import { observer } from "mobx-react";
import { MdChevronRight, MdCheckCircle } from "react-icons/md";
import SubscribeForm from "../../components/Forms/SubscribeForm";
import PerfectScrollBar from "react-perfect-scrollbar";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 40,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

const details = (props) => {
  const { query } = props;
  const { productStore } = useMobxStores();
  const { getProductById, loading, product } = productStore;
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
    const { details, reference } = query;
    getProductById(reference);
  }, []);
  //   useEffect(() => {
  //     if(typeof window !== "undefined") {
  //         const userAgent = window.navigator.userAgent;
  //         const parser = new UAParser();
  //         parser.setUA(userAgent)
  //         const result = parser.getResult();
  //         deviceType = (result.device && result.device.type) || "desktop"
  //         console.log('dt', {deviceType})
  //     }

  // }, []);
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
  const features = () => {
    const rp = product && product._id;
    if (rp) {
      switch (data.category) {
        case "land":
          return null;
          break;

        case "house": 
             return (
             <>
              <ListItem>
              <ListIcon as={MdCheckCircle} color="green.500" />
               {data.numOfBathRooms} Bathroom
            </ListItem>
            <ListItem>
            <ListIcon as={MdCheckCircle} color="green.500" />
             {data.numOfBedRooms} Bedrooms
          </ListItem>
          <ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" />
             {data.numOfGarages} Garages
          </ListItem>
          </>
             )
          break;

        default:
          return null;
          break;
      }
    } else {
      return <ListItem>loading...</ListItem>;
    }
  };
  const slides = data.images.map((item) => {
    return (
      <Image
        key={shortId.generate()}
        onClick={(e) => change_image(e.target.src)}
        src={`${item}`}
        alt={item}
        boxSize="70px"
      />
    );
  });
  return (
    <>
      <Head>
        <title> {data.title ?? "Property details"}</title>
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
            <Breadcrumb
              spacing="8px"
              ml={["1rem", "3rem"]}
              separator={<MdChevronRight color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href="#">About</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">{data.title ?? null}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <Container mt="1rem" maxW="xl" d="flex" bg="teal">
              <Flex
                align={["center", "flex-start"]}
                flexDir={["column", "row"]}
                justify={["space-between"]}
                w="100%"
              >
                <Box flexBasis="60%">
                  <Skeleton isLoaded={!loading}>
                    <Stack direction="row" height="400px">
                      <Image
                        boxSize="100%"
                        src={`${
                          activeImage !== "" ? activeImage : data.images[0]
                        }`}
                        objectFit="cover"
                        alt={data.title}
                      />
                    </Stack>
                    <Box border="1px" display="flex">
                      {slides}
                    </Box>
                    <Tabs mt="1rem">
                      <TabList>
                        <Tab>Features</Tab>
                        <Tab>Description</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          {" "}
                          <Heading as="h4">Features</Heading>
                          <List spacing={3}>{features()}</List>
                        </TabPanel>
                        <TabPanel>
                          <Box flexBasis="30%">{data.description ?? ""}</Box>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>

                    <SubscribeForm />
                  </Skeleton>
                </Box>
                <Box flexBasis="30%">
                  <Text>
                    {data.city ?? "not available"} <br />
                  </Text>
                </Box>
              </Flex>
            </Container>
          </PerfectScrollBar>
        </Box>

        {/* <Flex flexDir="column" pt={["5rem", "7rem"]} pb="2rem" w="100vw">
          <Box border="1px" backgroundColor="grey" height="5rem">
            <Container maxW="xl">
              <Heading as="h3">{data.title}</Heading>
            </Container>
          </Box>
          <Container maxW="xl" d="flex">
            <Flex flexDir="column" justify="space-between">
              <Heading as="h3">Property Information</Heading>
              <Skeleton isLoaded={!loading}>
                <Flex justify="space-between">
                  <Box flexBasis="70%">
                   
                  </Box>
                  <Spacer />
                  <Box flexBasis="30%">{data.description ?? ""}</Box>
                </Flex>
                <Text>
                  {data.city ?? "not available"} <br />
                 
                </Text>
                
              </Skeleton>
            </Flex>
          </Container>
        </Flex> */}
      </ClientLayout>
    </>
  );
};
details.getInitialProps = async ({ query }) => {
  return { query };
};

export default observer(details);
{
  /* <Box>
              <Carousel
        arrows
            ssr
            partialVisbile
            deviceType={deviceType}
            itemClass="image-item"
            responsive={responsive}
            autoPlay={isMobile ? false : true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500} 
            removeArrowOnDeviceType={["tablet", "mobile"]}
    > 
              {homeProducts && homeProducts.map((product) =>
            <BuyerCard product={product} key={product.id}  /> 
            )}
       
      
    </Carousel> 
              </Box> */
}
