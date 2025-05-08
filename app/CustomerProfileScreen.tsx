// src/screens/Customers/CustomerProfileScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { initializeDatabase } from '../database';
import { CustomerRepository } from '../database/repositories/CustomerRepository';
import { Customer } from '../database/models/Customer';

const CustomerProfileScreen = () => {
  const route = useRoute<RouteProp<{ params: { customerId: string } }, 'params'>>();
  const { customerId } = route.params;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeDatabase()
      .then(async () => {
        const repo = new CustomerRepository();
        const found = await repo.getById(customerId);
        if (found) {
          setCustomer(found);
        } else {
          Alert.alert('Error', 'Customer not found.');
        }
      })
      .catch((e) => {
        console.error(e);
        Alert.alert('Error', 'Failed to initialize database.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [customerId]);

  const handleAction = (action: string) => {
    console.log(`Action selected: ${action}`);
    // navigate as needed
  };

  const actions = [
    { label: 'Sales', icon: require('../assets/icons/sales.png') },
    { label: 'Pay Due', icon: require('../assets/icons/pay.png') },
    { label: 'Sales Return', icon: require('../assets/icons/return.png') },
    { label: 'Payment Review', icon: require('../assets/icons/payment-review.png') },
    { label: 'Sales Review', icon: require('../assets/icons/sales-review.png') },
    { label: 'Sales Return Review', icon: require('../assets/icons/return-review.png') },
  ];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#263159" />
      </View>
    );
  }

  if (!customer) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#666' }}>Customer not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.header}>
          <Text style={styles.name}>{customer.name_en}</Text>
          {customer.name_ar ? <Text style={styles.sub}>{customer.name_ar}</Text> : null}
          <Text style={styles.sub}>Customer ID: {customer.id}</Text>
          <Text style={styles.sub}>Contact Person: {customer.contact_person || 'N/A'}</Text>

          <View style={styles.vatCrBox}>
            <Text style={styles.vatText}>VAT No: {customer.vat_number || 'N/A'}</Text>
            <Text style={styles.vatText}>CR No: {customer.cr_number || 'N/A'}</Text>
          </View>

          <Text style={styles.contact}>📞 {customer.phone_number || 'N/A'}</Text>
          <Text style={styles.contact}>✉️ {customer.email || 'N/A'}</Text>
          <Text style={styles.contact}>🚚 Route Days: {customer.route_days || 'N/A'}</Text>

          <View style={styles.addressBox}>
            <Text style={styles.addressLine}>
              {customer.building_en}
              {customer.secondary_en ? `, ${customer.secondary_en}` : ''}
            </Text>
            <Text style={styles.addressLine}>
              {customer.street_en}, {customer.district_en}
            </Text>
            <Text style={styles.addressLine}>
              {customer.city_en} {customer.postal_en ? `- ${customer.postal_en}` : ''}
            </Text>
          </View>
        </View>

        <View style={styles.actionsGrid}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionBox}
              onPress={() => handleAction(action.label)}
            >
              <Image source={action.icon} style={styles.actionIcon} />
              <Text style={styles.actionText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Due Amount: 0.00</Text>
      </View>
    </View>
  );
};

export default CustomerProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#263159',
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  sub: { fontSize: 14, color: '#fff', marginTop: 6 },
  vatCrBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  vatText: { color: '#fff', fontSize: 13, flex: 1 },
  contact: { color: '#fff', fontSize: 14, marginTop: 10 },
  addressBox: { marginTop: 16 },
  addressLine: { color: '#fff', fontSize: 13, marginTop: 2 },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionBox: {
    width: '42%',
    marginVertical: 10,
    alignItems: 'center',
  },
  actionIcon: {
    width: 36,
    height: 36,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    color: '#263159',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#F0F0F0',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#263159',
  },
});