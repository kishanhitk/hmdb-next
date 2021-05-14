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
      height="420px"
      width="260px"
      m={5}
      background={cardBgColor}
      justifyContent="space-around"
    >
      <Image
        height="100%"
        width="100%"
        fit="cover"
        alignSelf="flex-start"
        justifySelf="flex-start"
        roundedTop={5}
        fallbackSrc={`https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80`}
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
        {isFavorite ? "❤" : "🤍"}
      </Heading>
      <Box
        position="absolute"
        r="0"
        bottom="0"
        width="100%"
        className={classes.movieInfo}
      >
        <Flex alignItems="center" justifyContent="space-between" m="5">
          <Text color="white" fontSize="md" fontWeight="bold">
            {movie.title}
          </Text>
          <Box rounded={4} p={1} background="white">
            <Text fontWeight="bold" color={ratingColor}>
              {movie.vote_average}
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box className={classes.movieOver} background={overviewBgColor}>
        <Heading pb={4}>Overview</Heading>
        <Text>{movie.overview}</Text>
      </Box>
    </Flex>
  );
}

export default MovieCard;
