/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import { getDetail } from '../../api/RestaurantEndpoints'
import TextRegular from '../../components/TextRegular'

import * as GlobalStyles from '../../styles/GlobalStyles'

export default function RestaurantDetailScreen({ route }) {
  const [restaurant, setRestaurant] = useState({})
  const { id } = route.params

  useEffect(() => {
    getDetail(id, setRestaurant)
  }, [])

  const renderProduct = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => { }}>
        <TextRegular>
          {item.name}
        </TextRegular>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      {Object.keys(restaurant).length > 0 ? <View>
        <TextRegular style={styles.textTitle}>{restaurant.name}</TextRegular>
        <TextRegular style={styles.text}>{restaurant.description}</TextRegular>
        <TextRegular style={styles.text}>shippingCosts: {restaurant.shippingCosts}</TextRegular>
        <FlatList
          style={styles.container}
          data={restaurant.products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
        />
      </View>
        :
        <TextRegular>Loading restaurant details</TextRegular>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
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
