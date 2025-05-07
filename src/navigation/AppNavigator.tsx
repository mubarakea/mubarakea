import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';

// Screens
import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import PullFromServerScreen from '../screens/PullFromServer/PullFromServerScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import CustomerScreen from '../screens/Customers/CustomerScreen';
import ManageRoutesScreen from '../screens/ManageRoutes/ManageRoutesScreen';
import RouteCustomerList from '../screens/RouteCustomers/RouteCustomerList';
import AddCustomerScreen from '../screens/AddCustomer/AddCustomerScreen';
import CustomerProfileScreen from '../screens/CustomerProfile/CustomerProfileScreen';
import SalesEntryScreen from '../screens/SalesEntry/SalesEntryScreen';
import ItemListScreen from '../screens/ItemList/ItemListScreen';
import BarcodeScannerScreen from '../screens/Barcode/BarcodeScannerScreen';
import SalesReviewScreen from '../screens/SalesEntry/SalesReviewScreen';
import SyncScreen from '../screens/Sync/SyncScreen';
import RequestItemScreen from '../screens/RequestItem/RequestItemScreen';
import RequestItemListScreen from '../screens/RequestItemList/RequestItemListScreen';
import CustomerListScreen from '../screens/Customers/CustomerListScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PullFromServer" component={PullFromServerScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Customers" component={CustomerScreen} />
      <Stack.Screen name="ManageRoutes" component={ManageRoutesScreen} />
      <Stack.Screen name="RouteCustomerList" component={RouteCustomerList} />
      <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
      <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} />
      <Stack.Screen name="SalesEntry" component={SalesEntryScreen} />
      <Stack.Screen name="ItemList" component={ItemListScreen} />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} />
      <Stack.Screen name="SalesReview" component={SalesReviewScreen} />
      <Stack.Screen name="Sync" component={SyncScreen} />
      <Stack.Screen name="RequestItem" component={RequestItemScreen} />
      <Stack.Screen name="RequestItemList" component={RequestItemListScreen} />
      <Stack.Screen name="CustomerList" component={CustomerListScreen} options={{ title: 'CustomersList' }} />


    </Stack.Navigator>
  );
};

export default AppNavigator;
