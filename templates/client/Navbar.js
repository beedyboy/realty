import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Container, Flex, Image, List, ListItem, Text } from "@chakra-ui/react"; 
import MobileNav from "./mobileNav";

const Navbar = () => {
	const [showMobileNav, setShowMobileNav] = React.useState(false);
	const [scrollPosition, setScrollPosition] = React.useState(0);

	const router = useRouter();
	const handleRemoveMobileNav = () => {
		setShowMobileNav(false);
	};
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<>
			<Box
				position="fixed"
				width="100%"
				zIndex="1000"
				top="0"
				background={[
					"white",
					"white", "#99C5CE" 
				]}
				py={[".7rem", "1rem"]}
				boxShadow={`${
					scrollPosition > 100 ? "0px 3px 5px 0px rgba(0,0,0,0.75)" : "none"
				}`}
			>
				 
					 	<Flex
						alignItems={["center", "center", "flex-start"]}
						justifyContent="space-between"
					>
						<Flex align="center">
							<Link href="/">
								<a>
									<Image
										maxWidth={["40%", "40%", "50%"]}
										src="/assets/images/logo.svg"
									/>
								</a>
							</Link>
							<Link href="/">
								<a>
									<Box position="relative">
										<Text
											color="#2C2D2D"
											fontWeight="bold"
											display={["none", "none", "none", "block"]}
											textAlign="right"
											marginLeft={["-2rem"]}
											fontSize={["1.2rem"]}
										>
											Realty Trumpet
										</Text>
										 
									</Box>
								</a>
							</Link>
						</Flex>
						<List
							display={["none", "none", "flex"]}
							alignItems={["center"]}
							justifyContent="space-between"
							styleType="none"
							margin={[0]}
							padding={[0]}
							color="#2C2D2D"
							fontWeight={700}
							fontSize={["20px"]}
						>
							<ListItem
								color={router.route == "/" ? "brand.red" : "#2C2D2D"}
								ml={[".5rem"]}
								padding=".5rem 1.2rem"
								cursor="pointer"
							>
								<Link href="/">
									<a>Home</a>
								</Link>
							</ListItem>
							<ListItem
								color={router.route == "/about" ? "brand.red" : "#2C2D2D"}
								ml={[".5rem"]}
								cursor="pointer"
								padding=".4rem 1.2rem"
							>
								<Link href="/buy">
									<a>Buy</a>
								</Link>
							</ListItem>
							<ListItem
								color={router.route == "/services" ? "brand.red" : "#2C2D2D"}
								ml={[".5rem"]}
								cursor="pointer"
								padding=".4rem 1.2rem"
							>
								<Link href="/sell">
									<a>Sell</a>
								</Link>
							</ListItem>
							<ListItem
								color={router.route == "/careers" ? "brand.red" : "#2C2D2D"}
								ml={[".5rem"]}
								cursor="pointer"
								padding=".4rem 1.2rem"
							>
								<Link href="/rent">
									<a>Rent</a>
								</Link>
							</ListItem>
							<ListItem
								color={router.route == "/contact" ? "brand.red" : "#2C2D2D"}
								ml={[".5rem"]}
								cursor="pointer"
								padding=".4rem 1.2rem"
							>
								<Link href="/contact">
									<a>Contact Us</a>
								</Link>
							</ListItem>
						</List>
						<Image
							maxWidth={["10%", "5%"]}
							onClick={() => setShowMobileNav(!showMobileNav)}
							cursor="pointer"
							display={["flex", "flex", "none"]}
							src="/assets/icons/navbar_hamburger.svg"
						/>
					</Flex>  
			</Box>
			<MobileNav
				showMobileNav={showMobileNav}
				handleRemoveMobileNav={handleRemoveMobileNav}
			/>
		</>
	);
};

export default Navbar;
