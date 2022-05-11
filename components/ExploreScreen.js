import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'native-base'
import { getPlacesData } from './api/tripAdvisor'

const ExploreScreen = () => {
  return (
    <View>
      <Text>ExploreScreen</Text>
      <Button
              size="lg"
              mb="6"
              onPress={() => getPlacesData()}
            >
              Get data
            </Button>
    </View>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({})
