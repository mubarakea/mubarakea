// src/screens/Customers/CustomerScreen.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import { useTodayCustomers } from '../hooks/useTodayCustomers';
import { HeaderCard } from '../components/HeaderCard';
import { QuickAction } from '../components/QuickAction';
import { SearchBar } from '../components/SearchBar';
import { CustomerList } from '../components/CustomerList';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const Customers: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const {
    today,
    loading,
    collapsed,
    setCollapsed,
    search,
    setSearch,
    data,
    refresh,
  } = useTodayCustomers();

  return (
    <View style={styles.container}>
      {/* Header with today’s label and collapse toggle */}
      <HeaderCard label={today} />

      {/* Quick action buttons */}
      <View style={styles.actionsRow}>
        <QuickAction
          icon={require('../assets/icons/barcode.png')}
          title="Use Barcode"
          onPress={() => navigation.navigate('BarcodeScanner')}
        />
        <QuickAction
          icon={require('../assets/icons/customers.png')}
          title="View All"
          onPress={() => navigation.navigate('CustomerList')}
        />
        <QuickAction
          icon={require('../assets/icons/route.png')}
          title="Manage Route"
          onPress={() => navigation.navigate('ManageRoutes')}
        />
        <QuickAction
          icon={require('../assets/icons/add-user.png')}
          title="Add Customer"
          onPress={() => navigation.navigate('AddCustomer')}
        />
      </View>

      {/* Search bar */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search customers…"
      />

      {/* Flat list of today’s customers */}
      <CustomerList
        data={data}
        refreshing={loading}
        onRefresh={refresh}
        onSelect={(customer) =>
          navigation.navigate('CustomerProfile', { customerId: customer.id })
        }
      />
    </View>
  );
};

export default Customers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
