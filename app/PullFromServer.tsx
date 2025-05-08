import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

const PullFromServer = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const handlePullData = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/Dashboard');
    }, 2000); // Simulate API delay
  };

  const handleLogout = () => {
    router.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pull From Server</Text>
      <Text style={styles.subtitle}>Please fetch data from server to continue</Text>

      <View style={styles.iconContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#004e92" />
        ) : (
          <Image
            source={require('../assets/images/cloudsync.png')} // Replace with your icon
            style={styles.image}
          />
        )}
      </View>

      {!loading && (
        <>
          <TouchableOpacity style={styles.button} onPress={handlePullData}>
            <Text style={styles.buttonText}>Pull From Server</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default PullFromServer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#333366',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  button: {
    width: '100%',
    backgroundColor: '#004e92',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
