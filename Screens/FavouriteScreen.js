import React, {useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import MovieContext from "../store/context/MovieContext";

function FavouritesScreen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {favouriteMovies,deleteFavourite } = useContext(MovieContext);


  const isFocused = useIsFocused();
  
 
  useEffect(() => {
    if (isFocused) {
      favouriteMovies
    }
  }, [isFocused]);

  // Navigate to the movie details screen
  const handleMoviePress = (movie) => {
    navigation.navigate('Details', { movie });
  };

// Delete action
const deleteMovie = (movie) => {
  setSelectedMovie(movie);
  setModalVisible(true);
};

  // Confirm delete action
  const confirmDelete = async () => {
    try {
      await deleteFavourite(selectedMovie); // Use the deleteFavourite function from the context
      setModalVisible(false);
      setSelectedMovie(null); // Reset the selected movie after deleting
    } catch (error) {
      console.log('Error deleting movie:', error);
    }
  };

  const renderItem = ({ item }) => {
    const imageUri = item.poster_path
  
    return (
      <Pressable style={styles.gridItem} onPress={()=>handleMoviePress(item)}>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <Pressable style={styles.deleteIconContainer} onPress={() => deleteMovie(item)}>
          <AntDesign name="close" size={18} color="white" />
        </Pressable>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.average}>{item.vote_average}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
    {movies.length > 0 ? (
      <FlatList
        data={movies}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}

      />
    ) : (
      <Text style={styles.noMoviesText}>No favourite movies</Text>
    )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this movie?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={confirmDelete}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B36A5E',
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
  gridItem: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#EFD7C5',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'red',
    borderRadius: 30,
    width: 17,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  average: {
    fontSize: 14,
    textAlign: 'center',
  },
  noMoviesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#B36A5E',
    borderRadius: 6,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
