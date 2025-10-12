{/* Components */}
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, OpenSans_400Regular, OpenSans_400Regular_Italic, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

{/* Navigation */}
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

{/* Screens */}
import Login from './screens/Login.js';

import ItemList from './screens/Items/ItemList.js';
import ItemView from './screens/Items/ItemView.js';
import ItemAdd from './screens/Items/ItemAdd.js';
import ItemUpdate from './screens/Items/ItemUpdate.js';
import CategoryAdd from './screens/Items/CategoryAdd.js';

import StaffList from './screens/Staff/StaffList.js';
import StaffAdd from './screens/Staff/StaffAdd.js';
import StaffUpdate from './screens/Staff/StaffUpdate.js';

import OrderList from './screens/Orders/OrderList.js';
import OrderNew from './screens/Orders/OrderNew.js';
import OrderCheckout from './screens/Orders/OrderCheckout.js';

import Reports from './screens/Reports/Reports.js';

import ManagerSearch from './screens/Search/ManagerSearch.js';
import StaffSearch from './screens/Search/StaffSearch.js';

{/* Styles */}
import Style from './styles/Style.js';

{/* Tab Navigation */}


{/* Stack Navigation */}
function ItemNavigator() {
  return (
    <Stack.Navigator 
      initalRouteName='Item List' 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Item List' component={ItemList} />
      <Stack.Screen name='View Item' component={ItemView} />
      <Stack.Screen name='Add Item' component={ItemAdd} />
      <Stack.Screen name='Update Item' component={ItemUpdate} />
      <Stack.Screen name='Add Category' component={CategoryAdd} />
    </Stack.Navigator>
  );
}

function StaffNavigator() {
  return (
    <Stack.Navigator 
      initalRouteName='Staff List' 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Staff List' component={StaffList} />
      <Stack.Screen name='Add Staff' component={StaffAdd} />
      <Stack.Screen name='Update Staff' component={StaffUpdate} />
    </Stack.Navigator>
  );
}

function OrderNavigator() {
  return (
    <Stack.Navigator 
      initalRouteName='Order List' 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Order List' component={OrderList} />
      <Stack.Screen name='Order New' component={OrderNew} />
      <Stack.Screen name='Order Checkout' component={OrderCheckout} />
    </Stack.Navigator>
  );
}

function ManagerSearchNavigator() {
  return (
    <Stack.Navigator 
      initalRouteName='Search' 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Search' component={ManagerSearch} />
      <Stack.Screen name='Search View' component={ItemView} />
      <Stack.Screen name='Search Update' component={ItemUpdate} />
    </Stack.Navigator>
  );
}

function StaffSearchNavigator() {
  return (
    <Stack.Navigator 
      initalRouteName='Search' 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Search' component={StaffSearch} />
      <Stack.Screen name='Search View' component={ItemView} />
    </Stack.Navigator>
  );
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Login/>

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
