import {
  Text,
  Flex,
  Image,
  Button,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { MovieEntity } from "../interfaces/Movies";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import FavoriteContext from "../store/favorite-context";
const IMAGE_API = "https://image.tmdb.org/t/p/w500/";
interface MovieCardProps {
  movie: MovieEntity;
}
function MovieCard({ movie }: MovieCardProps) {
  const toast = useToast();
  const favoriteCtx = useContext(FavoriteContext);
  const ratingColor = movie.vote_average > 8 ? "green" : "blue";
  const isFavorite = favoriteCtx.isFavorite(movie);
  const handleFavouriteButtonClick = () => {
    if (!isFavorite) {
      favoriteCtx.addToFavorite(movie);
      toast({
        title: `${movie.title} added to Favorite`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      favoriteCtx.removeFromFavorite(movie);
      toast({
        title: `${movie.title} removed from Favorite`,
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      rounded={5}
      direction="column"
      maxWidth="260px"
      maxH="520px"
      m={5}
      background="blue.300"
      justifyContent="space-between"
    >
      <Image
        roundedTop={5}
        minWidth="100%"
        src={IMAGE_API + movie.poster_path}
      />
      <Flex alignItems="center" justifyContent="space-between" m={3}>
        <Text>{movie.title}</Text>
        <Box rounded={4} p={1} background="white">
          <Text color={ratingColor}>{movie.vote_average}</Text>
        </Box>
      </Flex>
      {isFavorite ? (
        <IconButton
          color="red"
          aria-label="Remove"
          onClick={handleFavouriteButtonClick}
          icon={<AiFillHeart size="2.5rem" />}
          m={3}
        ></IconButton>
      ) : (
        <IconButton
          onClick={handleFavouriteButtonClick}
          aria-label="Favorite"
          icon={<AiOutlineHeart size="2.5rem"></AiOutlineHeart>}
          m={3}
        ></IconButton>
      )}
    </Flex>
  );
}

export default MovieCard;
