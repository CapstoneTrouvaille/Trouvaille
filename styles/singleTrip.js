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
    height: 250,
    paddingTop: "3%",

  },
  box:{
    borderRadius:5,
    padding:"3%",
    marginBottom:"2%",
    backgroundColor:"rgba(255, 255, 255, 0.77)"
  },

  header: {
    fontFamily: "Jaldi_700Bold",
    fontSize: 40,
    paddingTop: "10%",
  },
  tripInfo: {
    fontFamily: "Jaldi_400Regular",
    fontSize: 20,
    paddingTop: "1%",
   color:"#6d6e6e"
  },
  tripButton: {
    color: "#999DC3",
    fontFamily: "Jaldi_400Regular",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#999DC3",
    marginTop: "1%",
  },
  buttonText: {
    fontFamily: "Jaldi_400Regular",
    fontSize: 15,
  },

});
