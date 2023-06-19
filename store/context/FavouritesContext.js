import { createContext, useState, useEffect } from "react";
import axios from 'axios';

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
        fetchMovies();
    }, []);

    //  filter method based on whether the movies ids exist in the favouritesIds array. 
    const fetchMovies = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=ce368a0d5d44ebad5e11cf907fd4340d');
            const films = response.data.results.filter(movie => favouritesIds.includes(movie.id));
            setMovies(films);
        } catch (error) {
            console.log(error);
        }
    };
    // function adds a movie id to the favouritesIds
    function addFavourite(id) {
        setFavouritesIds((currentFavIds) => [...currentFavIds, id]);
        fetchMovies();
    }
    //  function removes a movie id from the favouritesIds
    function deleteFavourite(id) {
        setFavouritesIds((currentFavIds) =>
            currentFavIds.filter((movieId) => movieId !== id)
        );
        fetchMovies();
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
