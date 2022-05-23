import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "90%",
  },
  headerBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    marginVertical:10,
    alignItems:"baseline"
  },
  header: {
    fontSize: 25,
    fontFamily: "Jaldi_700Bold",
    paddingTop:"2%"
  },

  button: {
    backgroundColor: "#999DC3",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "Jaldi_400Regular",
    fontSize: 18,
  },
  memoryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.77)",
    marginBottom: 6,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  deleteButton: {
    backgroundColor: "#a1a1aa",
    width: "20%",
  },
  voiceButton: {
    marginVertical: "2%",
    marginHorizontal:"1%"
  },
});
