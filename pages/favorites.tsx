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

export default Favorites;
