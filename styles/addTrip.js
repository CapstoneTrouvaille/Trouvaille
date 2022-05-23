import { StyleSheet } from "react-native";

export default StyleSheet.create({
  stack: {
    alignSelf: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 10,
    width:"50%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius:5,
    backgroundColor: "rgba(255, 255, 255, 0.77)",
    marginBottom:10,
  },
  heading: {
    fontFamily: "GiveYouGlory_400Regular",
    fontSize: 40,
    paddingTop: "9%",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: 230,
  },
  subtitle: {
    fontFamily: "Jaldi_400Regular",
    fontSize: 16,
    alignItems: "center",
  },
  text: {
    fontFamily: "Jaldi_400Regular",
    textAlign: "left",
    width: 230,
    fontSize: 16,
    color: "#000",
  },
  button: {
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: "#999DC3",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Jaldi_400Regular",
    fontSize: 15,
  },
});
