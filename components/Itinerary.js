import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Checkbox,
} from "native-base";

const Itinerary = () => {
  const [showModal, setShowModal] = useState(false);
  const [groupValues, setGroupValues] = useState([]);
  console.log(groupValues);

  return (
    <Center>
      <Button onPress={() => setShowModal(true)}>Button</Button>
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
              <Checkbox value="one" my={2}>
                UX Research
              </Checkbox>
              <Checkbox value="two">Software Development</Checkbox>
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
  );
};

export default Itinerary;

const styles = StyleSheet.create({});
