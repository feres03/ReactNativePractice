import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


function AddMovieScreen() {
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');
    const [rating, setRating] = useState('');
    const navigation = useNavigation();

    // Function to add the movie to HomeScreen
    const handleAddMovie = async () => {
        const movie = {
          name,
          picture,
          rating,
        };
      
        try {
console.log('Movie added')
          navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Movie</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Movie Name:</Text>
                <TextInput
                    placeholder="Enter movie name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Picture URL:</Text>
                <TextInput
                    placeholder="Enter picture URL"
                    value={picture}
                    onChangeText={setPicture}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Rating:</Text>
                <TextInput
                    placeholder="Enter rating"
                    value={rating}
                    onChangeText={setRating}
                    style={styles.input}
                    keyboardType="numeric"
                />
            </View>
            <Pressable style={styles.addButton} onPress={handleAddMovie}>
                <Text style={styles.addButtonText}>Add Movie</Text>
            </Pressable>
        </View>
    );
    }

export default AddMovieScreen;


styles = StyleSheet.create({
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
    marginStart:115,
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    color: "white",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: "#EFD7C5",
    paddingVertical: 10,
    marginTop:10,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
