# Introduction
We will learn how to design screens by using FlexBox to create our Layout. Once we understand basic Flexbox, we will design our first Form screen to create Restaurants and secondly, to create Products.

# 0. Setup
Clone template repository and download your copy. Once you should setup your .env file so API_BASE_URL points to your server. For instance `API_BASE_URL=http://localhost:3000`.

You have to run the backend server as well. Go to your backend project folder and run `npm install` (if needed) and `npm start`.

You can then run `npm install` and `npm start`. Check that the base project is working.

It is important to notice that **this base project includes**:
* Previous labs solved.
* Added button to create restaurant, and navigates to CreateRestaurantScreen.
* Added button to create product, and navigates to CreateProductScreen.
* An InputItem component that renders forms inputs, labels and manages errors.

Keep in mind that to make some API requests, it is needed to be logged-in. So **confirm that you can log-in with some owner user**. The provided user-seeder at the backend creates an owner with the following credentials:
* email: `owner1@owner.com`
* password: `secret`

Once the user is logged in, the bearer token is used in every request.

# 1. GUI Design

## 1.1. Flexbox
React native components use Flexbox algorithm to define the layout of its children. Flexbox is also available in standard CSS styles definition for web interfaces.

For instance, within a `View` component we can include some children, such as `Text`, `Pressable`, `Image`, `InputItems` or nested `View`. The parent `View` can define the Flexbox behaviour of these children (children of these children do not inherit these properties). The most common properties to be defined are:
* `flexDirection` which can take two values: `column` (default) if we want its children to render vertically or `row` if we want them to be rendered horizontally. Check
* `justifyContent` which can take the following values:
  * `flex-start` (default). The contents are distributed at the start of the primary axis (the flex direction determines the primary and secondary axis)
  * `center`. The contents are distributed at the center.
  * `flex-end`. The contents are distributed at the end.
  * `space-around` and `space-between` so the contentes are distributed evenly.
* `alignItems` define how the content will be aligned along the secondary axis (depending on the `flexDirection`)
  * `flex-start`,
  * `center`,
  * `flex-end`,
  * `stretch` (default) contents will be stretched to fill the space available

You can experiment with these properties and values at the following example:
https://snack.expo.dev/@afdez/flex-example

Please, take your time to understand the behaviour of Flexbox algorithm.

There are some more properties that defines the Flexbox algorithm behaviour, you can learn more at: https://reactnative.dev/docs/flexbox

## 1.2. Views as containers.
Usually we will define a general container for our components. This container will usually be a `View` component and it will determine the Flexbox behaviour of its children and the size, margins etc where we will render our elements.
Notice that the return statement must include one and only one root element. For instance this return statement would be wrong:
```Javascript
return (
  <View>
    <Text>Some text</Text>
  </View>
  <View>
    <Text>Some other text</Text>
  </View>
)
```

To fix this, we must include a parent element to those siblings,for instance the empty tag `<>`:
```Javascript
return (
  <>
    <View>
      <Text>Some text</Text>
    </View>
    <View>
      <Text>Some other text</Text>
    </View>
  </>
)
```


Let's start designing the `CreateRestaurantScreen.js`.

1. Include a `<View style={{ alignItems: 'center' }}>`
2. Insert some `<InputItem name='sampleInput' label='Sample input' />`
3. Check results.

You will notice that the input items are arranged from top to bottom, full width.

4. Let's modify our container, so it does not fill all the horizontal space, just 60%. To this end we will create a **nested** view width 60%: `<View style={{ width: '60%' }}>`
5. Check results
6. Include a `Pressable` button after the set of inputs.
7. Check results.

The following code snippet, includes all the previous steps:
```Javascript
export default function CreateRestaurantScreen () {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: '60%' }}>
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <InputItem
        name='sampleInput'
        label='Sample input'
      />
      <Pressable
        onPress={() => console.log('Button pressed')
        }
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? brandPrimaryTap
              : brandPrimary
          },
          styles.button
        ]}>
        <TextRegular textStyle={styles.text}>
          Create restaurant
        </TextRegular>
      </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center'
  }
})
```

You may ask yourself: why was it needed to include two nested views? The reason is that the first view defines that its children has to be centered. You can check what happens if we declare just a view with both properties: `<View style={{ alignItems: 'center', width: '60%' }}>`.
Layout definition can be quite tricky sometimes, and various solutions can be found: for instance there is another property named `alignSelf`, that could have been used to this end.

## 1.3. ScrollViews.
Insert more `InputItems` so they exceed the vertical space available. Notice that you cannot scroll down to see them all. Views are not scrollable. To this end we have to use the `<ScrollView>` component. Add a new `<ScrollView>` parent and check results. Scrolling should be enabled.

Note: Some components are an extension of ScrollView component. For instance, FlatLists inherits the properties of ScrollView, but load contents lazily (when you have to render lots of elements, FlatLists will be a more performant solution than ScrollView).

# 2. Forms
Forms are the way of alowing users to submit data from the frontend GUI to the backend. This is needed to create new elements of our entities. Forms present to the user various input fields. The most popular are:
* Text inputs: where user introduces some kind of texts. It is usually the most general input, we can use it so users can include information such as: names, surnames, emails, descriptions, urls, addresses, prices, postal codes or telephones. You have been provided the `src/components/InputItem.js` component that returns an `TextInput`, a label for the input and some elements needed for validation that we will use in the next lab.
* Image pickers / File pickers: where user can select an image/file from its gallery or file system in order to upload them.
* Select from options: where user can select a value for a field from a given set of options. Typical use cases includes: select some category from the ones that exists, select some status value from a given set of possible values.

