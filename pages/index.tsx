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
      <Heading mb={2}>HMDB</Heading>
      <Text mb={4} fontSize="xl">
        Humara Movie Data Base
      </Text>
      <Text mb={3}>AI 😜 based movie recommendation</Text>
      <Link href="/popular">
        <Button m={5} colorScheme="purple">
          <p>Get Started!</p>
        </Button>
      </Link>
    </div>
  );
}
