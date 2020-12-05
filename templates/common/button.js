import React from "react";
import { Button } from "@chakra-ui/core";

const button = (props) => {
	const { background } = props;
	return (
		<Button
			_focus={{ outline: 0 }}
			fontWeight="normal"
			borderRadius="4px"
			color="brand.white"
			px={["2rem"]}
			height={["2.5rem", "3rem"]}
			{...props}
		/>
	);
};

export default button;
