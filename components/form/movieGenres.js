import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MultiSelect from "react-native-multiple-select";

function MovieGenres(){
    const [genres, setGenres] = useState('');
    const [selectedGenres,setSelectedgenres]=useState('')

return(
    <View style={styles.inputContainer}>
    <Text style={styles.label}>Genres:</Text>
    <MultiSelect
      items={[
        { id: '1', name: 'Action' },
        { id: '2', name: 'Comedy' },
        // Add more genres
      ]}
      uniqueKey="id"
      displayKey="name"
      onSelectedItemsChange={setSelectedgenres}
      selectedItems={selectedGenres}
    />
  </View>
)
}
export default MovieGenres;
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