import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function MovieDuration(){
    const [runtime, setRuntime] = useState('');

return(
    <View style={styles.inputContainer}>
    <Text style={styles.label}>Duration:</Text>
    <TextInput
      placeholder="Enter Duration in minutes"
      value={runtime}
      onChangeText={setRuntime}
      style={styles.input}
      keyboardType="numeric"
    />
  </View>
)
}
export default MovieDuration;
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