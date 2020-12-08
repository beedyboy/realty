import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { getStores, StoreProvider } from "../stores/stores";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import "../styles/typeahead.css";
import 'font-awesome/css/font-awesome.min.css'; 
import "react-notifications/lib/notifications.css";
import customTheme from "../utils/customTheme";
import { NotificationContainer } from "react-notifications";
import "aos/dist/aos.css";
import Aos from "aos";

function MyApp({ Component, pageProps }) {
  const store = getStores();
  useEffect(() => {
	Aos.init({ duration: 2000 });
}, []);
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
        <title>Realty Trumpet</title>
      </Head>

      <StoreProvider value={store}>
        <Component {...pageProps} />
        <NotificationContainer />
      </StoreProvider>
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
