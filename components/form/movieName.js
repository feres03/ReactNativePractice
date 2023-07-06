import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function MovieName(){
    const [title, setTitle] = useState('');

    return(          
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Movie Name:</Text>
        <TextInput
          placeholder="Enter movie name"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>
      )
}
export default MovieName;
const styles = StyleSheet.create({
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
}
    )