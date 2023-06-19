import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavouritesContext } from '../store/context/FavouritesContext';

const DetailsGridTile = () => {
    const favouriteMoviescontext = useContext(FavouritesContext);

    const navigation = useNavigation();
    const route = useRoute();
    const { movie } = route.params;

    const [movieDetails, setMovieDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    const movieIsFavourite = favouriteMoviescontext.ids.includes(movie.id)

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=ce368a0d5d44ebad5e11cf907fd4340d`
                );
                const movieData = response.data;
                setMovieDetails(movieData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovieDetails();
    }, [movie.id]);

    const changeFavouriteStatusHandler = () => {
        if (movieIsFavourite) {
            favouriteMoviescontext.deleteFavourite(movie.id)
        }
        else {
            favouriteMoviescontext.addFavourite(movie.id)
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {movieDetails ? (
                <>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
                            style={styles.poster}
                        />
                        <TouchableOpacity onPress={changeFavouriteStatusHandler} style={styles.favoriteIcon}>
                            <Ionicons name={movieIsFavourite ? 'heart' : 'heart-outline'} size={28} color="#C89F9C" />
                            {/* {isFavorite && <Ionicons name="add" size={12} color="white" style={styles.plusIcon} />} */}
                            {isFavorite && <Text style={styles.plusIcon}>Added to favourites</Text>}

                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{movieDetails.title}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>Rating: {movieDetails.vote_average}</Text>
                        <Text style={styles.detailsText}>
                            Duration: {movieDetails.runtime} minutes | Release Date: {movieDetails.release_date}
                        </Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.genresContainer}>
                                {movieDetails.genres.map((genre) => (
                                    <View key={genre.id} style={styles.genre}>
                                        <Text style={styles.genreText}>{genre.name}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.overviewContainer}>
                        <Text style={styles.overviewTitle}>Overview</Text>
                        <View style={styles.overviewBorder} />
                        <Text style={styles.overviewText}>{movieDetails.overview}</Text>
                    </View>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#EFD7C5',
        padding: 8,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    poster: {
        width: '100%',
        aspectRatio: 0.7,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        alignItems: 'center',
    },
    plusIcon: {
        color: 'white',
        fontWeight: 'bold',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 8,
    },
    detailsContainer: {
        marginBottom: 14,
    },
    detailsText: {
        fontSize: 15,
        marginBottom: 8,
    },
    genresContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    genre: {
        backgroundColor: '#C89F9C',
        borderRadius: 16,
        marginRight: 8,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    genreText: {
        color: 'white',
        fontSize: 14,
    },
    overviewContainer: {
        borderWidth: 1,
        borderColor: '#C89F9C',
        borderRadius: 8,
        padding: 12,
        margin: 10,
    },
    overviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    overviewBorder: {
        height: 1,
        backgroundColor: '#C89F9C',
        marginBottom: 8,
    },
    overviewText: {
        fontSize: 16,
    },
});

export default DetailsGridTile;
