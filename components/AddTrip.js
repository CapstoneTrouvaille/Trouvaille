import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Formik } from "formik";

const AddTrip = () => {
  return (
    <View style={styles.container}>
      <Text>Where to next</Text>
      <Formik
        initialValues={{
          tripName: "",
          location: "",
          startDate: "",
          endDate: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleSubmit }) => (
          <>
            <Text style={styles.inputText}>Trip Name</Text>
            <TextInput
              maxLength={50}
              keyboardType="ascii-capable"
              clearButtonMode="always"
              onChangeText={handleChange("tripName")}
              placeholder="Enter trip name"
              style={[styles.inputContainer, styles.input]}
            />
            <Text style={styles.inputText}>Location</Text>
            <TextInput
              maxLength={50}
              keyboardType="ascii-capable"
              clearButtonMode="always"
              onChangeText={handleChange("location")}
              placeholder="Location"
              style={[styles.inputContainer, styles.input]}
            />
            <Text style={styles.inputText}>Trip start date</Text>
            <TextInput
              maxLength={50}
              keyboardType="ascii-capable"
              clearButtonMode="always"
              onChangeText={handleChange("location")}
              placeholder="MM/DD/YY"
              style={[styles.inputContainer, styles.input]}
            />
            <Text style={styles.inputText}>Trip end date</Text>
            <TextInput
              maxLength={50}
              keyboardType="ascii-capable"
              clearButtonMode="always"
              onChangeText={handleChange("location")}
              placeholder="MM/DD/YY"
              style={[styles.inputContainer, styles.input]}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Get Planning!</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9DAC4",
  },
  inputContainer: {
    width: "80%",
  },
  inputText: {
    textAlign: "left",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#483D8B",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#483D8B",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#483D8B",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
