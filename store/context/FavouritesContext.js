import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavouritesMovies } from "../../services";

// The default values for these properties are empty arrays and empty functions.
export const FavouritesContext = createContext({
    ids: [],
    movies: [],
    addFavourite: (id) => { },
    deleteFavourite: (id) => { },
});

function FavouritesContextProvider({ children }) {
    // an array of favorite movie ids.
    const [favouritesIds, setFavouritesIds] = useState([]);
    // an array of favorite movies' detailed information
    const [movies, setMovies] = useState([]);

    // fetch the detailed information 
    useEffect(() => {
        const fetchMovies = async () => {
            const films = await getFavouritesMovies(favouritesIds);
            setMovies(films);
        };
        fetchMovies();
    }, [favouritesIds]);

    // function adds a movie id to the favouritesIds
    async function addFavourite(id) {
        try {
            // Add the id to favouritesIds
            setFavouritesIds((currentFavIds) => [...currentFavIds, id]);
            // Store updated favouritesIds in AsyncStorage
            await AsyncStorage.setItem('favouriteIds', JSON.stringify([...favouritesIds, id]));
        } catch (error) {
            console.log(error);
        }
    }
    // function removes a movie id from the favouritesIds
    async function deleteFavourite(id) {
        try {
            // Remove the id from favouritesIds
            setFavouritesIds((currentFavIds) =>
                currentFavIds.filter((movieId) => movieId !== id)
            );
            // Store updated favouritesIds in AsyncStorage
            await AsyncStorage.setItem('favouriteIds', JSON.stringify(favouritesIds.filter((movieId) => movieId !== id)));
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
