import {  Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const StartPage = () => {
  return (
    <View className="flex-1 justify-center items-center">
     <ActivityIndicator size="large" color="gray"/>
    </View>
  )
}

export default StartPage

