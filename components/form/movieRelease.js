import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DatePicker from 'react-native-datepicker'
import moment from "moment";


function MovieRelease(){
    const [release_date, setReleasedate] = useState('');
    const maxDate = moment().format("YYYY-MM-DD");
return(
    <View style={styles.inputContainer}>
          <Text style={styles.label}>Release date:</Text>
          <DatePicker
            style={styles.datePicker}
            date={release_date}
            mode="date"
            placeholder="Select release date"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            maxDate={maxDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: styles.datePickerInput,
              dateText: styles.datePickerText,
            }}
            onDateChange={setReleasedate}
          />
        </View>
)
}
export default MovieRelease;

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
      datePicker: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
      },
      datePickerInput: {
        borderWidth: 0,
        alignItems: "flex-start",
        justifyContent: "center",
      },
      datePickerText: {
        color: "black",
      },
})