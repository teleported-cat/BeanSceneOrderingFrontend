{/* Components */}
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, OpenSans_400Regular, OpenSans_400Regular_Italic, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Ionicons } from '@expo/vector-icons';

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
import StaffUpdatePassword from './screens/Staff/StaffUpdatePassword.js';

import OrderList from './screens/Orders/OrderList.js';
import OrderView from './screens/Orders/OrderView.js';
import OrderItemView from './screens/Orders/OrderItemView.js';
import OrderNew from './screens/Orders/OrderNew.js';
import OrderCheckout from './screens/Orders/OrderCheckout.js';

import Reports from './screens/Reports/Reports.js';

import Search from './screens/Search/Search.js';

{/* Styles */}
import Style from './styles/Style.js';

{/* Tab Navigation */}
function ManagerDashboard() {
  return (
    <Tab.Navigator
      screenOptions = {({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Items') {
            iconName = 'cart-outline';
          } else if (route.name === 'Staff') {
            iconName = 'person-outline';
          } else if (route.name === 'Orders') {
            iconName = 'receipt-outline';
          } else if (route.name === 'Reports') {
            iconName = 'bar-chart-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4AA1B5',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: [Style.tabBar],
        tabBarLabelStyle: [Style.tabBarLabel, Style.regularText],
        tabBarLabelPosition: 'below-icon',
        headerRight: () => (
          <Text style={[Style.tabHeaderRightText, Style.regularText]}>Bean Scene</Text>
        ),
        headerTitleStyle: [Style.tabHeaderLeftText, Style.regularText],
        headerStyle: Style.tabHeader,
      })}
    >
      <Tab.Screen name='Items' component={ItemNavigator} />
      <Tab.Screen name='Staff' component={StaffNavigator} />
      <Tab.Screen name='Orders' component={OrderNavigator} />
      <Tab.Screen name='Reports' component={Reports} />
      <Tab.Screen name='Search' component={ManagerSearchNavigator} />
    </Tab.Navigator>
  );
}

function StaffDashboard() {
  return (
    <Tab.Navigator
      screenOptions = {({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Orders') {
            iconName = 'receipt-outline';
          } else if (route.name === 'Search') {
            iconName = 'search-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4AA1B5',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: [Style.tabBar],
        tabBarLabelStyle: [Style.tabBarLabel],
        headerRight: () => (
          <Text style={[Style.tabHeaderRightText, Style.regularText]}>Bean Scene</Text>
        ),
        headerTitleStyle: Style.tabHeaderLeftText,
        headerStyle: Style.tabHeader,
      })}
    >
      <Tab.Screen name='Orders' component={OrderNavigator} />
      <Tab.Screen name='Search' component={StaffSearchNavigator} />
    </Tab.Navigator>
  );
}

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
      <Stack.Screen name='Update Staff Password' component={StaffUpdatePassword} />
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
      <Stack.Screen name='Order View' component={OrderView} />
      <Stack.Screen name='View Item' component={OrderItemView} />
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
      <Stack.Screen name='Search List' component={Search} initialParams={{stackRole: 'Manager'}}/>
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
      <Stack.Screen name='Search List' component={Search} initialParams={{stackRole: 'Staff'}}/>
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
      <NavigationContainer>
        <Stack.Navigator
          initalRouteName='Login' 
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Manager Dashboard' component={ManagerDashboard} />
          <Stack.Screen name='Staff Dashboard' component={StaffDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
