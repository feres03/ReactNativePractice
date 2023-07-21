import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from 'react';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites,setFavorites]=useState([])

  useEffect(() => {
    // Retrieve movies from AsyncStorage 
    retrieveMovies();
  }, []);

  const retrieveMovies = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem('movies');
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      }
    } catch (error) {
      console.log('Error retrieving movies:', error);
    }
  };

  const addMovie = async (movie) => {
    try {
      // Check if the movie already exists in the array
      const existingMovie = movies.find((m) => m.title.toLowerCase() === movie.title.toLowerCase());
      if (existingMovie) {
        alert('Movie already exists!');
        return;
      }

      const updatedMovies = [...movies, movie];
      setMovies(updatedMovies); // Update the movies state
      await AsyncStorage.setItem('movies', JSON.stringify(updatedMovies));
    } catch (error) {
      console.log('Error saving movie:', error);
    }
  };
  const deleteMovie = async (movie) => {
    try {
      const storedMovies = await AsyncStorage.getItem('movies');
      let updatedMovies = [];
      if (storedMovies) {
        updatedMovies = JSON.parse(storedMovies);
        updatedMovies = updatedMovies.filter((item) => item.id !== movie.id);
        await AsyncStorage.setItem('movies', JSON.stringify(updatedMovies));
      }
  
      // Update favorites list as well
      const storedFavorites = await AsyncStorage.getItem('Favourite');
      let updatedFavorites = [];
      if (storedFavorites) {
        updatedFavorites = JSON.parse(storedFavorites);
        updatedFavorites = updatedFavorites.filter((item) => item.id !== movie.id);
        await AsyncStorage.setItem('Favourite', JSON.stringify(updatedFavorites));
      }
  
      setMovies(updatedMovies);
      setFavorites(updatedFavorites); // Update favorites state
  
      alert("Success! Your movie has been deleted.");
    } catch (error) {
      console.log('Error deleting movie:', error);
    }
  };
  

  return (
    <MovieContext.Provider value={{ movies, addMovie,deleteMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
