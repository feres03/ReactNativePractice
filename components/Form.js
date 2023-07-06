import { Pressable, ScrollView, StyleSheet, Text, View,KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";

import MovieName from "./form/movieName";
import MoviePic from "./form/moviePic";
import MovieRating from "./form/movieRating";
import MovieRelease from "./form/movieRelease";
import MovieDuration from "./form/movieDuration";
import MovieGenres from "./form/movieGenres";
import MovieOverview from "./form/movieOverview";

function Form(){
    const navigation = useNavigation();
    const handleAddMovie = async () => {
      // get existing movies from AsyncStorage
      try {
        const storedMovies = await AsyncStorage.getItem('movies');
        let movies = [];
        if (storedMovies) {
          movies = JSON.parse(storedMovies);
        }
        // Check if the movie already exists in the array
        const movie = {
          id: uuidv4(), // Generate a random ID for the movie
          title: storedMovies.title, // Corrected: Use `storedMovies.title` to get the title
          // Add other properties of the movie
        };
        const existingMovie = movies.find((m) => m.title.toLowerCase() === movie.title.toLowerCase());
        if (existingMovie) {
          alert('Movie already exists!');
          return;
        }
        // Update the movies list with the new movie
        movies.push(movie);
        // Save the updated movies list to AsyncStorage
        await AsyncStorage.setItem('movies', JSON.stringify(movies));
      } catch (error) {
        console.log('Error saving movie:', error);
      }
      navigation.navigate('Home', { movie });
    };
    return (
        <KeyboardAvoidingView style={styles.KeyboardAvoiding} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Add Movie</Text>
         <MovieName/>
         <MoviePic/>
         <MovieRating/>
         <MovieRelease/>
         <MovieDuration/>
         <MovieGenres/>
         <MovieOverview/>
 
          <Pressable style={styles.addButton} onPress={handleAddMovie}>
            <Text style={styles.addButtonText}>Add Movie</Text>
          </Pressable>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
      );
}
export default Form;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#B36A5E",
      padding: 20,
      paddingTop: 50,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      marginBottom: 20,
      marginStart: 115,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      color: "white",
    },
    addButton: {
      backgroundColor: "#EFD7C5",
      paddingVertical: 10,
      marginTop: 10,
      borderRadius: 6,
      alignItems: "center",
    },
    addButtonText: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
    },
      KeyboardAvoiding:{
        flex: 1
      }
  });
  