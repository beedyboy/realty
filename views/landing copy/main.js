import React from "react";
import {
	Box,
	Text,
	Heading,
	Flex,
	Image,
	FormControl,
	Input,
} from "@chakra-ui/react";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/footer";
import Button from "../../components/common/button";
import Container from "../../components/common/container";

const Main = () => {
	const [email, setEmail] = React.useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`Submitted ${email}`);
	};
	const handleChange = (e) => {
		setEmail(e.target.value);
	};
	return (
		<Box>
			<Navbar />
			<Box
				height={["auto", "100vh"]}
				pt={["5rem", "10rem"]}
				pb="3rem"
				background="linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(/assets/images/landing_hero.svg)  no-repeat"
				backgroundSize="cover"
				backgroundPosition="center"
			>
				<Container>
					<Box mt={["2.5rem", "3rem", "5rem"]} maxWidth={["800px"]} mx="auto">
						<Heading
							mb={["1rem", "1.5rem"]}
							as="h1"
							fontSize={["24px", "30px", "40px", "45px"]}
							textAlign="center"
							color="brand.white"
						>
							Business{" "}
							<Text color="brand.red" as="span">
								Solution Provider
							</Text>
						</Heading>
						<Text
							mb="1.6rem"
							fontSize={["16px", "18px", "20px"]}
							color="brand.white"
							textAlign="center"
						>
							Empowering your business through digital innovations.
						</Text>
						<Flex justify="center" align="center">
							<Button data-aos="slide-right"
								borderRadius="7px"
								fontSize={["16px", "18px"]}
								mr={["1rem"]}
								color="#E73131"
								backgroundColor="white"
								_hover={{ backgroundColor: "white" }}
							>
								Our Solutions
							</Button>
							<Button data-aos="slide-left"
								borderRadius="7px"
								fontSize={["16px", "18px"]}
								ml={["1rem"]}
								color="white"
								backgroundColor="#E73131"
								_hover={{ backgroundColor: "#E73131" }}
							>
								Discover
							</Button>
						</Flex>
					</Box>
				</Container>
			</Box>

			<Box mt={[0, 0, "1rem"]} py={["3rem", "4rem", "5rem"]}>
				<Container data-aos="fade-up">
					<Heading
						mb={["1.5rem"]}
						as="h3"
						textAlign={["center", "center", "left"]}
						fontSize={["23px", "27px", "30px"]}
						display={["block", "none"]}
					>
						WHAT WE SAY ABOUT GROWTH
					</Heading>
					<Flex
						align={["center", "center", "flex-start"]}
						flexDir={["column", "row"]}
						justify={["space-between"]}
					>
						<Box flexBasis={["40%"]}>
							<Image src="/assets/images/landing_second.svg" />
						</Box>
						<Box mt={["1.3rem", "1.3rem", "3rem"]} flexBasis={["50%"]}>
							<Heading
								mb={["1.5rem"]}
								as="h3"
								fontSize={["18px", "20px", "27px", "30px"]}
								display={["none", "block"]}
							>
								WHAT WE SAY ABOUT GROWTH
							</Heading>
							<Text
								fontSize={["16px", "16px", "18px"]}
								fontWeight={600}
								fontStyle="italic"
								mb={["1.3rem", "1.5rem", "2rem"]}
							>
								At Solution Influx Limited, we believe Coming together is a
								beginning; keeping together is progress; working together is
								success. It is not about changing, it is about growing together.
								We give you more than a product but a brand.
							</Text>
							<Button
								borderRadius="7px"
								fontSize={["16px", "18px"]}
								color="white"
								backgroundColor="#E73131"
								_hover={{ backgroundColor: "#E73131" }}
							>
								Talk to our expert
							</Button>
						</Box>
					</Flex>
				</Container>
			</Box>

			<Box py={["2.5rem", "4rem"]} backgroundColor="brand.grey" data-aos="fade-up">
				<Container>
					<Heading
						textAlign="center"
						as="h3"
						fontSize={["23px", "27px", "30px"]}
					>
						OUR SERVICES
					</Heading>
					<Box
						mt="5px"
						mb={["2rem", "2rem", "3.5rem"]}
						mx="auto"
						width="6.5rem"
						height="1px"
						backgroundColor="brand.red"
					/>

					<Box mt={["1rem"]}>
						<Flex
							flexDir={["column", "column", "row"]}
							justify={["space-between"]}
							align="space-between"
						>
							<Box  data-aos="zoom-in" data-aos-delay="200"
								flexBasis="30%"
								mr={[0, 0, ".8rem"]}
								mb={["2.5rem", "2.5rem", 0]}
							>
								<Heading
									mb={["1rem"]}
									as="h4"
									fontSize={["18px", "18px", "18px", "22px"]}
									textAlign={["center", "center", "left"]}
								>
									Application Development
								</Heading>
								<Box mx={["auto", "auto", 0]}>
									<Box>
										<Image
											maxWidth={["80%", "60%", "80%"]}
											src="/assets/images/landing_third.svg"
										/>
									</Box>

									<Box 
										position="relative"
										marginTop={["-8rem", "-6rem"]}
										marginBottom={["1.5rem", "1.5rem", 0]}
										marginLeft={["4rem", "2rem"]}
										borderRadius="10px"
										maxW={["250px", "300px"]}
										backgroundColor="brand.white"
										color="brand.black"
										p={["1rem 1.5rem", "1.3rem 1.7rem"]}
									>
										<Text
											fontSize={["15px", "15px", "15px", "16px"]}
											fontStyle="italic"
										>
											We provide beautiful and user-friendly solutions that not
											only competes with the best but also gives the ultimate
											results.
										</Text>
										<Button
											fontSize={["15px", "15px", "15px", "16px"]}
											d={["block"]}
											borderRadius="7px"
											color="#E73131"
											backgroundColor="#fff"
											border="2px solid #E73131"
											_hover={{ backgroundColor: "#ffffff" }}
											ml="auto"
											mt="1rem"
										>
											View more
										</Button>
									</Box>
								</Box>
							</Box>

							<Box  data-aos="zoom-in" data-aos-delay="200"
								flexBasis="30%"
								mr={[0, 0, "1rem"]}
								marginBottom={["2.5rem", "2.5rem", 0]}
								mx={["auto", "auto", 0]}
							>
								<Heading
									mb={["1rem"]}
									as="h4"
									fontSize={["18px", "18px", "18px", "22px"]}
									textAlign={["center", "center", "left"]}
								>
									IT Consultation
								</Heading>
								<Box mx={["auto", "auto", 0]}>
									<Box>
										<Image
											maxWidth={["80%", "60%", "80%"]}
											src="/assets/images/landing_fourth.svg"
										/>
									</Box>

									<Box
										position="relative"
										marginTop={["-8rem", "-6rem"]}
										marginLeft={["4rem", "2rem"]}
										borderRadius="10px"
										maxW={["250px", "300px"]}
										backgroundColor="brand.white"
										color="brand.black"
										p={["1rem 1.5rem", "1.3rem 1.7rem"]}
									>
										<Text
											fontSize={["15px", "15px", "15px", "16px"]}
											fontStyle="italic"
										>
											Our team of expertise are always ready render top notch
											services and support when needed
										</Text>
										<Button
											fontSize={["15px", "15px", "15px", "16px"]}
											d={["block"]}
											borderRadius="7px"
											color="#E73131"
											backgroundColor="#fff"
											border="2px solid #E73131"
											_hover={{ backgroundColor: "#ffffff" }}
											ml="auto"
											mt="1rem"
										>
											View more
										</Button>
									</Box>
								</Box>
							</Box>

							<Box  data-aos="zoom-in" data-aos-delay="200"
								flexBasis="30%"
								mr={[0, 0, ".5rem"]}
								mb={["1.5rem", "1.5rem", 0]}
							>
								<Heading
									mb={["1rem"]}
									as="h4"
									textAlign={["center", "center", "left"]}
									fontSize={["18px", "18px", "18px", "22px"]}
								>
									Solution Provider
								</Heading>
								<Box mx={["auto", "auto", 0]}>
									<Box>
										<Image
											maxWidth={["80%", "60%", "80%"]}
											src="/assets/images/landing_fifth.svg"
										/>
									</Box>

									<Box
										position="relative"
										marginTop={["-8rem", "-6rem"]}
										marginBottom={["1.5rem", "1.5rem", 0]}
										marginLeft={["4rem", "2rem"]}
										borderRadius="10px"
										maxW={["250px", "300px"]}
										backgroundColor="brand.white"
										color="brand.black"
										p={["1rem 1.5rem", "1.3rem 1.7rem"]}
									>
										<Text
											fontSize={["15px", "15px", "15px", "16px"]}
											fontStyle="italic"
										>
											We create tailor-made solutions to suit your specific need using technology, intelligence, and human expertise.
										</Text>
										<Button
											fontSize={["15px", "15px", "15px", "16px"]}
											d={["block"]}
											borderRadius="7px"
											color="#E73131"
											backgroundColor="#fff"
											border="2px solid #E73131"
											_hover={{ backgroundColor: "#ffffff" }}
											ml="auto"
											mt="1rem"
										>
											View more
										</Button>
									</Box>
								</Box>
							</Box>
						</Flex>
					</Box>
				</Container>
			</Box>

			<Box
				height="auto"
				pt={["8rem", "12rem"]}
				pb={["1.5rem", "7rem"]}
				background={[
					"url(/assets/images/newsletter_mobile.svg) no-repeat",
					"url(/assets/images/landing_newsletter.svg) no-repeat",
				]}
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				backgroundPosition={["center", "center", "center"]}
			>
				<Container>
					<Box mr={["auto"]} maxWidth={["500px"]}>
						<Heading
							as="h3"
							mb={["1.6rem"]}
							fontSize={["24px", "30px", "35px"]}
						>
							Newsletter
						</Heading>
						<Text
							maxWidth={["300px", "auto"]}
							fontSize={["16px", "18px"]}
							mb={["2rem", "2.5rem"]}
						>
							Subscribe to our newsletter to get our latests offers, promos and
							first hand notice on any of our products and services.
						</Text>

						<form onSubmit={handleSubmit}>
							<Flex
								flexDir={["column", "column", "row"]}
								justify={["space-between"]}
								align={["flex-start", "flex-start", "center"]}
							>
								<FormControl
									mb={[".5rem", ".5rem", 0]}
									mr={[0, 0, "1rem"]}
									flex={["1"]}
								>
									<Input
										isRequired
										py={["1.4rem"]}
										id="email"
										placeholder="Enter your email"
										type="email"
										fontSize={["16px", "17px"]}
										onChange={handleChange}
										value={email}
									/>
								</FormControl>
								<Button
									type="submit"
									color="white"
									backgroundColor="#0E76A8"
									_hover={{ backgroundColor: "#0E76A8" }}
									borderRadius="10px"
								>
									Subscribe
								</Button>
							</Flex>
						</form>
					</Box>
				</Container>
			</Box>
			<Footer />
		</Box>
	);
};

export default Main;
