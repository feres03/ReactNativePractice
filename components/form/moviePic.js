import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function MoviePic(){
    const [picture, setPicture] = useState();

    return(
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Picture URL:</Text>
        <TextInput
          placeholder="Enter picture URL"
          value={picture}
          onChangeText={setPicture}
          style={styles.input}
        />
      </View>
    )
}
export default MoviePic
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
})