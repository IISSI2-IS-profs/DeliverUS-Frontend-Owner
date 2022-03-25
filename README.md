# Index
* [1. First React Native project](#1-First-React-Native-project)
* [2. Tab navigation](#2-Tab-navigation)
* [3. Stack navigation nested in the tab navigator](#3-Stack-navigation-nested-in-the-tab-navigator)
* [4. Creating your first component](#4-Creating-your-first-component)
* [5. Packaging modes and debugging](#5-Packaging-modes-and-debugging)
* [Extra: Styling](#Extra-Styling)
* [Lab 4 Solution project](#Lab-4-Solution-project)

# 1. First React Native project

## Steps:
1. Create a new empty repository for your Front-end lab sessions at githubeii.us.es
2. Open VS Code, open a new terminal
3. Create a new empty project on a local folder:
`expo init IISSI2-IS-Frontend-Owner`
   * Choose template: `blank`
4. You can now open the project folder on VSCode by using the "Open Folder" option on the File menu.
5. Navigate to the created folder: `cd IISSI2-IS-Frontend-Owner` and run: `npm start`
   * A new tab/window on your browser should open http://localhost:19002/ showing Expo developers tools. If not automatically opened, run your browser and navigate to: http://localhost:19002
   * (On windows) set allow on Firewall/Windows defender if asked
6. Click on `Run in web browser`. It should open the basic empty project in a new tab. It should look like this:
https://snack.expo.dev/@afdez/lab4-1-blankproject
7. Configure eslint by installing and initialize it for your project by running `npm install eslint --save-dev`and `npx eslint --init`. We recommend the following answers: To check syntax, find problems, and enforce code style, JavaScript modules (import/export), React, Does your project use TypeScript? › No, Where does your code run? Browser, Use a popular style guide, Standard: https://github.com/standard/standard, Format-> Javascript. Finally select yes to install all dependencies. If you are asked to do some downgrade, answer yes. See https://eslint.org/docs/user-guide/getting-started for more details.

```Javascript
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
````

   * After that it is recommended to include a settings file by running `mkdir .vscode` and  `touch .vscode/settings.json`. Add the following contents at `.vscode/settings.json`:
```Javascript
{
    "eslint.lintTask.enable": true,
    "eslint.alwaysShowStatus": true,
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
    "eslint.validate": ["javascript"]
}
````

Remember that, for a better experience, use the VSCode Extension for eslint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

8. Sync and push your changes to your repository. In VSCode: `Ctrl+Shift+P` (opens command palette), `Git: Add Remote`, select your project folder `IISSI2-IS-Frontend-Owner`and paste your repository url. Then open command palette again and `Git: Publish branch` to push your project.
   * Additionally you can create a tag `Git: Create tag`, name it (e.g. `lab4-1-blank-project`), and finally `Git: Push tags`

# 2. Tab navigation
According to the requirements, we can classify owners functionalities in the following categories:
* Profile (login, logout and edit his profile)
* Restaurants (listing owned restaurants, create and edit them), navigate to its orders as well.
* Control panel showing business stats

We propose to create a Tab navigation using Reactnavigation tools, and following these steps (detailed documentation can be found at: https://reactnavigation.org/docs/tab-based-navigation)

## Steps:
0. Install react navigation dependencies by running `expo install react-native-screens react-native-safe-area-context` and `npm install @react-navigation/bottom-tabs`. We will also install stack navigator and other dependencies for the future by running `npm install @react-navigation/native-stack` and `npm install @react-navigation/native`

1. Create folders and files:
   * Create a new folder `src\screens`
   * Create a folder for each tab `src\screens\profile`, `src\screens\restaurants`, `src\screens\controlPanel`
   * For each folder we will create a simple screen, `ProfileScreen.js`, `RestaurantsScreen.js`and `ControlPanelScreen.js`
    > you can create these folders and files using the terminal by running:
    ```Powershell
    mkdir src && mkdir src/screens && mkdir src/screens/profile && mkdir src/screens/restaurants && mkdir src/screens/controlPanel && touch src/screens/profile/ProfileScreen.js && touch src/screens/restaurants/RestaurantsScreen.js && touch src/screens/controlPanel/ControlPanelScreen.js
    ```
    Depending on your terminal/shell, you could need to change `&&` to `;`
2. Include a minimal screen for each screen file created. E.g. RestaurantsScreen.js
```TSX
import React from 'react'
import { View, Text } from 'react-native'

export default function RestaurantsScreen () {
  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Restaurants</Text>
        </View>
  )
}
```
3. Overwrite the contents of `App.js` the logic to create a tab navigator
```TSX
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import ControlPanelScreen from './src/screens/controlPanel/ControlPanelScreen'
import ProfileScreen from './src/screens/profile/ProfileScreen'
import RestaurantsScreen from './src/screens/restaurants/RestaurantsScreen'

const Tab = createBottomTabNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Restaurants"
          component={RestaurantsScreen} />
        <Tab.Screen
          name="Control Panel"
          component={ControlPanelScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
```
4. Check the new version of the project, it should works like this:
https://snack.expo.dev/@afdez/lab4-2-basicnavigation
5. Commit and push your changes to your repository. Open Source control tab in VSCode to commit and push your project.
   * Additionally you can create a tag `Git: Create tag`, name it (e.g. `lab4-2-basicNavigation`), and finally `Git: Push tags`

# 3. Stack navigation nested in the tab navigator

Some screens should present a stack-type navigation. We are going to follow the steps below to include a stack navigator within the Restaurants tab, we will have a listing of all restaurants, and if you click on one, it will navigate to show the detail of that restaurant. The following video shows a stack navigator:

https://user-images.githubusercontent.com/19324988/155882422-5974b582-4a6e-4ad0-8df6-31b504b791e5.mov


## Steps:
0. Notice that we previously installed stack package `npm install @react-navigation/native-stack` and `npm install @react-navigation/native`
1. Create a second screen `RestaurantDetailScreen.js` at `src/screens/restaurants` and include basic contents as before
2. Create a file `RestaurantsStack.js` in `src/screens/restaurants` and include the logic to define two stack screens for `RestaurantsScreen` and `RestaurantDetailScreen`.

```TSX
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import RestaurantDetailScreen from './RestaurantDetailScreen'
import RestaurantsScreen from './RestaurantsScreen'

const Stack = createNativeStackNavigator()

export default function RestaurantsStack () {
  return (
        <Stack.Navigator>
            <Stack.Screen
                name='RestaurantsScreen'
                component={RestaurantsScreen} />
            <Stack.Screen
                name='RestaurantDetailScreen'
                component={RestaurantDetailScreen} />
        </Stack.Navigator>
  )
}
```
3. Update App.js in order to include the `RestaurantStack` as the component for the corresponding Tab and update the import
```TSX
        <Tab.Screen
          name="Restaurants"
          component={RestaurantsStack} />
```
You can now refresh your app and check that the stack is rendered, but no way of navigating from one screen to the other is defined.

4. In order to navigate from `RestaurantsScreen` to `RestaurantDetailScreen` we need to receive the navigation object and create a button for the action. Moreover, we can pass data from one screen to another including a second parameter:
```TSX
/* eslint-disable react/prop-types */
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function RestaurantsScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Random Restaurant</Text>
      <Button
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: Math.floor(Math.random() * 100) })
        }}
        title="Go to Random Restaurant Details"
      />
    </View>
  )
}
```
5. We can access data passed through the route object at `RestaurantDetailScreen.js`
```TSX
import React from 'react'
import { View, Text } from 'react-native'

export default function RestaurantDetailScreen ({ route }) {
  const { id } = route.params
  return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Restaurant details. Id: {id}</Text>
        </View>
  )
}
```
6. Check the new version of the project, it should works like this:
https://snack.expo.dev/@afdez/lab4-3-nestednavigation
7. You can commit and push your changes and optionally include a tag

# 4. Creating your first component
Let's create a simple component which shows system information a if the app is running on development or production mode.
1. Create a folder `src/components` and a new file `SystemInfo.js` which shows the information about the platform (web, iOS, Android), version and if the app is running in production or development mode. Notice that in production apps runs faster due to several compiling and packaging optimizations.
```TSX
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import React from 'react'
import { Platform, Text, View } from 'react-native'

export default function SystemInfo () {
  return (
        <View >
            <Text>Platform: {Platform.OS}.</Text>
            <Text>{Platform.Version ? `Version: ${Platform.Version}` : null}</Text>
            <Text>Mode: {__DEV__ ? 'Development' : 'Production'}</Text>
        </View>
  )
}
````
2. Use it in some screens by importing and including the component on your views.
3. Try from different platforms by running some simulator or scanning the QR code with your mobile. Note: Your mobile has to be in the same network as the development server.
4. Check the new version of the project, it should works like this:
https://snack.expo.dev/@afdez/lab4-4-firstcomponent
5. (optional) Publish your project using the publish option at the left
6. You can commit and push your changes and optionally include a tag

# 5. Packaging modes and debugging
1. Start a debugging session on the web server version (Open inspector in the browser) and include a breakpoint at `RestaurantDetailScreen.js`at line `const { id } = route.params`. Use the menus to inspect the values of variables and step over to next lines.
2. Do the same with the mobile version of the app. Open developer menu and activate _Debug remote JS_ option. It will open a new tab on your browser. Open Inspect tools and look for a debuggerworker in the sources tab->pages
3. Change to production mode by using the switch at the left side of the development console on http://localhost:19002/. It is possible you have to stop (ctrl-c on the terminal) and start the server again `npm start` when you change from development to production mode and viceversa.

# Extra: Styling
1. Include icons for the bottom tab options and remove default header (stack navigator shows its own header)
   * see https://docs.expo.dev/guides/icons/ and https://reactnavigation.org/docs/tab-based-navigation#customizing-the-appearance
```TSX
<Tab.Navigator screenOptions={({ route }) => ({
  // eslint-disable-next-line react/display-name
  tabBarIcon: ({ color, size }) => {
    let iconName
    if (route.name === 'Restaurants') {
      iconName = 'silverware-fork-knife'
    } else if (route.name === 'Control Panel') {
      iconName = 'view-dashboard'
    } else if (route.name === 'Profile') {
      iconName = 'account-circle'
    }
    return <MaterialCommunityIcons name={iconName} color={color} size={size} />
  },
  headerShown: false
})}>
```
2. Include custom titles for each screen of the Restaurants Stack
```TSX
<Stack.Navigator>
  <Stack.Screen
      name='RestaurantsScreen'
      component={RestaurantsScreen}
      options={{
        title: 'Restaurants'
      }}/>
  <Stack.Screen
      name='RestaurantDetailScreen'
      component={RestaurantDetailScreen}
      options={{
        title: 'Restaurant Detail'
      }}/>
</Stack.Navigator>
```
4. Define a `GlobalStyles.js` file including some constants for some colors named after: `brandPrimary`, `brandSecondary`, `background`, etc.
```TSX
const brandPrimary = '#be0f2e' // Granate US. rgba(190,15,46,255)
const brandPrimaryTap = '#AA001A' //  Granate US más oscuro
const brandSecondary = '#feca1b' // Amarillo US.rgba(254,202,27,255)
const brandSecondaryTap = '#EAB607' // amarillo US más oscuro
const brandSuccess = '#95be05' // verde US
const brandBackground = 'rgb(242, 242, 242)' // gris claro

export { brandPrimary, brandPrimaryTap, brandSecondary, brandSecondaryTap, brandSuccess, brandBackground }
```
   * Tip: you can use a VSCode extension to highlight hex, rgba color codos. E.g: https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight
5. Use your branding colors, e.g. define a theme at `GlobalStyles.js` for ReactNavigation. See: https://reactnavigation.org/docs/themes/
```TSX
const navigationTheme = {
  dark: false,
  colors: {
    primary: brandSecondary,
    background: brandBackground,
    card: brandPrimary,
    text: '#ffffff',
    border: `${brandPrimary}99`,
    notification: `${brandSecondaryTap}ff` // badge
  }
}
```
6. Remember that you can include styles at the end of each component by creating a StyleSheet. E.g:
```TSX
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
```

# Lab 4 Solution project
* Snack: https://snack.expo.dev/@afdez/lab4-solution-extra-v1
