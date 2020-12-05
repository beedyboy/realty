import * as React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import {
	Box,
	Image,
	List,
	ListItem,
	Link as ChakraLink,
} from "@chakra-ui/react";

const MobileNav = ({
	showMobileNav,
	handleRemoveMobileNav,
}) => {
	return (
		<Box
			maxWidth="800px"
			px="1.2rem"
			pt="2rem"
			position="fixed"
			height="100vh"
			zIndex="9999"
			top="0"
			width="100%"
			backgroundColor="brand.white"
			display={showMobileNav ? "block" : "none"}
		>
			<Box onClick={handleRemoveMobileNav}>
				<Image ml="auto" src="/assets/icons/mobile_cross.svg" />
			</Box>

			<Box mt="1rem">
				<List
					mt="2rem"
					height="100%"
					display="flex"
					justifyContent="space-around"
					flexDir="column"
				>
					<ListItem
						py="1rem"
						fontWeight="500"
						borderTop="1px solid #bdbdbd"
						borderBottom="1px solid #bdbdbd"
					>
						<Link href="/">
							<ChakraLink
								pb=".8rem"
								display="block"
								_hover={{ textDecoration: "none" }}
								onClick={handleRemoveMobileNav}
							>
								Home
							</ChakraLink>
						</Link>
					</ListItem>

					<ListItem py="1rem" fontWeight="500" borderBottom="1px solid #bdbdbd">
						<Link href="/about">
							<ChakraLink
								pb=".8rem"
								display="block"
								_hover={{ textDecoration: "none" }}
								onClick={handleRemoveMobileNav}
							>
								About Us
							</ChakraLink>
						</Link>
					</ListItem>

					<ListItem py="1rem" fontWeight="500" borderBottom="1px solid #bdbdbd">
						<Link href="/services">
							<ChakraLink
								pb=".8rem"
								display="block"
								_hover={{ textDecoration: "none" }}
								onClick={handleRemoveMobileNav}
							>
								Services
							</ChakraLink>
						</Link>
					</ListItem>

					<ListItem py="1rem" fontWeight="500" borderBottom="1px solid #bdbdbd">
						<Link href="/careers">
							<ChakraLink
								pb=".8rem"
								display="block"
								_hover={{ textDecoration: "none" }}
								onClick={handleRemoveMobileNav}
							>
								Careers
							</ChakraLink>
						</Link>
					</ListItem>

					<ListItem py="1rem" fontWeight="500" borderBottom="1px solid #bdbdbd">
						<Link href="/contact">
							<ChakraLink
								pb=".8rem"
								display="block"
								_hover={{ textDecoration: "none" }}
								onClick={handleRemoveMobileNav}
							>
								Contact
							</ChakraLink>
						</Link>
					</ListItem>
				</List>
			</Box>
		</Box>
	);
};

MobileNav.propTypes = {
	showMobileNav: PropTypes.bool.isRequired,
	handleRemoveMobileNav: PropTypes.func.isRequired,
};

export default MobileNav;
