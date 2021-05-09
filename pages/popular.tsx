import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { MovieEntity } from "../interfaces/Movies";
const API_KEY = process.env.TMDB_API_KEY;
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
interface PopularPageProps {
  movies: MovieEntity[];
}
function popular({ movies }: PopularPageProps) {
  return (
    <ul>
      {movies.map((movie) => (
        <li>{movie.title}</li>
      ))}
    </ul>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(POPULAR_URL);
  const data = await res.json();
  const movie: MovieEntity[] = data.results.map((data: MovieEntity) => {
    return data;
  });
  console.log(movie);
  return { props: { movies: movie } };
};
export default popular;

export const Page = (
  props: InferGetServerSidePropsType<PopularPageProps>
) => {};
