import {
  Box,
  Button,
  Flex,
  flexbox,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import head from "next/head";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FormEvent } from "react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import MovieCard from "../components/MovieCard";
import { MovieEntity } from "../interfaces/Movies";
import FavoriteContext from "../store/favorite-context";
import classes from "../styles/Popular.module.css";
const API_KEY = process.env.TMDB_API_KEY;
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
interface PopularPageProps {
  movies: MovieEntity[];
}

function popular({ movies }: PopularPageProps) {
  const [movieData, setmovieData] = useState(movies);
  const [searchTerm, setsearchTerm] = useState("");
  const appBackground = useColorModeValue("gray.100", "gray.700");
  const headerBackground = useColorModeValue("gray.300", "gray.900");

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
        <Flex
          width="100%"
          top="0"
          position="sticky"
          zIndex="11"
          justifyContent="center"
          direction="row"
          p={4}
          className={classes.header}
        >
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
              fill="ThreeDFace"
              justifySelf="center"
              maxW="250px"
              onChange={(e) => {
                setsearchTerm(e.target.value);
              }}
              placeholder="Search Movies"
            ></Input>
            <Button ml={3} variant="solid" type="submit">
              Search
            </Button>
          </form>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
        <Flex m={3} wrap="wrap" justifyContent="center">
          {movieData.map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
        </Flex>
      </Flex>
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

export const Page = (
  props: InferGetServerSidePropsType<PopularPageProps>
) => {};
