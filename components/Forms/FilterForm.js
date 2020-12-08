import React from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  IconButton,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const FilterForm = ({ initial_data: { item } }) => {
  const router = useRouter();
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {
      location: "",
      price: "", 
      numOfBedRooms: "", 
      numOfBathRooms: "",
      propertyType: "",
      isSaleOrRent: "",
      numOfGarages: "",
      petsAllowed: "",
      furnished: "",
      serviced: "",
      shared: "",
    },
  });
React.useLayoutEffect(() => {
  let shouldSet = typeof item !== "undefined" ? true : false;
  if (shouldSet) {
    const data = item && item.isSaleOrRent;
    console.log({ item });
    setFormState((state) => ({
      ...state,
      values: {
        ...state.values,
        numOfBathRooms: data && item.numOfBathRooms,
        numOfBedRooms: data && item.numOfBedRooms,
        isSaleOrRent: data && item.isSaleOrRent,
        propertyType: data && item.property_type,
        numOfGarages: data && item.numOfGarages,
        petsAllowed: data && item.petsAllowed,
        furnished: data && item.furnished,
        location: data && item.location,
        serviced: data && item.serviced,
        shared: data && item.shared,
        price: data && item.price,
      },
    }));
  }
}, [item]);
  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
    }));
  };
  const searchProperty = (e) => {
    e.preventDefault();
    let url = "";
    const query = {
      category: formState.values.isSaleOrRent,
    };
    if (formState.values.location) {
      query.location = formState.values.location;
    }
    if (formState.values.propertyType) {
      query.property_type = formState.values.propertyType;
    }
    Object.keys(query).forEach(function (key) {
      if (key === "category") {
        url += query[key] === "buy" ? "for-sale?" : "for-rent?";
      } else {
        url += key + "=" + query[key] + "&";
      }
    });
    url = url.slice(0, -1);
    // console.log(url);
    router.push(`/property/${url}`);
  };
  return (
    <>
      <Box
        w="100%"
        mt="1rem"
        boxShadow="5px rgba(0, 0, 0, 0.5)"
        border="1px"
        backgroundColor="white"
        mt="2rem"
      >
        {/* <Heading as="h6" fontSize="16px" fontStyle="italic">
          <IconButton icon={<MdMail />} color="tomato" /> Get Latest Properties
        </Heading> */}
        <Text ml="3rem">Filter options</Text>
        <Container maxW="xl">
          <Flex flexDir="column" justifyContent="space-between">
            <FormControl mt={4} mr="1">
              <FormLabel>Category</FormLabel>
              <Select
                value={formState.values.isSaleOrRent || ""}
                name="category"
                id="category"
                placeholder="Select Category"
                onChange={handleChange}
              >
                <option value="sale">Sell</option>
                <option value="rent">Rent</option> 
              </Select>
            </FormControl>

             <FormControl mt={4} mr="1">
              <FormLabel>Property Type</FormLabel>
              <Select
                value={formState.values.propertyType || ""}
                name="propertyType"
                id="propertyType"
                placeholder="Select Type"
                onChange={handleChange}
              >
                <option value="house">Houses</option>
                <option value="land">Land</option>
                <option value="flat">Flat</option>
                <option value="commercial">Commercial Property</option>
              </Select>
            </FormControl>

            <FormControl mt={4} mr="1">
              <FormLabel>Price Range</FormLabel>
              <Select
                placeholder="Select Price"
                value={formState.values.price || ""}
                name="price"
                id="price"
                onChange={handleChange}
              >
                <option value="10000">10000</option>
                <option value="100000">1 Million</option>
              </Select>
            </FormControl>
          </Flex>
          <Button mt="1rem" colorScheme="teal" onClick={searchProperty}>
            Submit
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default FilterForm;
