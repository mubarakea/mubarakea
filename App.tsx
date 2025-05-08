import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar, StyleSheet, Platform, Alert } from 'react-native';
import { initializeDatabase } from './database';
import { seedCustomers } from './database/seeds/seed';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // Optional: Keep splash visible until setup completes

const App = () => {
  useEffect(() => {
    (async () => {
      try {
        await initializeDatabase();
        await seedCustomers();
      } catch (err) {
        console.error('Database init failed', err);
        Alert.alert('Database Error', 'Failed to initialize the database.');
      } finally {
        SplashScreen.hideAsync(); // Hide splash once everything is ready
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
