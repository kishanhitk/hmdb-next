import { GetStaticProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React, { useContext } from "react";
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
      <Link href="/favorites">Favorite Page</Link>
      <h1>Favourites- {favoriteCtx.favoriteCount}</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <>
              <p>{movie.title}</p>
              <button onClick={() => handleFavouriteButtonClick(movie)}>
                {favoriteCtx.isFavorite(movie) ? "Remove" : "Add"}
              </button>
            </>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(POPULAR_URL);
  const data = await res.json();
  const movie: MovieEntity[] = data.results.map((data: MovieEntity) => {
    return data;
  });
  return { props: { movies: movie } };
};
export default popular;

export const Page = (
  props: InferGetServerSidePropsType<PopularPageProps>
) => {};
