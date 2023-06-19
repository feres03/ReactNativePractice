import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const FavouritesContext = createContext({
    ids: [],
    movies: [],
    addFavourite: (id) => { },
    deleteFavourite: (id) => { },
});

function FavouritesContextProvider({ children }) {
    const [favouritesIds, setFavouritesIds] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=ce368a0d5d44ebad5e11cf907fd4340d');
            const films = response.data.results.filter(movie => favouritesIds.includes(movie.id));
            setMovies(films);
        } catch (error) {
            console.log(error);
        }
    };

    function addFavourite(id) {
        setFavouritesIds((currentFavIds) => [...currentFavIds, id]);
        fetchMovies();
    }

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
