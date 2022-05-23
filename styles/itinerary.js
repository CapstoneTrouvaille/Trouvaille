import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    backgroundColor: "#999DC3",
    marginBottom: "2%",
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,

  },
  buttonText: {
    fontFamily: "Jaldi_400Regular",
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: "#999DC3",
  },
  formContainer:{
    paddingLeft: 10,
    paddingRight:10,

    alignItems:"center"
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.77)",
    borderColor: "pink",
  },
  day: {
    fontSize: 25,
    padding: "2%, 2%, 0, 2%",
    marginTop:"3%",
    fontFamily: "Jaldi_700Bold",
  },
  plansList: {
    backgroundColor: "rgba(255, 255, 255, 0.77)",
    borderRadius:5,
    marginTop:6,
    marginHorizontal: 10,
    marginBottom:30,
    padding: "2%",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  deleteButton:{

    backgroundColor:"#a1a1aa",
    width: "20%",
   marginTop:6,

  }
});
