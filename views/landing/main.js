import React from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  ButtonGroup,
  Button,
  Skeleton,
  Image,
  FormControl,
  FormLabel,
  Select,
  Input,
  IconButton,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import location from "../../ng.json";
import { observer } from "mobx-react";
import { useMobxStores } from "../../stores/stores";
import NormalCard from "../../components/Card/NormalCard";

const Main = () => {
  const { productStore } = useMobxStores();
  const { findLatest, loading, latest } = productStore;
  React.useEffect(() => {
    findLatest();
  }, []);

  const [category, setCategory] = React.useState("buy");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {
      location: "",
      price: "",
      propertyType: "",
      isSaleOrRent: "buy",
    },
  });

  const filterLocation = (event) => {
    setFormState((state) => ({
      ...state,
      values: {
        ...state.values,
        location: event.target.value,
      },
    }));
    if (event.target.value !== "" && event.target.value.length > 2) {
      const data = event.target.value;
      setShowSuggestions(true);
      let result = location.filter(
        (d) =>
          d.city.toLowerCase().includes(data.toLowerCase()) ||
          d.admin_name.toLowerCase().includes(data.toLowerCase())
      );
      setSuggestions(result);
    }
  };
  const suggestionSelected = (suggestion) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        location: suggestion.city,
      },
    }));
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const renderSuggestions = () => {
    // console.log("suggestions :",suggestions);
    if (suggestions.length === 0) {
      return null;
    } else if (showSuggestions && suggestions.length === 0) {
      return <em>No suggestions!</em>;
    }
    return (
      <ul>
        {suggestions.slice(0, 6).map((suggestion) => (
          <li
            key={suggestion.city}
            onClick={(e) => suggestionSelected(suggestion)}
          >
            {suggestion.city}
          </li>
        ))}
      </ul>
    );
  };
  const handleCategory = (val) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
       isSaleOrRent: val,
      },
    }));
  };
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
  const searchProperty = e => {
    e.preventDefault();
  }
  return (
    <>
    
      <Box
        height={["auto", "35rem"]}
        pt={["5rem", "7rem"]}
        pb="3rem"
        w="100vw"
        background="linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(/assets/images/landing_hero.jpg)  no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          mb="2rem"
          mt={["0.5rem", "1rem", "1rem"]}
          maxWidth={["800px"]}
          mx="auto"
        >
          <Heading
            mb="0.5rem"
            as="h1"
            fontSize={["24px", "30px", "40px", "45px"]}
            textAlign="center"
            color="brand.white"
          >
            Global homes ! for your <br />
            future
            <Text color="tomato" fontWeight="bold" as="span">
              Generation.
            </Text>
          </Heading>
        </Box>

        <Flex
          direction="column"
          justify="flext-start"
          align="flext-start"
          bg="white"
          height={["auto", "15rem"]}
          maxWidth={["500px"]}
          mx="auto"
          borderRadius="5px"
          mb="3rem"
		  data-aos="zoom-out"
        >
          <ButtonGroup
            size="lg"
            borderBottom="1px"
            variant="outline"
            isAttached
          >
            <Button
              onClick={(e) => handleCategory("buy")}
              bg={formState.values.isSaleOrRent === "buy" ? "#99C5CE" : "white"}
              colorScheme={formState.values.isSaleOrRent === "buy" ? "white" : "#99C5CE"}
              borderBottomLeftRadius="none"
            >
              Buy
            </Button>

            <Button
              onClick={(e) => handleCategory("rent")}
              bg={formState.values.isSaleOrRent === "rent" ? "#99C5CE" : "white"}
              colorScheme={formState.values.isSaleOrRent === "rent" ? "white" : "#99C5CE"}
              borderRightRadius="none"
            >
              Rent
            </Button>
          </ButtonGroup>
          <FormControl className="TypeAheadDropDown">
            <Input
              type="text"
              placeholder="Enter city, state or town"
              value={formState.values.location || ""}
              name="location"
              id="location"
              onChange={filterLocation}
            />
            {renderSuggestions()}
          </FormControl>
          <Container>
            <Flex p="5px" justifyContent="space-between">
              <FormControl mt={4} mr="1">
                <FormLabel>Property Type</FormLabel>
                <Select
                  value={formState.values.propertyType || ""}
                  name="propertyType"
                  id="propertyType"
                  placeholder="Select Type"
                  onChange={handleChange}
                >
                  <option value="Flat">Flat</option>
                  <option value="Bungalow">Bungalow</option>
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

              <IconButton
                aria-label="Search property"
                size="md"
                colorScheme="teal"
                icon={<MdSearch />}
                mt={12}
              />
            </Flex>
          </Container>
        </Flex>
      </Box>

      <Box mt={[0, 0, "1rem"]} py={["2rem", "3rem", "4rem"]}>
        <Container maxW="xl">
          <Heading
            mb={["1.5rem"]}
            as="h3"
            textAlign={["center", "center", "left"]}
            fontSize={["23px", "27px", "30px"]}
          >
            Latest Properties
          </Heading>
          <Skeleton isLoaded={!loading}>
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="10px">
              {latest &&
                latest.map((property) => <NormalCard key={property._id} data={property} />)}
            </SimpleGrid>
          </Skeleton>
        </Container>
      </Box>
      <Box
        pt={["1.5rem", "2rem"]}
        h="5rem"
        backgroundColor="#99C5CE" 
      >
       <Container display="flex">
	   <Flex justify="space-between">
          <Text fontSize={["15px", "15px", "15px", "16px"]} fontStyle="italic">
            Do you have property to sell or put up for rent ?
          </Text>
          <Button
            fontSize={["15px", "15px", "15px", "16px"]} 
            borderRadius="7px"
            color="#E73131"
            backgroundColor="#fff"
            border="2px solid #E73131"
			_hover={{ backgroundColor: "#ffffff" }}
			data-aos="slide-left" 
          >
           Advertise with us
          </Button>
        </Flex>
	   </Container>
      </Box>
    </>
  );
};

export default observer(Main);
