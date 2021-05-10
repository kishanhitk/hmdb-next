import React from "react";
import { FavoriteContextProvider } from "../store/favorite-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FavoriteContextProvider>
      <Component {...pageProps} />
    </FavoriteContextProvider>
  );
}

export default MyApp;
