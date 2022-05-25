import { View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Center, Checkbox, Text } from "native-base";
import { addFromExplore } from "./store/itinerary";

import styles from "../styles/itinerary";

const SelectModal = (props) => {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.savedItems);
  const itinerary = useSelector((state) => state.itinerary);
  const dayName = Object.keys(itinerary[props.index]).filter(
    (obj) => obj !== "placesFromExplore"
  )[0];

  const [showModal, setShowModal] = useState(false);
  const [groupValues, setGroupValues] = useState([]);

  const handleSubmit = () => {
    dispatch(addFromExplore(props.tripId, dayName, groupValues));
  };

  return (
    <View>
      <Center>
        <Button
          size="sm"
          style={styles.button}
          _text={styles.buttonText}
          onPress={() => setShowModal(true)}
        >
          Select from saved items
        </Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add saved items to your itinerary!</Modal.Header>
            <Modal.Body>
              {savedItems.length > 0 ? (
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
              ) : (
                <Text>You have no saved items</Text>
              )}
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
                  style={styles.saveButton}
                  _text={styles.buttonText}
                  onPress={() => {
                    handleSubmit();
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
    </View>
  );
};

export default SelectModal;
