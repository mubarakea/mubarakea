import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

const DashboardScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hai Ali!</Text>
        <Text style={styles.subtext}>Make your sales awesome!</Text>
        <TouchableOpacity style={styles.settingsIcon}>
          <Icon name="settings-outline" size={22} color="#444" />
        </TouchableOpacity>
      </View>

      {/* Menu Grid */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Customers')}>
          <Image source={require('../../assets/icons/customer.png')} style={styles.icon} />
          <Text style={styles.cardText}>Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ItemList')}>
          <Image source={require('../../assets/icons/stock.png')} style={styles.icon} />
          <Text style={styles.cardText}>Stock Detail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RequestItem')}>
          <Image source={require('../../assets/icons/request.png')} style={styles.icon} />
          <Text style={styles.cardText}>Request Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Sync')}>
          <Image source={require('../../assets/icons/sync.png')} style={styles.icon} />
          <Text style={styles.cardText}>Sync Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  header: {
    position: 'relative',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333366',
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  settingsIcon: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    height: 120,
    backgroundColor: '#f3f5ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    elevation: 2,
  },
  icon: {
    width: 42,
    height: 42,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333366',
  },
});
