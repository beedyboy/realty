import React, { Fragment } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar"; 

const AdminLayout = (props) => {
  return (
    <Fragment>
      <Flex align="flex-start">
        <Box w="18vw" h="100vh">
          <Sidebar />
        </Box>
        <Box
          position="fixed"
          boxShadow="0px 3px 5px 0px rgba(0,0,0,0.75)"
          ml="18vw"
          py="1rem"
          w="82vw"
          h="4rem"
          zIndex="1000"
          top="0"
        >
          <Navbar />
        </Box>
        <Flex direction="column" justifyContent="space-between" w="82vw">
          <Box  py="5rem" bg="gold.300">
          {props.children} 
          </Box>
        </Flex>
      </Flex>
      
    </Fragment>
  );
};

export default AdminLayout;
