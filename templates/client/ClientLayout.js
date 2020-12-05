import React, { Fragment } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PerfectScrollBar from "react-perfect-scrollbar";

const ClientLayout = (props) => {
  return (
    <Fragment>
      <Flex align="flex-start" bg="red" flexDir="column" w="100vw" h="100vh">
        <Navbar />
        <PerfectScrollBar>
          <Box>{props.children}</Box>
        </PerfectScrollBar>

        <Footer />
      </Flex>
    </Fragment>
  );
};

export default ClientLayout;
