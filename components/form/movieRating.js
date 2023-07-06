import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function MovieRating(){
    const [vote_average, setVote_average] = useState('');

return(
    <View style={styles.inputContainer}>
    <Text style={styles.label}>Rating:</Text>
    <TextInput
      placeholder="Enter rating"
      value={vote_average}
      onChangeText={setVote_average}
      style={styles.input}
      keyboardType="numeric"
    />
  </View>
)

}
export default MovieRating;

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