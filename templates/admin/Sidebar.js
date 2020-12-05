import React, { Fragment } from "react";
import { Box, Flex, Heading, List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdDashboard, MdGroup, MdLocationCity } from "react-icons/md";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Fragment>
      <Flex
        direction="column"
        bg="teal.500"
        id="sidebar"
        justifyItems="space-between"
        height={["auto", "100vh"]}
      >
        <Heading as="h2" size="lg" color="gold" letterSpacing={".1rem"}>Realty <br /> Trumpet</Heading>

        <List
          mt="2rem" 
          display="flex"
          flexDir="column"
          wrap="wrap"
          justifyContent="space-between"
        >
          <ListItem py=".5rem">
            <ListIcon as={MdDashboard} color="white" />
            <Link href="/admin">
              <a>Dashboard</a>
            </Link>
          </ListItem>

          <ListItem py=".5rem">
            <ListIcon as={MdGroup} color="white" />
            <Link href="/admin/staff">
              <a>Staff</a>
            </Link>
          </ListItem>

          <ListItem py=".5rem">
            <ListIcon as={MdLocationCity} color="white" />
            <Link href="/admin/product">
              <a>Products</a>
            </Link>
          </ListItem>

        </List>
      </Flex>
    </Fragment>
  );
};

export default Sidebar;