## 2.1 CreateRestaurant Form.
### 2.1.1 Text inputs
Modify the CreateRestaurantScreen so the user is presented with the needed text inputs for the creation of new restaurants including:
* `name`
* `description`
* `address`
* `postalCode`
* `url`
* `shippingCosts`
* `email`
* `phone`

Notice that `InputItem` can receive the following properties:
* `name`: the name of the field. **It has to match the name of the field expected at the backend.**
* `label`: the text presented to the user so it will be rendered among the text input.
* Other properties: any other property available for the react-native `TextInput`component. For instance, the `placeHolder` property will render a hint in the input so the user can better understand what kind of value is expected. You can see the full `TextInput` reference at: https://reactnative.dev/docs/textinput

### 2.1.2 Image pickers
Restaurants can be created including some images, the `logo` and the `heroImage` which is an image that is rendered as background in the RestaurantDetailScreen. To this end, expo SDK includes some tools. For more info you can check the expo documentation: https://docs.expo.dev/tutorial/image-picker/

To include an image picker for the restaurant logo follow these steps:
0. Add import sentences for the needed library `ExpoImagePicker`, some components, and some default images:
```Javascript
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import restaurantBackground from '../../../assets/restaurantBackground.jpeg'
```

1. We need an state variable to store the image and its properties, so define a new state variable:
```Javascript
  const [logo, setLogo] = useState()
```
2. Include a new pressable element including a text for the label and an image for visualizing selected image. Once we press and select an image, we will store its contents in the state variable by using the `setLogo` function. You can use the following code snippet:
```Javascript
<Pressable onPress={() =>
  pickImage(
    async result => {
      setLogo(result)
    }
  )
}
  style={styles.imagePicker}
>
  <TextRegular>Logo: </TextRegular>
  <Image style={styles.image} source={logo ? { uri: logo.uri } : restaurantLogo}/>
</Pressable>
````

3. Finally, we can include some styling:
```Javascript
imagePicker: {
  height: 40,
  paddingLeft: 10,
  marginTop: 20,
  marginBottom: 80
},
image: {
  width: 100,
  height: 100,
  borderWidth: 1,
  alignSelf: 'center',
  marginTop: 5
}
```

### 2.1.3. CreateRestaurantScreen.js
Find below the complete CreateRestaurantScreen component:
```Javascript
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import InputItem from '../../components/InputItem'
import TextRegular from '../../components/TextRegular'
import { brandPrimary, brandPrimaryTap, brandSecondary } from '../../styles/GlobalStyles'
import restaurantLogo from '../../../assets/restaurantLogo.jpeg'
import restaurantBackground from '../../../assets/restaurantBackground.jpeg'

export default function CreateRestaurantScreen () {
  const [logo, setLogo] = useState()
  const [heroImage, setHeroImage] = useState()

  const pickImage = async (onSuccess) => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })
    if (!result.cancelled) {
      if (onSuccess) {
        onSuccess(result)
      }
    }
  }
  return (
    <ScrollView>
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: '60%' }}>
          <InputItem
            name='name'
            label='Name:'
          />
          <InputItem
            name='description'
            label='Description:'
          />
          <InputItem
            name='postalCode'
            label='Postal code:'
          />
          <InputItem
            name='url'
            label='Url:'
          />
          <InputItem
            name='shippingCosts'
            label='Shipping costs:'
          />
          <InputItem
            name='email'
            label='Email:'
          />
          <InputItem
            name='phone'
            label='Phone:'
          />

          <Pressable onPress={() =>
            pickImage(
              async result => {
                setLogo(result)
              }
            )
          }
            style={styles.imagePicker}
          >
            <TextRegular>Logo: </TextRegular>
            <Image style={styles.image} source={logo ? { uri: logo.uri } : restaurantLogo} />
          </Pressable>

          <Pressable onPress={() =>
            pickImage(
              async result => {
                setHeroImage(result)
              }
            )
          }
            style={styles.imagePicker}
          >
            <TextRegular>Hero image: </TextRegular>
            <Image style={styles.image} source={heroImage ? { uri: heroImage.uri } : restaurantBackground} />
          </Pressable>

          <Pressable
            onPress={() => console.log('Button pressed')
            }
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? brandPrimaryTap
                  : brandPrimary
              },
              styles.button
            ]}>
            <TextRegular textStyle={styles.text}>
              Create restaurant
            </TextRegular>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 40,
    padding: 10,
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center'
  },
  imagePicker: {
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 80
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5
  }
})
```

## 2.2. CreateProduct Form.
Now, follow and adapt the steps given for the CreateRestaurant in order to create a new product for a selected restaurant. Complete the `CreateProductScreen.js`. Remember the needed properties when creating a product:
* `name`,
* `description`,
* `price`,
* `image`,
* `order` (remember, we can define the position where each product will be in the returned product list when querying restaurant details)

# 3. Extra
Restaurants and products can belong to some categories. Include a select input to allow the user to select from available values of RestaurantCategories and from valid statuses when creating a new restaurant.

Similarly, when creating a new product, include a select input to select from ProductCategories. Moreover, products can be available or not, we can add a radio or switch control to the CreateProduct Form.


You will need to implement:
1. A request to the API to retrieve RestaurantCategories and another request to retrieve ProductCategories.
2. As there is no react-native core components for select pickers, we can use the following package: https://hossein-zare.github.io/react-native-dropdown-picker-website/
3. Find a radio or switch component for the availability of the product (true or false, by default it should be true). React-native includes a `Switch` component. You can find the reference at: https://docs.expo.dev/versions/latest/react-native/switch/.