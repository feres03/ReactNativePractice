import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=ce368a0d5d44ebad5e11cf907fd4340d';

export const setMoviesData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // Save data to AsyncStorage
    await AsyncStorage.setItem('topRatedMovies', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to AsyncStorage:', error);
  }
};

export const getAllMovies = async () => {
  try {
    const storedData = await AsyncStorage.getItem('topRatedMovies');
  
    if (storedData !== null) {
      const films = JSON.parse(storedData).results;
      return films;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const storedData = await AsyncStorage.getItem(`movieDetails_${movieId}`);
    if (storedData !== null) {
      return JSON.parse(storedData);
    }
    const movieDetails = await storedData.json();
    // Store the fetched movie details in AsyncStorage
    AsyncStorage.setItem(`movieDetails_${movieId}`, JSON.stringify(movieDetails));
    return movieDetails;
  } catch (error) {
    console.log(error);
  }
};

export const getFavouriteMovies = async (favouritesIds) => {
  try {
    const storedData = await AsyncStorage.getItem('MoviesData');
    if (storedData !== null) {
      const moviesData = JSON.parse(storedData);
      const films = moviesData.results.filter(movie => favouritesIds.includes(movie.id));
      return films;
    }
  } catch (error) {
    console.log(error);
  }
};
