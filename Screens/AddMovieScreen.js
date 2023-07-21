import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import MovieContext from "../store/context/MovieContext";

function AddMovieScreen() {
  const { addMovie } = useContext(MovieContext);
  const [title, setTitle] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [vote_average, setRating] = useState("");
  const [release_date, setReleasedate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [runtime, setRuntime] = useState("");
  const [overview, setOverview] = useState("");
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16,9],
      quality: 1,
    });
    if (!result.canceled) {
      setPoster_path(result.assets[0].uri);
    }
  };

  const onChange=(event,selectedDate)=>{
    const currentDate = selectedDate || release_date
    setShow(Platform.OS === 'ios')
    setReleasedate(currentDate)
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate()+'/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
  }
const showMode=(currentMode)=>{
  setShow(true)
  setMode(currentMode)
}
  const handleAddMovie = async () => {
    if (
      title.trim() === "" ||
      poster_path.trim() === "" ||
      vote_average.trim() === "" ||
      runtime.trim() === "" ||
      overview.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const parsedRating = parseFloat(vote_average);
    if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 10) {
      alert("Please enter a valid rating between 0 and 10.");
      return;
    }
  
    const movie = {
      id: uuid.v4(),
      title,
      poster_path,
      vote_average,
      release_date: release_date.toISOString(),
      runtime,
      overview
    };
    // Retrieve existing movies from AsyncStorage
    try {
      addMovie(movie);
    } catch (error) {
      console.log('Error saving movie:', error);
    }
    navigation.navigate('Home');

  };


  const renderFooter = () => {
    return (
      <Pressable style={styles.addButton} onPress={handleAddMovie}>
        <Text style={styles.addButtonText}>Add Movie</Text>
      </Pressable>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Movie Name:</Text>
          <TextInput
            placeholder="Enter movie name"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Image:</Text>
          {poster_path ? (
            <View style={styles.selectImageContainer}>
              <Pressable onPress={pickImage}>
                <Text style={styles.selectImageButtonText}>Selected Image</Text>
              </Pressable>
              <Pressable onPress={pickImage}>
                <Icon name="check" style={styles.icon} />
              </Pressable>
            </View>
          ) : (
            <View style={styles.selectImageContainer}>
              <Pressable onPress={pickImage}>
                <Text style={styles.selectImageButtonText}>Select Image</Text>
              </Pressable>
              <Pressable onPress={pickImage}>
                <Icon name="camera" style={styles.icon} />
              </Pressable>
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Rating:</Text>
          <TextInput
            placeholder="Enter rating"
            value={vote_average}
            onChangeText={setRating}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Release Date:</Text>
         <Pressable style={styles.datePickerButton}>
            <Icon name="calendar" size={22} color="#DE2E4B" style={{ marginHorizontal: 10 }} />
            <DateTimePicker
              value={release_date || new Date()}
              mode="date"
              display="default"
              onChange={onChange}
              maximumDate={new Date()}
            />
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Duration:</Text>
          <TextInput
            placeholder="Enter duration in minutes"
            value={runtime}
            onChangeText={setRuntime}
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Overview:</Text>
          <TextInput
            placeholder="Enter overview"
            value={overview}
            onChangeText={setOverview}
            style={styles.input}
          />
        </View>
        {renderFooter()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AddMovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B36A5E",
    padding: 20,
 
  },
  inputContainer: {
    marginBottom: 30,
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
    marginTop: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectImageButtonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    fontSize: 25,
    marginRight: 5,
    color: 'black',
    marginLeft: 120
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
});

