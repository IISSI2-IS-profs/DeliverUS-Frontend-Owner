import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ControlPanelScreen () {
  return (
        <View style={styles.container}>
            <Text>Control Panel</Text>
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
