import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovieContext from '../store/context/MovieContext';
import {FavouritesContext} from'../store/context/FavouritesContext' 

const DetailsScreen = () => {
  const route = useRoute();
  const { movie } = route.params;
  const [isFavourite, setisFavourite] = useState(false);
  const { deleteMovie } = useContext(MovieContext)
  const { addFavourite, deleteFavourite } = useContext(FavouritesContext)

  const navigation = useNavigation();

  useEffect(() => {
    checkIsFavourite();
  }, []); 

  const checkIsFavourite = async () => {
    try {
      const favouriteJson = await AsyncStorage.getItem('Favourite');
      const favourite = favouriteJson ? JSON.parse(favouriteJson) : [];
      const found = favourite.some(item => item.id === movie?.id);
      setisFavourite(found);
    } catch (error) {
    }
  };
  const changeFavouriteStatusHandler = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem('Favourite');
      let favouritesData = [];
      if (storedFavourites) {
        favouritesData = JSON.parse(storedFavourites);
        if (!Array.isArray(favouritesData)) {
          favouritesData = [favouritesData];
        }
      }
  
      if (!favouritesData.some(item => item.id === movie?.id)) {
        addFavourite(movie);
        setisFavourite(true);
        alert('The chosen movie is added to the Favorites list.');
      } else {
        deleteFavourite(movie);
        setisFavourite(false);
        alert('The chosen movie is removed from the Favorites list.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleUpdate = () => {
    navigation.navigate('Edit', {movie});
  };

  const handleDelete= async ()=>{
  try {
    deleteMovie(movie)
    navigation.navigate('Home')
  } catch (error) {
    console.log('Error deleting movie')
  }  

  }
  const date = movie?.release_date.split('T')[0]
  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {movie ? (
        <>
          <View style={styles.imageContainer}>
            <Image source={{ uri: movie?.poster_path }} style={styles.poster} />
            <TouchableOpacity onPress={changeFavouriteStatusHandler} style={styles.favoriteIcon}>
              <Ionicons name={isFavourite ? 'heart' : 'heart-outline'} size={28} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{movie?.title}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsText}>Rating: {movie?.vote_average}</Text>
            <Text style={styles.detailsText}>
              Release Date: {date}
            </Text>
          </View>
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <View style={styles.overviewBorder} />
            <Text style={styles.overviewText}>{movie?.overview}</Text>
          </View>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity onPress={handleDelete}  style={styles.actionButton}>
              <Ionicons name="trash" size={28} color="white" />
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUpdate} style={styles.actionButton}>
              <Ionicons name="create" size={28} color="white" />
              <Text style={styles.actionButtonText}>Update</Text>
            </TouchableOpacity>
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
    margin: 10,
    flex: 1,
    backgroundColor: '#EFD7C5',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#B36A5E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    marginBottom:20,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  indicator: {
    marginTop: 16,
  },
});
