import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const FoodResults = () => {

  const foodList = useSelector((state)=>state.food) || [null]
  return (
    <View>
     {foodList.map((food, index) => (
        <Text key={index}>{food.name}</Text>
      ))}
    </View>
  )
}

export default FoodResults

const styles = StyleSheet.create({})
