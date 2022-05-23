import { StyleSheet } from "react-native";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  sent: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    alignContent: "center",
  },
  received: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignContent: "center",
  },
  button: {
    backgroundColor: "#999DC3",
  },
  input: {
    borderColor: "#999DC3",
  },
  avatar: {
    flexDirection: "row-reverse",
  },
  chatReceived: {
    margin: "1%",
    color: "#999DC3",
    height: "60%",
    textAlign: "center",
    borderColor: "#999DC3",
    backgroundColor: "#999DC3",
    borderWidth: 1,
    borderRadius: 60,
    padding: 10,
    flexDirection: "row",
  },
  chatSent: {
    margin: "1%",
    color: "#a1a1aa",
    height: "60%",
    textAlign: "center",
    borderColor: "#a1a1aa",
    backgroundColor: "#a1a1aa",
    borderWidth: 1,
    borderRadius: 60,
    padding: 10,
    flexDirection: "row",
  },
  chatText: {
    fontSize: 18,
    alignSelf: "flex-end",
    fontFamily: "Jaldi_400Regular",
    alignContent: "center",
  },
  sentUser: {
    alignSelf: "flex-end",
  },
  receivedUser: {
    alignSelf: "flex-start",
  },
  chatInput: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 690,
  },
});
