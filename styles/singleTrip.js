import { StyleSheet } from "react-native";

export default StyleSheet.create({
  tabBar: {
    fontFamily: "Jaldi_700Bold",
    fontSize: 20,
    alignItems: "center",
    padding: 10,
    flex: 1,
    borderBottomWidth: 3,
  },
  container: {
    width: "100%",
    alignItems: "center",
    height: 215,
    paddingTop: "3%",
  },
  box: {
    borderRadius: 5,
    padding: "3%",
    marginBottom: "2%",
    backgroundColor: "rgba(255, 255, 255, 0.77)",
  },

  header: {
    fontFamily: "GiveYouGlory_400Regular",
    fontSize: 40,
    paddingTop: "10%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#999DC3",
    marginRight: 2,
  },
  buttonText: {
    fontFamily: "Jaldi_400Regular",
    fontSize: 15,
  },

  deleteButton: {
    backgroundColor: "rgb(182, 182, 182)",
    marginLeft: 2,
  },
});
