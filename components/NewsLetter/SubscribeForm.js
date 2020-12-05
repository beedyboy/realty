import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Spacer,
  Input,
  Text,
  Container,
} from "@chakra-ui/react";
import React from "react";
import { MdMail } from "react-icons/md";

const SubscribeForm = () => {
  return (
    <>
      <Box w="100%" mt="1rem" boxShadow="5px rgba(0, 0, 0, 0.5)" border="1px" backgroundColor="white" mt="2rem">
       <Heading as="h6" fontSize="16px" fontStyle="italic">
          <IconButton icon={<MdMail />} color="tomato" /> Get Latest Properties
        </Heading>
        <Text ml="3rem">
          Receive alerts when we have new properties available 
        </Text>
          <Container maxW="xl">
     <Flex  justifyContent="space-around">
          <Box>
          <FormControl>
            <Input type="text" name="name" placeholder="Enter your name" />
          </FormControl>
          </Box> 
          <Box>
          <FormControl>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
          </FormControl>
          </Box>
        </Flex>
        <Button mt="1rem" colorScheme="teal">Submit</Button>
       </Container>
      </Box>
    </>
  );
};

export default SubscribeForm;
