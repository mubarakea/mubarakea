import React from 'react';
import { SaleRepository } from '../database/repositories/SaleRepository'; // Adjust the import path as necessary
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';



const SalesReviewScreen = ({ route, navigation }: any) => {
  const { cart, total, totalQty, payingAmount, dueAmount } = route.params;

  const handleSubmit = async () => {
    await ({
      customerId: 'CUD008', // Replace with dynamic if available
      items: cart,
      totalAmount: total,
      payingAmount: parseFloat(payingAmount),
      dueAmount: parseFloat(dueAmount),
    });
    Alert.alert('Success', 'Saved locally!');
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Review</Text>

      <FlatList
        data={cart}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 60 }}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>Qty: {item.quantity} {item.unit}</Text>
              <Text style={styles.sub}>Price: {item.price} x {item.quantity}</Text>
            </View>
            <Text style={styles.total}>{item.total} BD</Text>
          </View>
        )}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <Text>Total Quantity: {totalQty}</Text>
        <Text>Total: {total.toFixed(3)} BD</Text>
        <Text>Paying Amount: {payingAmount} BD</Text>
        <Text style={styles.due}>Due: {dueAmount} BD</Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>CONFIRM & SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SalesReviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#263159' },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: { fontSize: 15, fontWeight: '600', color: '#263159' },
  sub: { fontSize: 12, color: '#666' },
  total: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  summary: {
    marginTop: 20,
    paddingTop: 14,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  due: { marginTop: 6, fontWeight: 'bold', color: '#C62828' },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
