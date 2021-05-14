import {
  Text,
  Flex,
  Image,
  Box,
  useToast,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { MovieEntity } from "../interfaces/Movies";
import FavoriteContext from "../store/favorite-context";
import classes from "./MovieCard.module.css";
const IMAGE_API = "https://image.tmdb.org/t/p/w500/";
interface MovieCardProps {
  movie: MovieEntity;
}
function MovieCard({ movie }: MovieCardProps) {
  const toast = useToast();
  const favoriteCtx = useContext(FavoriteContext);
  const ratingColor = movie.vote_average > 8 ? "green.600" : "blue";
  const isFavorite = favoriteCtx.isFavorite(movie);
  const overviewBgColor = useColorModeValue("gray.300", "gray.900");
  const cardBgColor = useColorModeValue("gray.300", "gray.900");

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
      cursor="pointer"
      onDoubleClick={handleFavouriteButtonClick}
      className={classes.movie}
      rounded={5}
      direction="column"
      maxWidth="260px"
      maxH="520px"
      m={5}
      background={cardBgColor}
      justifyContent="space-around"
    >
      <Image
        background="white"
        alignSelf="flex-start"
        justifySelf="flex-start"
        roundedTop={5}
        minWidth="100%"
        src={IMAGE_API + movie.poster_path}
      />
      <Heading
        onClick={handleFavouriteButtonClick}
        cursor="pointer"
        position="absolute"
        r="0"
        top="0"
        zIndex="10"
      >
        {isFavorite ? "❤" : "🤍"}{" "}
      </Heading>
      <Flex alignItems="center" justifyContent="space-between" m="5">
        <Text fontSize="xl" fontWeight="bold">
          {movie.title}
        </Text>
        <Box rounded={4} p={1} background="white">
          <Text fontWeight="bold" color={ratingColor}>
            {movie.vote_average}
          </Text>
        </Box>
      </Flex>
      <Box className={classes.movieOver} background={overviewBgColor}>
        <Heading pb={4}>Overview</Heading>
        <Text>{movie.overview}</Text>
      </Box>
    </Flex>
  );
}

export default MovieCard;
