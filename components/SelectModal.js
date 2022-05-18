import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Checkbox,
  Text
} from "native-base";
import { addFromExplore } from "./store/itinerary";



const SelectModal = (props) => {
  const dispatch= useDispatch()
  const savedItems = useSelector((state) => state.savedItems);
  const itinerary = useSelector((state) => state.itinerary);
  //fix dayname, index changes
  const dayName = Object.keys(itinerary[props.index]).filter((obj)=>obj !== "placesFromExplore")
  const plansList = itinerary[props.index][dayName]
  const placesFromExplore = itinerary[props.index].placesFromExplore
  console.log("Plans",itinerary[props.index])

  const [showModal, setShowModal] = useState(false);
  const [groupValues, setGroupValues] = useState([]);


  const handleSubmit =() => {
    dispatch(addFromExplore(props.tripId, dayName, groupValues))
  }

  return (
    <View>
     <Center>
     <Text bold>{dayName}</Text>
        <Button onPress={() => setShowModal(true)}>+</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add saved items to your itinerary!</Modal.Header>
            <Modal.Body>
              <Checkbox.Group
                onChange={setGroupValues}
                value={groupValues}
                accessibilityLabel="choose numbers"
              >
                {savedItems.map((item, i) => (
                  <Checkbox key={i} value={item} my={2}>
                    {item}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    console.log("button pressed")
                    handleSubmit()
                    setShowModal(false);
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
      {plansList.map((plan, i)=> (
        <Text key={i}>{plan}</Text>
      ))}
       {placesFromExplore.map((value, i) => (
        <Text key={i}>{value}</Text>
      ))}
    </View>
  )
}

export default SelectModal

const styles = StyleSheet.create({})
