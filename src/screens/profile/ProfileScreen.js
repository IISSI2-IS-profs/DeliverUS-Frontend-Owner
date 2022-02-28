import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import SystemInfo from '../../components/SystemInfo'

export default function ProfileScreen () {
  return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <SystemInfo />
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
