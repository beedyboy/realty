import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  IconButton,
  Stack, 
  Text,
  Menu,
  MenuGroup,
  MenuDivider,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MdNotifications, MdPerson, MdMail } from "react-icons/md";
const Navbar = () => {
  const router = useRouter();

  return (
    <>
      {/* <Container> */}
        <Flex align="flex-start" justify="space-between">
          <Flex align="center">
            <Link href="/">
              <a>
                <Box>
                  <Text
                    color="brand.black"
                    fontWeight="bold"
                    display={["none", "none", "none", "block"]}
                    textAlign="right"
                    marginLeft={["2rem"]}
                    fontSize={["1.2rem"]}
                  >
                    Search Box
                  </Text>
                </Box>
              </a>
            </Link>
          </Flex>

          <Stack isInline align="center" pr="1rem">
            <IconButton icon={<MdNotifications />} />
            <IconButton icon={<MdMail />} />
            <Menu>
              <MenuButton as={IconButton} icon={<MdPerson />} colorScheme="pink">
                Profile
              </MenuButton>

              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      {/* </Container> */}
    </>
  );
};

export default Navbar;
