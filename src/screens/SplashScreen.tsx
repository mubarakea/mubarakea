import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { initDB } from '../services/localDb';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    initDB()
      .then(() => console.log('DB Initialized'))
      .catch(console.error)
      .finally(() => {
        console.log('Splash screen dismissed');
        navigation.navigate('Dashboard');
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading, please wait...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
  },
});

export default SplashScreen;
