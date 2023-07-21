import React, { useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditMovieScreen = () => {
  const route = useRoute();
  const { movie } = route.params;
  const navigation = useNavigation();

  const [title, setTitle] = useState(movie.title);
  const [posterPath, setPosterpath] = useState(movie.posterPath);
  const [vote_average, setRating] = useState(movie.vote_average.toString());
  const [release_date, setReleasedate] = useState(movie.release_date);
  const [runtime, setRuntime] = useState(movie.runtime.toString());
  const [overview, setOverview] = useState(movie.overview);
  


  const handleUpdate = async () => {
    const updatedMovie = {
      ...movie,
      title,
      posterPath,
      vote_average: parseFloat(vote_average),
      release_date,
      runtime: parseInt(runtime),
      overview,
    };

    try {
      const storedMovies = await AsyncStorage.getItem('movies');
      let moviesData = storedMovies ? JSON.parse(storedMovies) : [];
  
      const updatedMovies = moviesData.map((item) =>
        item.id === movie.id ? updatedMovie : item
        );
  
      await AsyncStorage.setItem('movies', JSON.stringify(updatedMovies));
      console.log('The movie details have been updated.');
      // console.log('Updated Movies:', updatedMovies);
  
      navigation.navigate('Details', { movie: updatedMovie });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <ScrollView>
        <Text style={styles.title}>Edit Movie</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Movie Name:</Text>
          <TextInput value={title} onChangeText={setTitle} style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Picture URL:</Text>
          <TextInput value={posterPath} onChangeText={setPosterpath} style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Rating:</Text>
          <TextInput
            value={vote_average}
            onChangeText={setRating}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Release date:</Text>
          <TextInput value={release_date} onChangeText={setReleasedate} style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Duration (minutes):</Text>
          <TextInput
            value={runtime}
            onChangeText={setRuntime}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Overview:</Text>
          <TextInput value={overview} onChangeText={setOverview} style={styles.input} multiline />
        </View>
        <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditMovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFD7C5',
    padding:20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  updateButton: {
    backgroundColor: '#B36A5E',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
