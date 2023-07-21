import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext();

function FavouritesContextProvider({ children }) {
  const [favouriteMovies, setfavouriteMovies] = useState([]);


  useEffect(() => {
    // Retrieve movies from AsyncStorage 
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem('Favourite');
      if (storedFavourites) {
        setfavouriteMovies(JSON.parse(storedFavourites));
      }
    } catch (error) {
      console.log('Error retrieving movies:', error);
    }
  };

  const addFavourite = async (movie) => {
    try {
      const storedFavourites = await AsyncStorage.getItem('Favourite');
      let updatedFavourites = [];
      if (storedFavourites) {
        updatedFavourites = JSON.parse(storedFavourites);
      }
      updatedFavourites.push(movie);
      setfavouriteMovies(updatedFavourites); // Update the favourites state
      await AsyncStorage.setItem('Favourite', JSON.stringify(updatedFavourites));
    } catch (error) {
      console.log('Error saving movie:', error);
    }
  };
  

  const deleteFavourite = async (movie) => {
    try {
      const storedFavourites = await AsyncStorage.getItem('Favourite');
      let updatedFavourites = [];
      if (storedFavourites) {
        updatedFavourites = JSON.parse(storedFavourites);
        updatedFavourites = updatedFavourites.filter((item) => item.id !== movie.id);
        await AsyncStorage.setItem('Favourite', JSON.stringify(updatedFavourites));
  
        // Update the state with the updated favourites
        setfavouriteMovies(updatedFavourites);
      }
    } catch (error) {
      console.log('Error deleting movie:', error);
    }
  };
  return (
    <FavouritesContext.Provider value={{addFavourite,deleteFavourite,favouriteMovies}}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContextProvider;
