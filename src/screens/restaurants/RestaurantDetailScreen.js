/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native'
import { getDetail } from '../../api/RestaurantEndpoints'
import { brandSecondary } from '../../styles/GlobalStyles'

export default function RestaurantDetailScreen ({ route }) {
  const { id } = route.params
  return (
        <View style={styles.container}>
            <Text>Restaurant details. Id: {id}</Text>
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
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    textAlign: 'center'
  }
})
