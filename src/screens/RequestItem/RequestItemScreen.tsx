// src/screens/RequestItem/RequestItemScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Request {
  id: string;
  name: string;
  quantity: number;
  date: string;
}

const RequestItemScreen = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);

  const handleSubmit = () => {
    if (!itemName.trim() || !quantity.trim() || isNaN(Number(quantity))) {
      Alert.alert('Invalid Input', 'Please enter a valid name and quantity.');
      return;
    }
    const newReq: Request = {
      id: Date.now().toString(),
      name: itemName.trim(),
      quantity: Number(quantity),
      date: new Date().toLocaleString(),
    };
    setRequests((prev) => [newReq, ...prev]);
    setItemName('');
    setQuantity('');
    Alert.alert('Request Sent', `You requested ${newReq.quantity} × ${newReq.name}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Image
        source={require('../../assets/icons/request.png')}
        style={styles.icon}
      />
      <Text style={styles.title}>Request New Item</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Item name"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="number-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() =>
          requests.length ? <Text style={styles.subheading}>Your Requests</Text> : null
        }
        renderItem={({ item }) => (
          <View style={styles.requestRow}>
            <View>
              <Text style={styles.reqName}>
                {item.quantity} × {item.name}
              </Text>
              <Text style={styles.reqDate}>{item.date}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </KeyboardAvoidingView>
  );
};

export default RequestItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  icon: {
    width: 72,
    height: 72,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#263159',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#263159',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#263159',
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
  requestRow: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  reqName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#263159',
  },
  reqDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
