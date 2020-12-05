import React from "react";
import Link from "next/link";
import {
  Box,
  Text,
  Flex,
  Heading,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaTwitter } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";
import { SiLinkedin } from "react-icons/si";

const Footer = () => {
  return (
    <Box py={["3rem", "4rem"]} w="100vw" backgroundColor="#2C2D2D" color="white">
      <Container maxW="xl" display="flex">
        <SimpleGrid  columns={{sm: 2, md: 2, xl: 4}} spacing="5px">
          <Box mb={["2rem", "2rem", 0]}>
            <Heading as="h2" color="#99C5CE" fontWeight={500}>
              Realty Trumpet Logo
            </Heading>
          </Box>
		  {/* color="#f0ce00" */}
          <Box mb={["2rem", "2rem", 0]}>
            <Heading
              fontWeight={500}
              mb={["1rem", "2rem"]}
			  as="h3"
			  color="#99C5CE"
              fontSize={["20px", "20px", "22px", "25px"]}
            >
              Home
            </Heading>
            <Link href="#!">
              <a>
                <Text d="block" mb="1rem">
                  Buy
                </Text>
              </a>
            </Link>
            <Link href="#!">
              <a>
                <Text d="block" mb="1rem">
                  Rent
                </Text>
              </a>
            </Link>
            <Link href="#!">
              <a>
                <Text d="block" mb="1rem">
                  How it works
                </Text>
              </a>
            </Link>
          </Box>

          <Box mb={["2rem", "2rem", 0]}>
            <Heading
              fontWeight={500}
              mb={["1rem", "2rem"]}
			  as="h3"
			  color="#99C5CE"
              fontSize={["20px", "20px", "22px", "25px"]}
            >
              Company
            </Heading>
            <Link href="#!">
              <a>
                <Text d="block" mb="1rem">
                  Contact
                </Text>
              </a>
            </Link>
            <Link href="#!">
              <a>
                <Text d="block" mb="1rem">
                  Blog
                </Text>
              </a>
            </Link>
          </Box>
          <Box  mb={["2rem", "2rem", 0]}>
            <Heading
              fontWeight={500}
              mb={["1rem", "2rem"]}
			  as="h3"
			   color="#99C5CE"
              fontSize={["20px", "20px", "22px", "25px"]}
            >
              Contact
            </Heading>
            <Text mb="1rem">
              92, Awoyaya Avenue, <br /> Lekki, Lagos state, Nigeria
            </Text>
            <Text mb="1rem" color="brand.red">
              <a href="tel:+23407037351836">+23407037351836</a>
            </Text>
            <Text mb="1rem" color="brand.red">
              <a href="mailto:info@realtytrumpet.com">info@realtytrumpet.com</a>
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
