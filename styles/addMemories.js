import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    paddingTop: "10%",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  datePickerStyle: {
    width: 230,
  },
  text: {
    textAlign: "left",
    width: 230,
    fontSize: 16,
    fontFamily: "Jaldi_400Regular",
    color: "#000",
    backgroundColor: "rgba(255, 255, 255, 0.77)",

  },
  subtitle: {
    alignItems: "center",
    fontSize: 16,
    fontFamily: "Jaldi_400Regular",
  },
  recordUploadContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "3%",
  },
  buttons: {
    marginRight: "2%",
    backgroundColor: "#999DC3",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  playButton: {
    width: 200,
    marginBottom: "3%",
  },
});
