import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getMovieDetails } from '../services';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsScreen = () => {
  const route = useRoute();
  const { movie } = route.params;

  const [isFavourite,setisFavourite]=useState(false)

  useEffect(() => {
    checkisFavourite()
  }, []);

  const checkisFavourite = async() =>{
    try {
      const favouriteJson = await AsyncStorage.getItem('Favourite')
      const favourite = favouriteJson ? JSON.parse(favouriteJson) : []
      const found = favourite.some(item=>item.id===movie.id)
      setisFavourite(found)
      
    } catch (error) {
      console.log(error)
    }
  }
  
 

  const changeFavouriteStatusHandler = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem('Favourite');
      let moviesData = [];
  
      if (storedMovies) {
        moviesData = JSON.parse(storedMovies);
        if (!Array.isArray(moviesData)) {
          moviesData = [moviesData];
        }
      }
  
      // Check if the movie is already in favorites before adding it
      if (!moviesData.some((item) => item.id === movie.id)) {
        moviesData.push(movie);
        setisFavourite(true);
        alert('The chosen movie is added to the Favourites list.');
      } else {
        moviesData = moviesData.filter((item) => item.id !== movie.id);
        setisFavourite(false);
        alert('The chosen movie is removed from the Favorites list.');
      }
  
      await AsyncStorage.setItem('Favourite', JSON.stringify(moviesData));
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movie ? (
        <>
          <View style={styles.imageContainer}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
            <TouchableOpacity onPress={changeFavouriteStatusHandler} style={styles.favoriteIcon}>
              <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={28} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie.title}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Rating: {movie.vote_average}</Text>
            <Text style={styles.detailsText}>
              Duration: {movie.runtime} minutes | Release Date: {movie.release_date}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.genresContainer}>
                {movie?.genres?.map((genre) => (
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
            <Text style={styles.overviewText}>{movie.overview}</Text>
          </View>
        </>
      ) : (
        <ActivityIndicator style={styles.indicator} size="small" color="#0000ff" />
      )}
    </ScrollView>
  );
};

export default DetailsScreen;

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 6,
    borderRadius: 16,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    textAlign: 'center',
  },
  genresContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  genre: {
    backgroundColor: '#B36A5E',
    padding: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  genreText: {
    color: 'white',
    fontSize: 14,
  },
  overviewContainer: {
    marginBottom: 8,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overviewBorder: {
    height: 2,
    backgroundColor: '#B36A5E',
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 16,
    textAlign: 'justify',
  },
  indicator: {
    marginTop: 16,
  },
});
