import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Skeleton,
  SimpleGrid,
  Flex,
  Container,
  Alert,
  AlertDescription,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import shortId from "short-id";
import Head from "next/head";
import ClientLayout from "../../../templates/client/ClientLayout";
import { observer } from "mobx-react";
import { MdChevronRight, MdCheckCircle } from "react-icons/md";
import PerfectScrollBar from "react-perfect-scrollbar"; 
import { useMobxStores } from "../../../stores/stores";
import FilterForm from "../../../components/Forms/FilterForm";
import SearchCard from "../../../components/Card/SearchCard";

const forSale = (props) => {
  const { query } = props;
  const { productStore } = useMobxStores();
  const { getSales, loading, sales } = productStore;
  const [data, setData] = useState([]);
 
  useEffect(() => {
    // const { query.property_type, search } = query;
    query.isSaleOrRent = 'sale';
    setFilterDate(query)
    getSales(query);
    // console.log({ forsale });
  }, []);

  const setFilterDate = (item) => {
    const rp = item && item.isSaleOrRent; 
    if (rp) { 
      setData((state) => ({
        ...state,  
         item
      }));
    }
  }
  const setMeta  = () => {
   let title = '';
   if(query.property_type) {
     title+= `${query.property_type} for sale `
   }
    if(query.location) {
     title+= ` in ${query.location}`
   }
   return title;
  }

  return (
    <>
      <Head>
        <title>{ setMeta()?? 'Property for sale' }</title>
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
                       <Text>Found {sales && sales.length} result</Text>
                       <Box>
                       {sales && sales.length < 1 ?
                      <>
                      <Alert status="error">
                        <AlertIcon />
                        <Box flex="1">
                        <AlertDescription>
                        No results found! Sorry, we couldn't find a property matching your criteria. The recommendations below might interest you..
                        </AlertDescription>
                        </Box>
                        <CloseButton position="absolute" right="8px" top="8px" />
                      </Alert>
                      
                      </> : 
                        sales.map((property) => (
                          <SearchCard key={property._id} data={property} />
                        ))}
                       </Box>
                    {/* <SimpleGrid
                      columns={{ sm: 1, md: 2, xl: 2 }}
                      spacing="10px"
                    >
                      {sales && sales.length < 1 ?
                      <>
                      <Alert status="error">
                        <AlertIcon />
                        <Box flex="1">
                        <AlertDescription>
                        No results found! Sorry, we couldn't find a property matching your criteria. The recommendations below might interest you..
                        </AlertDescription>
                        </Box>
                        <CloseButton position="absolute" right="8px" top="8px" />
                      </Alert>
                      
                      </> : 
                        sales.map((property) => (
                          <NormalCard key={property._id} data={property} />
                        ))}
                    </SimpleGrid> */}
                  </Skeleton>
                </Box>
                <Box flexBasis={["100%", "30%"]}>
                  <Text>Filter result</Text>
                  <FilterForm initial_data={data} />
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
