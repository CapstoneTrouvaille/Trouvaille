import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "90%",
  },
  header: {
    fontSize: 25,
    padding: "2%, 2%, 0, 2%",
    marginTop: "3%",
    fontFamily: "Jaldi_700Bold",
  },
  button: {
    backgroundColor: "#999DC3",
    margin: 16,
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
    marginTop: 6,
  },
});
