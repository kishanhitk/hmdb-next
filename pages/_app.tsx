import { ChakraProvider, theme } from "@chakra-ui/react";
import React from "react";
import { FavoriteContextProvider } from "../store/favorite-context";
import "../styles/globals.css";

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
