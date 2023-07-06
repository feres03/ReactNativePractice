import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function MovieOverview(){
    const [overview, setOverview] = useState('');
return(
<View style={styles.inputContainer}>
            <Text style={styles.label}>Overview:</Text>
            <TextInput
              placeholder="Enter overview"
              value={overview}
              onChangeText={setOverview}
              style={styles.input}
            />
          </View>
)

}
export default MovieOverview;
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