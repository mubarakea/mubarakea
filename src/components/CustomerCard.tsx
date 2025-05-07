// src/components/CustomerCard.tsx

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Customer } from '../database/models/Customer';

export const CustomerCard = ({
  customer,
  onPress,
}: {
  customer: Customer;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.left}>
      <Text style={styles.name}>{customer.name_en}</Text>
      {customer.name_ar ? <Text style={styles.nameAr}>{customer.name_ar}</Text> : null}
      <Text style={styles.sub}>{customer.id}</Text>
      <Text style={styles.sub}>{customer.district_en || 'N/A'}</Text>
    </View>
    <View style={styles.right}>
      <Text style={styles.phone}>{customer.phone_number || 'N/A'}</Text>
      <Text style={styles.arrow}>→</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#263159',
  },
  nameAr: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
    fontStyle: 'italic',
  },
  sub: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  right: {
    alignItems: 'flex-end',
  },
  phone: {
    fontSize: 12,
    marginBottom: 5,
  },
  arrow: {
    fontSize: 20,
    color: '#007AFF',
  },
});
