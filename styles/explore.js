import { StyleSheet } from "react-native";

export default StyleSheet.create({
  formBox: {
    marginVertical: 10,
    width: "90%",
    marginTop:0
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.77)",
  },
  text: {
    textAlign: "left",
    width: 230,
    fontSize: 16,
    fontFamily: "Jaldi_400Regular",
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
  buttonContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
  },
  label: {
    backgroundColor: "red",
    fontFamily: "GiveYouGlory_400Regular",
  },
  exploreText: {
    marginTop:10,
    fontSize:40,
    fontFamily: "GiveYouGlory_400Regular",
  },
});
