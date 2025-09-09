import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{
            headerTitle: 'Home',
        }}/>
        <Tabs.Screen name="category" />
        <Tabs.Screen name="setting" />
    </Tabs>
  )
}

export default _layout