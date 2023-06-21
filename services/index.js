import axios from "axios";

export const getAllMovies = async () => {
    try {
        const response = await axios.get(
            'https://api.themoviedb.org/3/movie/top_rated?api_key=ce368a0d5d44ebad5e11cf907fd4340d'
        );
        const films = response.data.results;
        return films;
    } catch (error) {
        console.log(error);
    }
};
export const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=ce368a0d5d44ebad5e11cf907fd4340d`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const getFavouritesMovies = async (favouritesIds) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=ce368a0d5d44ebad5e11cf907fd4340d');
        const films = response.data.results.filter(movie => favouritesIds.includes(movie.id));
        return films;
    } catch (error) {
        console.log(error);
    }
};