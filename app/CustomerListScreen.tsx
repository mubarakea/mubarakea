// src/screens/Customers/CustomerListScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useIsFocused, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

import { initializeDatabase } from '../database';
import { CustomerRepository } from '../database/repositories/CustomerRepository';
import { Customer } from '../database/models/Customer';

const CustomerListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filtered, setFiltered] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const repo = new CustomerRepository();
      const data = await repo.getAll();
      setCustomers(data);
      setFiltered(data);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to load customers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeDatabase()
      .then(loadCustomers)
      .catch((e) => {
        console.error(e);
        Alert.alert('Error', 'Database initialization failed.');
      });
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadCustomers();
    }
  }, [isFocused]);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (q === '') {
      setFiltered(customers);
    } else {
      setFiltered(
        customers.filter(c =>
          c.name_en.toLowerCase().includes(q) ||
          c.name_ar?.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
        )
      );
    }
  }, [search, customers]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#263159" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or ID"
          value={search}
          onChangeText={setSearch}
        />
        <Image
          source={require('../assets/icons/filter.png')}
          style={styles.filterIcon}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No customers found.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('CustomerProfile', { customerId: item.id })
            }
          >
            <View style={styles.left}>
              <Text style={styles.nameEN}>{item.name_en}</Text>
              {item.name_ar ? <Text style={styles.nameAR}>{item.name_ar}</Text> : null}
              <Text style={styles.subText}>{item.id}</Text>
              <Text style={styles.subText}>
                {item.district_en}
                {item.district_ar ? ` / ${item.district_ar}` : ''}
              </Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.phone}>{item.phone_number || 'N/A'}</Text>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default CustomerListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 50 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  filterIcon: { width: 18, height: 18, marginLeft: 8 },

  emptyText: { textAlign: 'center', marginTop: 40, color: '#666' },

  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: { flex: 1 },

  nameEN: { fontSize: 16, fontWeight: 'bold', color: '#263159' },
  nameAR: { fontSize: 14, color: '#555', marginTop: 2, fontStyle: 'italic' },

  subText: { fontSize: 12, color: '#666', marginTop: 4 },

  right: { alignItems: 'flex-end' },
  phone: { fontSize: 12, marginBottom: 4 },
  arrow: { fontSize: 20, color: '#007AFF' },
});
