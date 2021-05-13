import { Box, Button, Flex, flexbox, Input } from "@chakra-ui/react";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { FormEvent } from "react";
import MovieCard from "../components/MovieCard";
import { MovieEntity } from "../interfaces/Movies";
import FavoriteContext from "../store/favorite-context";
const API_KEY = process.env.TMDB_API_KEY;
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
interface PopularPageProps {
  movies: MovieEntity[];
}

function popular({ movies }: PopularPageProps) {
  const [movieData, setmovieData] = useState(movies);
  const [searchTerm, setsearchTerm] = useState("");
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
    <>
      <Head>
        <title>Popular Movies</title>
      </Head>
      <Flex direction="column">
        <Flex direction="row">
          <form
            style={{ display: "flex", width: "100%" }}
            onSubmit={(e) => {
              seachMovies(e);
            }}
          >
            <Input
              onChange={(e) => {
                setsearchTerm(e.target.value);
              }}
              placeholder="Search Movies"
            ></Input>
            <Button type="submit">Search</Button>
          </form>
          <Link href="/favorites">
            <Button colorScheme="purple" variant="outline">
              <p>Favorites</p>
            </Button>
          </Link>
        </Flex>
        <Flex m={3} wrap="wrap" justifyContent="center">
          {movieData.map((movie) => (
            <MovieCard key={movie.id} movie={movie}></MovieCard>
          ))}
        </Flex>
      </Flex>
    </>
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
