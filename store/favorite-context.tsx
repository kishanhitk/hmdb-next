import { createContext, useState } from "react";
import { MovieEntity } from "../interfaces/Movies";

const FavoriteContext = createContext({
  favorites: [],
  favoriteCount: 0,
  addToFavorite: (movie: MovieEntity): any => {},
  removeFromFavorite: (movie: MovieEntity): any => {},
  isFavorite: (movie: MovieEntity): any => {},
});

export function FavoriteContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState<MovieEntity[]>([]);
  const addToFavorite = (movie: MovieEntity) => {
    setUserFavorites((prevState) => {
      return prevState.concat(movie);
    });
  };
  const removeFromFavorite = (movie: MovieEntity) => {
    setUserFavorites((prevState) => {
      return prevState.filter((m) => m.id !== movie.id);
    });
  };
  const isFavorite = (movie: MovieEntity) => {
    return userFavorites.some((m) => m.id === movie.id);
  };
  const context = {
    favorites: userFavorites,
    favoriteCount: userFavorites.length,
    addToFavorite: addToFavorite,
    removeFromFavorite: removeFromFavorite,
    isFavorite: isFavorite,
  };
  return (
    <FavoriteContext.Provider value={context}>
      {props.children}
    </FavoriteContext.Provider>
  );
}
export default FavoriteContext;
