import { Button, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import classes from "../styles/Home.module.css";
export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>HMDB</title>
      </Head>
      <Heading>HMDB</Heading>
      <Text>Humara Movie Data Base</Text>
      <Link href="/popular">
        <Button m={5} colorScheme="purple">
          <p>Popular Movies</p>
        </Button>
      </Link>
    </div>
  );
}

