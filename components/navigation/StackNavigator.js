import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//screens
import HomeScreen from '../HomeScreen'
import AddTrip from '../AddTrip'
import ProfileScreen from '../ProfileScreen';
import ChatScreen from '../ChatScreen';
import ExploreScreen from '../ExploreScreen';


const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerBackVisible:true}}>
      <Stack.Screen name = "Home" component = {HomeScreen} />
      <Stack.Screen name = "AddTrip" component = {AddTrip} />
    </Stack.Navigator>
  )
}

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerBackVisible:true}}>
      <Stack.Screen name = "Profile" component = {ProfileScreen} />
    </Stack.Navigator>
  )
}

const ChatStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerBackVisible:true}}>
      <Stack.Screen name = "Chat" component = {ChatScreen} />
    </Stack.Navigator>
  )
}

const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerBackVisible:true}}>
      <Stack.Screen name = "Explore" component = {ExploreScreen} />
    </Stack.Navigator>
  )
}



export {
  HomeStackNavigator,
  ProfileStackNavigator,
  ChatStackNavigator,
  ExploreStackNavigator
}
