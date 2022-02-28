/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, Text, View, FlatList, Pressable } from 'react-native'
import { getAll } from '../../api/RestaurantEndpoints'
import { brandSecondary } from '../../styles/GlobalStyles'

export default function RestaurantsScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Random Restaurant</Text>
      <Button
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: Math.floor(Math.random() * 100) })
        }}
        title='Go to Random Restaurant Details'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: brandSecondary
  }
})
