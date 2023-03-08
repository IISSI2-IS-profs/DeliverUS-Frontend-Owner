/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function RestaurantsScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    getAll(setRestaurants)
  }, [])

  const renderRestaurant = ({ item }) => {
    return (
      <View>
        <Pressable
          style={styles.row}
          onPress={() => {
            navigation.navigate('RestaurantDetailScreen', { id: item.id })
          }}>
          <TextRegular>
            {item.name}
          </TextRegular>
        </Pressable>
      </View>
    )
  }

  return (
    <View>
      {restaurants?.length > 0 ?
        <FlatList
          style={styles.container}
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={item => item.id.toString()}
        />
        :
        <TextRegular>Loading restaurants</TextRegular>}
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
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  text: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  }
})
