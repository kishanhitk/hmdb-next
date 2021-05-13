import { Box, Button, Flex, flexbox, Input } from "@chakra-ui/react";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import MovieCard from "../components/MovieCard";
import { MovieEntity } from "../interfaces/Movies";
import FavoriteContext from "../store/favorite-context";
const API_KEY = process.env.TMDB_API_KEY;
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
interface PopularPageProps {
  movies: MovieEntity[];
}
function popular({ movies }: PopularPageProps) {
  const favoriteCtx = useContext(FavoriteContext);

  const handleFavouriteButtonClick = (movie: MovieEntity) => {
    const isFavorite = favoriteCtx.isFavorite(movie);
    console.log(isFavorite);
    if (!isFavorite) {
      favoriteCtx.addToFavorite(movie);
    } else {
      favoriteCtx.removeFromFavorite(movie);
    }
  };
  return (
    <>
      <Head>
        <title>Popular Movies</title>
      </Head>
      <Flex direction="column">
        <div style={{ display: "flex", position: "sticky", top: "0" }}>
          <Input placeholder="Search Movies"></Input>
          <Link href="/favorites">
            <Button colorScheme="purple" variant="outline">
              <p>Favorites</p>
            </Button>
          </Link>
        </div>
        <Flex m={3} wrap="wrap" justifyContent="center">
          {movies.map((movie) => (
            <MovieCard movie={movie}></MovieCard>
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
