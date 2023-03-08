# Index
* [Introduction](#Introduction)
* [0. Setup](#0-Setup)
* [1. Components](#1-Components)
* [2. Hooks](#2-Hooks)
* [3. States](#3-States)
* [4. Props](#4-Props)
* [5. Developing RestaurantsScreen and RestaurantDetailScreen](#5-developing-restaurantsscreen-and-restaurantdetailscreen)
* [5.1 RestaurantsScreen](##5.1-restaurantsscreen)
* [5.2 RestaurantDetailScreen](##5.2-restaurantdetailscreen)
* [6. Inline notation for dynamic view generation](#6-inline_notation_for_dynamic_view_generation)
* [7. Extra exercises](#7-extra_exercises)



# Introduction
We will learn basic React-native elements needed to develop software graphical user interfaces including:
* Components
  * States
  * Props
* Hooks

Once we will learn this basic elements, we will develop the Restaurants list and the restaurant detail screen.

# 0. Setup
Clone template repository and download your copy. You can then run `npm install` and `npm start`. Check that the base project is working.

# 1. Components
In general, software components are some kind of artifacts that encapsulates a set of related functions so they can be reused. **React components are the reusable building blocks that we can define to create our Apps' user interfaces.**
In the previous Lab, we used some components included in react-native library such as `View`, `Text` or `Pressable`. We also defined some components (such as our screens or a simple component named `SystemInfo`).

The preferred option to create components in React and React-native is the so-called _Function Components_. The defined function component takes as **input some parameters which are called props**, and returns a React element.

You can check out the `RestaurantScreen.js` file to understand how a component is defined:
```Javascript
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'

export default function RestaurantsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>Random Restaurant</TextRegular>
      <Pressable
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: Math.floor(Math.random() * 100) })
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? GlobalStyles.brandBlueTap
              : GlobalStyles.brandBlue
          },
          styles.actionButton
        ]}
      >
        <TextRegular textStyle={styles.text}>
          Go to Random Restaurant Details
        </TextRegular>
      </Pressable>
    </View>
  )
}
```

# 2. Hooks
Hooks are specially-implemented functions that let us add functionality to React components beyond just creating and returning React elements.
We will use hooks for three objectives:
1. Maintain the state of a component: `useState` hook
2. Update our interface when data is updated or retrieved: `useEffect` hook.
3. Share data between components by defining a context and retrieve that context using the `useContext` hook. We will learn about contexts in following labs.

## 2.1. useState hook
```Javascript
const [state, setState] = useState(initialValue)
```
The useState hook returns an array containing:
* the state object
* a function to update the state object (it has to be named `set` and the name given to the state object)

the `setState` function admits a new state object value, and provokes a re-render of the component
```Javascript
setState(newState)
```

## 2.2. useEffect hook
```Javascript
useEffect(() => {
   //code to be executed
  }, [object1, object2, ...])
```
The useEffect hook takes two arguments:
* the function to be run when the hook is triggered
* an optional array containing the dependency values that will trigger the hook when their values have changed. If the array is empty, it will be executed once the component is mount (inserted in the DOM tree). If the parameter is not present, will be executed when the component is mount and every time the component updates (after every re-render).

# 3. States
Components usually needs to maintain some data in memory to _remember_ things. In React and React-native this is called the _state_. In order to create and update the state we need to use the `useState` hook (we will learn about this in the next section):
```Javascript
const [state, setState] = useState(initialValue)
```
Notice that we define an array of elements `[state, setState]` including the `state` object and the method to change the state `setState` and we can define the initial value of this `state` object.

For instance, when we will make a request to the backend to retrieve the list of restaurants, the returned data should be kept in the state of the `RestaurantsScreen` component. So in this component, we need to define an `state` that will contain the array of restaurants (initially will be a null object `null`) as:
```Javascript
const [restaurants, setRestaurants] = useState(null)
```

# 4. Props
We can use props to pass data between components (we will see that Context API will help us for the same objective).
Below you can find how we receive the route in the `RestaurantDetailScreen` component as a prop when navigating from `RestaurantsScreen` to `RestaurantDetailScreen`:
```Javascript
export default function RestaurantDetailScreen ({ route }) {
  const { id } = route.params
  return (
        <View style={styles.container}>
            <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>Restaurant details. Id: {id}</TextRegular>
        </View>
  )
}
```

# 5. Developing RestaurantsScreen and RestaurantDetailScreen.
We want to develop two screens:
* RestaurantsScreen should render a list of restaurants that belongs to the owner. Each element should render at least the name of the restaurant, and if an element is clicked or tapped, should navigate to the restaurant detail screen of that restaurant.
* RestaurantDetailScreen should render the details of the restaurant selected in the previous screen, including description and the products (menu) of that restaurant.


In your project you will find a new folder `api`. In the future it will contain one file for each of the entities that have to be requested to the backend. In this lab, we included a mock `RestaurantEndpoints.js` file where you will find two methods:
* `getAll(onCompleted)` this method does not return any results because it emulates an asynchronous API call that retrieves the restaurants stored in the system. Instead, it takes as a parameter a function that will be executed when the asynchronous call is finished. That is, this function is called when the API gets the list of restaurants stored. The onCompleted(collection) function receives the list of restaurants as a parameter with the result of the API call.
* `getDetail(id, onCompleted)` will return all restaurant details of the given restaurant `id`, including the products (menu). To do this it takes a first parameter which is the identifier of the restaurant from which the information is to be retrieved (`id`). Similarly to the previous method, this method does not return a value directly, but will call the onCompleted method passed as the second parameter when the request (mock) to the API is resolved. The onCompleted method will receive detailed information about the restaurant as a parameter.

Notice that **this is a mockup**, not real API calls will be found. We will learn how to perform API calls in the next lab.

## 5.1 RestaurantsScreen
First, open `RestaurantsScreen.js`. We will need to use some hooks (`useState` and `useEffect`), components and functions from other files. To this end, we have added the following import statements:

```Javascript
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'
```

Next, we will **define the component state**, which will be a `restaurants` object array where we will store the list of restaurants. To this end, you can add the following line **inside the RestaurantsScreen function component**:
```Javascript
  const [restaurants, setRestaurants] = useState(null)
```

At first render, the `restaurants` state object will be empty (its initial value is a null array `null`). We could have initialised the state to an empty array (`[]`). However, in this case we would not be able to determine whether the API call was made and returned an empty array, or whether the call still returned no results. 
We need to load our restaurants in the state. To this end, we will define a new _effect_ with the `useEffect` hook. As explained before, this hook takes two arguments: the function to be triggered, and an optional array of objects which triggers the function when their values have been changed. To load the restaurants, we do not need the optional dependencies array, as no dependency is needed to trigger the loading. To imitate the loading from a real API, a two-seconds timeout is established so restaurants will load after these two seconds delay. To do this, you can include the following **inside the RestaurantsScreen function component**:
```Javascript
useEffect(() => {
    getAll(setRestaurants)
  }, [])
```

At this point, we have the necessary elements to load the list of restaurants as an state object. Next, we will render them by using one of the core components included with React-native: `FlatList`. More info about FlatLists can be found in the official documentation: https://reactnative.dev/docs/flatlist

In order to use this FlatList component we will need to pass some props to it:
* `data`: the array of elements to be rendered.
* `renderItem`: the function that receives each element (composed of the item itself, the index within the flatlist and separator elements).
* `keyExtractor`: the function that extracts a unique key for each element. Keys are required to be of type string. Our ids are defined as numerics, so we will just transform these ids to string.

Let us first define how to render each item (restaurant). We will define a new function called `renderRestaurant`. This function will receive the item to be rendered (a restaurant) and have to return the graphical components that will render each restaurant on the `FlatList`. We propose to define a `Pressable` area and print the restaurant name inside. When pressed, it should navigate to the `RestaurantDetailScreen`, passing the restaurant `id` as a prop included the `route` object.

```Javascript
const renderRestaurant = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}>
          <TextRegular>
              {item.name}
          </TextRegular>
      </Pressable>
    )
  }
```

Finally, we will overwrite the return statement of our component. We will include the `Flatlist` defining the following props:
* `data`: as our `restaurants` state object.
* `renderItem`: the `renderRestaurant` function.
* `keyExtractor`: the function that extracts a unique key for each element (it needs to be a String): `item => item.id.toString()`

```Javascript
return (
      <FlatList
        style={styles.container}
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={item => item.id.toString()}
      />
  )
```

At this point, your `RestaurantsScreen` should show a list with two restaurants, and when one is clicked or tapped it should navigate to the `RestaurantDetailScreen` which only shows the id of the pressed restaurant.

## 5.2 RestaurantDetailScreen
Next, we will develop our RestaurantDetailScreen so it queries all the details of a restaurant, including its products, and will render its name, description and the list of products. To this end we will follow the same approach: defining the state object, defining a useEffect so it retrieves the restaurant details from de mock API, and render the FlatList component.
Define the state object:
```Javascript
  const [restaurant, setRestaurant] = useState(null)
```
Note that, as in the case of getting the list of restaurants, we initialise the state value for restaurant to `null`. This allows us to easily check whether this restaurant exists or not before displaying its property values.

Define the useEffect hook to load restaurant details:
```Javascript
useEffect(() => {
    getDetail(id, setRestaurant)
  }, [])
```
Define a `renderProduct` function:
```Javascript
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
```
Notice that at this moment, it does not navigate when pressed. We will change this behaviour in future labs.

Finally, render all these elements:
```Javascript
return (
        <View style={styles.container}>
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
  )
```

# 6. Inline notation for dynamic view generation

Sometimes it is necessary to show one content or another in a particular view, depending on the value of the properties or the state of the component. To do this, it is possible to enter boolean conditions directly in the render method (return) of the view. These conditions can be entered using `&&` between the condition and the view section to display if the condition evaluates to true. For example:

```Javascript
return (
  <View>
    {restaurant && <View style={styles.container}>
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
    }
    {!restaurant && <TextRegular style={styles.text}>Loading restaurant details</TextRegular>}
  </View>
)
```

Note that in the code above, there is a parent view (wrapper) that wraps all conditional content, whether the restaurant information exists or not. This is necessary because conditional views must always have a parent view that is displayed whether the condition is met or not. In other words, there must always be a parent for the current view.
On the other hand, the expression `restaurant && ...` checks that the state of the restaurant is `not null`. On the other hand, `!restaurant && ...` evaluates to true as long as restaurant is `null`.
The above block can be simplified by using if/else on a single line with the syntax `condition ? evaluated_if_true : evaluated_if_false`. So it could be rewritten as follows:

```Javascript
return (
  <View>
    {restaurant ? <View style={styles.container}>
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
    : <TextRegular style={styles.text}>Loading restaurant details</TextRegular>}
  </View>
)
```

# 7. Extra exercises
Restaurants, Products and other entities include some image properties. These properties store relative path to the images. For instance, a restaurant logo property value could be: `logo: 'public/restaurants/100MontaditosLogo.jpeg'`. This is the relative path of this image in the server. In order to load the image, we need to add the backend server ip. To do this, copy the `.env.example` and rename the copy as `.env` file. Check that the following property points to your backend deployment server and port:  `API_BASE_URL=http://localhost:3000`

Your project includes the needed packages for reading the `.env` file. To access a property you can just use the following: `process.env.PROPERTY_NAME`. For instance the API_BASE_URL property can be read by `process.env.API_BASE_URL`

## 7.1: List header
Modify the `RestaurantDetailScreen` component so now the FlatList renders the header that includes the information about the restaurant. See https://reactnative.dev/docs/flatlist#listheadercomponent for more information.

You can use the following renderHeader function (you will need to add some imports).
```Javascript
const renderHeader = () => {
    return (
      <ImageBackground source={(restaurant?.heroImage) ? { uri: process.env.API_BASE_URL + '/' + restaurant.heroImage, cache: 'force-cache' } : undefined } style={styles.imageBackground}>
        <View style={styles.restaurantHeaderContainer}>
            <TextSemiBold textStyle={styles.textTitle}>{restaurant.name}</TextSemiBold>
            <Image style={styles.image} source={restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + restaurant.logo, cache: 'force-cache' } : undefined} />
            <TextRegular textStyle={styles.text}>{restaurant.description}</TextRegular>
        </View>
      </ImageBackground>
    )
  }
```

And you can add the following styles:
```Javascript
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
```
## 7.2: Card components
Card components are a very popular solution to render information about items. Learn more about cards here: https://material.io/components/cards

You have been provided with an `ImageCard` component at the `components` folder. You may use it to render restaurant items or product items. For instance, we can render the restaurant item at the `RestaurantsScreen` with the following renderer function:
```JavaScript
const renderRestaurantWithImageCard = ({ item }) => {
    return (
      <ImageCard
        imageUri={item.logo ? { uri: process.env.API_BASE_URL + '/' + item.logo } : undefined}
        title={item.name}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}
      >
          <TextRegular numberOfLines={2}>{item.description}</TextRegular>
          {item.averageServiceMinutes !== null &&
            <TextSemiBold>Avg. service time: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.averageServiceMinutes} min.</TextSemiBold></TextSemiBold>
          }
          <TextSemiBold>Shipping: <TextSemiBold textStyle={{ color: brandPrimary }}>{item.shippingCosts.toFixed(2)}€</TextSemiBold></TextSemiBold>
      </ImageCard>
    )
  }
```

You may need to add the needed imports.

Once you have rendered your restaurants with the `ImageCard` component, use this component to render the products of a restaurant as well.
