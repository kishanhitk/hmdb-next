import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import SectionHeading from "../components/SectionHeading";
import { MovieEntity } from "../interfaces/Movies";
import classes from "../styles/Popular.module.css";
const API_KEY = process.env.TMDB_API_KEY;
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
interface PopularPageProps {
  movies: MovieEntity[];
}
const Links = ["Popular", "Favourites", "Top Rated", "Now Playing"];

function popular({ movies }: PopularPageProps) {
  const [movieData, setmovieData] = useState(movies);
  const [searchTerm, setsearchTerm] = useState("");
  const appBackground = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const seachMovies = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/movie?query=${searchTerm}`);
    const data = await res.json();
    if (data.results == null || data.results.length < 1) {
      setmovieData(movies);
      return;
    }
    const movie: MovieEntity[] = data.results.map((data: MovieEntity) => {
      return data;
    });

    console.log(movie);
    setmovieData(movie);
  };
  return (
    <Box background={appBackground}>
      <Head>
        <title>Popular Movies</title>
      </Head>
      <Flex direction="column">
        <Box top="0" position="sticky" width="100%" zIndex="11">
          {" "}
          <Flex
            width="100%"
            justifyContent="center"
            direction="row"
            p={4}
            className={classes.header}
          >
            {" "}
            <IconButton
              mr={3}
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: !isOpen ? "none" : "inherit" }}
              onClick={isOpen ? onClose : onOpen}
            />{" "}
            <HStack spacing={8} alignItems={"center"}>
              <Heading display={{ base: "none", md: "flex" }}>HMDB</Heading>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <Link href={link.toLowerCase().replace(/ /g, "")} key={link}>
                    {link}
                  </Link>
                ))}
              </HStack>
            </HStack>
            <form
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onSubmit={(e) => {
                seachMovies(e);
              }}
            >
              <InputGroup maxW="250px" justifySelf="center">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon></SearchIcon>}
                />
                <Input
                  type="search"
                  placeholder="Search Movies"
                  onChange={(e) => {
                    setsearchTerm(e.target.value);
                  }}
                />
              </InputGroup>
            </form>
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>{" "}
          {isOpen ? (
            <Box pb={4} className={classes.header}>
              <Stack as={"nav"} p={10} spacing={4}>
                <Heading>HMDB</Heading>
                {Links.map((link) => (
                  <Link href={link.toLowerCase().replace(/ /g, "")} key={link}>
                    <Box>{link}</Box>
                  </Link>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
        <SectionHeading text="Popular" />
        <Flex m={3} wrap="wrap" justifyContent="center">
          {movieData.map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
        </Flex>
      </Flex>
      <Footer></Footer>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(POPULAR_URL);
  const data = await res.json();
  const movie: MovieEntity[] = data.results.map((data: MovieEntity) => {
    return data;
  });
  return {
    props: { movies: movie },
  };
};
export default popular;
