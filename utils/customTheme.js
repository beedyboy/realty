import { theme } from "@chakra-ui/react";
import customIcons from "./customIcons";
// import { createBreakpoints } from "@chakra-ui/theme-tools"

const customTheme = {
	...theme,
	fonts: {
		body: "Roboto, sans-serif",
		heading: "Roboto, sans-serif",
		mono: "Menlo, monospace",
	},
	fontWeights: {
		...theme.fontWeights,
		heading: 800,
		bolder: 800,
		boldest: 900,
	},
	colors: {
		...theme.colors,
		brand: {
			red: "#E73131",
			grey: "#C4C4C4",
			black: "#000000",
			darkBlue: "#111D5E",
			skyBlue: "#F5F6FF",
			dullPink: "#FFECE0",
			darkBlack: "#121113",
			lightBlack: "#444444",
			orange: "#F37121",
			black: "#000000",
			white: "#ffffff",
		},
	},
	icons: {
		...theme.icons,
		...customIcons,
	},
};

export default customTheme;
