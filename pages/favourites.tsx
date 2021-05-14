import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";
import SectionHeading from "../components/SectionHeading";
import { MovieEntity } from "../interfaces/Movies";
import FavoriteContext from "../store/favorite-context";
import classes from "../styles/Popular.module.css";

const Links = ["Popular", "Favourites", "Top Rated", "Now Playing"];

export default function Favourites() {
  const favoriteCtx = useContext(FavoriteContext);
  const [movieData, setmovieData] = useState(favoriteCtx.favorites.reverse());
  const [searchTerm, setsearchTerm] = useState("");
  const appBackground = useColorModeValue("gray.100", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const seachMovies = async (e: FormEvent) => {
    e.preventDefault();
    const movie = favoriteCtx.favorites.filter((m: MovieEntity) =>
      m.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(movie);
    setmovieData(movie);
  };
  return (
    <Box background={appBackground}>
      <Head>
        <title>Favourite Movies</title>
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
              <Input
                disabled={true}
                fill="ThreeDFace"
                justifySelf="center"
                maxW="250px"
                onChange={(e) => {
                  setsearchTerm(e.target.value);
                }}
                placeholder="Search Movies"
              ></Input>
              <Button ml={3} variant="solid" type="submit">
                <FaSearch></FaSearch>
              </Button>
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
        <SectionHeading text="Favourite" />

        <Flex m={3} wrap="wrap" justifyContent="center">
          {favoriteCtx.favoriteCount === 0 && (
            <Stack>
              <Text textAlign="center">You don't have any favourites yet.</Text>
              <Text textAlign="center">
                Add some Top Rated ⭐ to your favourites.
              </Text>
              <br />
              <Button display="block">
                <Link href="/toprated">Top Rated</Link>
              </Button>
            </Stack>
          )}
          {favoriteCtx.favorites.reverse().map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
        </Flex>
      </Flex>
      <Footer></Footer>
    </Box>
  );
}
