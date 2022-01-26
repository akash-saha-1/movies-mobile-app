import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=0a265acc28d52ce1f04daa506f78f4e0';
const horrorGenres = 27;
const thrillerGenres = 53;
const scienceFictionGenres = 878;

// get popluar movies
export const getPopularMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return res.data.results;
};

// get upcoming movies
export const getUpcomingMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return res.data.results;
};

// get popluar TV
export const getPopularTV = async () => {
  const res = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return res.data.results;
};

// get horror movies
export const getHorrorMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=${horrorGenres}`,
  );
  return res.data.results;
};

// get thriller movies
export const getThrillerMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=${thrillerGenres}`,
  );
  return res.data.results;
};

// get action movies
export const getScienceFictionMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=${scienceFictionGenres}`,
  );
  return res.data.results;
};
