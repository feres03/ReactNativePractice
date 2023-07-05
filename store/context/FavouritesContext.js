import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFavouriteMovies } from "../../services";

export const FavouritesContext = createContext({
  ids: [],
  movies: [],
  addFavourite: (id) => {},
  deleteFavourite: (id) => {},
});

function FavouritesContextProvider({ children }) {
  const [favouritesIds, setFavouritesIds] = useState([]);
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const loadFavouritesIds = async () => {
      try {
        const storedIds = await AsyncStorage.getItem("MoviesData");
        if (storedIds !== null) {
          setFavouritesIds(JSON.parse(storedIds));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadFavouritesIds();
  }, []);

  useEffect(() => {
    const saveFavouritesIds = async () => {
      try {
        await AsyncStorage.setItem(
          "favouritesIds",
          JSON.stringify(favouritesIds)
        );
      } catch (error) {
        console.log(error);
      }
    };

    saveFavouritesIds();
  }, [favouritesIds]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const films = await getFavouriteMovies(favouritesIds);
        setMovies(films);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [favouritesIds]);

  async function addFavourite(id) {
    try {
      setFavouritesIds((currentFavIds) => [...currentFavIds, id]);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFavourite(id) {
    try {
      setFavouritesIds((currentFavIds) =>
        currentFavIds.filter((movieId) => movieId !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    ids: favouritesIds,
    movies: movies,
    addFavourite: addFavourite,
    deleteFavourite: deleteFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContextProvider;
