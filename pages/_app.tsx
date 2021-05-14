import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { FavoriteContextProvider } from "../store/favorite-context";
import "../styles/globals.css";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <FavoriteContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </FavoriteContextProvider>
  );
}

export default MyApp;
