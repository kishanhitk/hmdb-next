import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const API_KEY = process.env.TMDB_API_KEY;
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
  console.log(req.query.query);
  const searchTerm = req.query.query;
  const response = await axios.get(SEARCH_URL + "&query=" + searchTerm);
  res.status(200).json(response.data);
};
