import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
 

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(text.toLowerCase()));
      setFilteredMovies(filtered);
    }
  };


  const deleteMovie = async (movie) => {
    const updatedMovies = movies.filter((m) => m !== movie);
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);

    try {
      await AsyncStorage.setItem('movies', JSON.stringify(updatedMovies));
    } catch (error) {
      console.log('Error saving movies:', error);
    }
  };

  useEffect(() => {
    if (route.params?.movie) {
      const newMovie = route.params.movie;
      const updatedMovies = [...movies, newMovie];
      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);

      try {
        AsyncStorage.setItem('movies', JSON.stringify(updatedMovies));
      } catch (error) {
        console.log('Error saving movies:', error);
      }
    }
  }, [route.params?.movie]);

  useEffect(() => {
    const retrieveMovies = async () => {
      try {
        const storedMovies = await AsyncStorage.getItem('movies');
        if (storedMovies) {
          const parsedMovies = JSON.parse(storedMovies);
          setMovies(parsedMovies);
          setFilteredMovies(parsedMovies);
        }
      } catch (error) {
        console.log('Error retrieving movies:', error);
      }
    };

    retrieveMovies();
  }, []);

  const renderItem = ({ item }) => {
    const imageUri = item.picture;
handleDetails = (movie)=>{
  console.log("Pressed")
  navigation.navigate("Details", { movie})
}
    return (
      <Pressable style={styles.gridItem} onPress={()=>{handleDetails(item)}}>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <Pressable style={styles.deleteIconContainer} onPress={() => deleteMovie(item)}>
          <AntDesign name="close" size={18} color="white" />
        </Pressable>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.average}>{item.vote_average}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="search" size={18} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={handleSearch}
          flex={1}
        />
      </View>
      <FlatList
        style={styles.list}
        data={filteredMovies}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B36A5E',
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    margin: 10,
    padding: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: '#EED7C5',
    borderColor: 'gray',
    borderRadius: 20,
  },
  searchIcon: {
    marginRight: 8,
    marginHorizontal: 10,
    color: 'gray',
  },
  searchInput: {
    flex: 1,
    color: 'black',
  },
  list: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'red',
    borderRadius: 30,
    width: 17,
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
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 6,
    marginBottom: 10,
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
});
