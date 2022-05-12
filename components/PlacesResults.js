import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const PlacesResults = () => {
  // const placesList = useSelector((state)=>state.places) || [null]
  console.log("placeslist", placesList)
  return (
    <View>
    {placesList.map((place, index) => (
        <Text key={index}>{place.name}</Text>
      ))}

    </View>
  )
}

export default PlacesResults

const styles = StyleSheet.create({})
