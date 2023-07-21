import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MovieContext from '../store/context/MovieContext';

function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { movies,setMovies } = useContext(MovieContext);
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
  const handleDetails = (movie) => {
    navigation.navigate('Details', { movie });
  };
  useEffect(() => {
    if (route.params?.updatedMovies) {
      const updatedMovies = route.params.updatedMovies;
      setMovies(updatedMovies); // Change this line to set the movies state
      setFilteredMovies(updatedMovies);
    }
  }, [route.params?.updatedMovies]);
  useEffect(() => {
    setFilteredMovies(movies); // Set the initial value of filteredMovies to the movies array
  }, [movies]);

  const renderItem = ({ item }) => {
    const imageUri = item.poster_path;
    return (
      <Pressable style={styles.gridItem} onPress={() => handleDetails(item)}>
        <Image style={styles.image} source={{ uri: imageUri }} />
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
    resizeMode: 'contain',
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
