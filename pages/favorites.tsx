import { useContext } from "react";
import FavoriteContext from "../store/favorite-context";

function Favorites() {
  const favoriteCtx = useContext(FavoriteContext);
  return (
    <div>
      <h1>Favorites{favoriteCtx.favoriteCount}</h1>
    </div>
  );
}
export const getStaticProps = async () => {
  console.log(process.env.TMDB_API_KEY);
  return { props: {} };
};

export default Favorites;
