import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Checkbox,
} from "native-base";



const SelectModal = (props) => {
  //USE EFFECT TO FETCH SAVED ITEMS

  const savedItems = useSelector((state) => state.savedItems);
  const itinerary = useSelector((state) => state.itinerary);

  const dayName = Object.keys(itinerary[props.index])[0]
  console.log(dayName)

  const [showModal, setShowModal] = useState(false);
  const [groupValues, setGroupValues] = useState([]);


  return (
    <View>
     <Center>

     <Text>{dayName}</Text>
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
       {groupValues.map((value, index) => (
        <Text key={index}>{value}</Text>
      ))}
    </View>
  )
}

export default SelectModal

const styles = StyleSheet.create({})
