import * as React from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  Image,
  FormControl,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";

const Main = () => {
  return (
    <>
      <Heading as="h5">Dashboard</Heading>
      <Flex direction="column" shadow="2px red" justifyContent="space-between" borderWidth="1px" py="2rem">
		  <Text>Welcome, User</Text>
        <SimpleGrid columns={[2, null, 4]} spacing="20px">
          <Box bg="tomato" height="100px"></Box>
          <Box bg="tomato" height="100px"></Box>
          <Box bg="tomato" height="100px"></Box>
          <Box bg="tomato" height="100px"></Box>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Main;
