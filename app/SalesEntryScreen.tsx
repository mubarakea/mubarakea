import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import ItemAddModal from './ItemAddModal';
  const SalesEntryScreen = () => {
    const navigation = useNavigation();
    const [cart, setCart] = useState<any[]>([]);
    const [payingAmount, setPayingAmount] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const prefix = 'A';
    const dateTime = new Date().toLocaleString();
    const previousDue = 0.001;

    const handleAddItem = () => {
      setSelectedItem({ name: 'Sample Item', price: 1.5 }); // Replace with real item from list
      setModalVisible(true);
    };

    const handleAddToCart = (entry: any) => {
      setCart(prev => [...prev, entry]);
    };

    const handleRemove = (index: number) => {
      const updated = [...cart];
      updated.splice(index, 1);
      setCart(updated);
    };

    const total = cart.reduce((sum, item) => sum + parseFloat(item.total), 0);
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    const finalDue = (total + previousDue - parseFloat(payingAmount || '0')).toFixed(3);

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.prefixLabel}>Prefix</Text>
            <Text style={styles.prefix}>{prefix}</Text>
          </View>
          <Text style={styles.date}>{dateTime}</Text>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.col}>Name</Text>
          <Text style={styles.col}>Price</Text>
          <Text style={styles.col}>Qty</Text>
          <Text style={styles.col}>Unit</Text>
          <Text style={styles.col}>Total</Text>
        </View>

        {/* Cart Items */}
        <FlatList
          data={cart}
          keyExtractor={(_, i) => i.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>List is empty</Text>}
          renderItem={({ item, index }) => (
            <View style={styles.cartRow}>
              <Text style={[styles.colVal, { flex: 2 }]}>{item.name}</Text>
              <Text style={styles.colVal}>{item.price}</Text>
              <Text style={styles.colVal}>{item.quantity}</Text>
              <Text style={styles.colVal}>{item.unit}</Text>
              <Text style={styles.colVal}>{item.total}</Text>
              <TouchableOpacity onPress={() => handleRemove(index)}>
                <Text style={styles.delete}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.rowBetween}>
            <Text>Total Item: {totalQty.toFixed(3)}</Text>
            <Text>Total: {total.toFixed(3)} BD</Text>
          </View>
          <Text>Previous Due Amount: {previousDue.toFixed(3)} BD</Text>
        </View>

        {/* Payment input */}
        <TextInput
          placeholder="Enter Paying Amount"
          style={styles.input}
          keyboardType="decimal-pad"
          value={payingAmount}
          onChangeText={setPayingAmount}
        />

        <Text style={styles.finalDue}>*Total Due Amount: {finalDue} BD</Text>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <ActionButton title="Add Item" icon="＋" onPress={handleAddItem} />
          <ActionButton title="Use Barcode" icon="▣" onPress={() => Alert.alert('Barcode')} />
          <ActionButton title="Save" icon="💾" onPress={() => Alert.alert('Saved!')} />
          <ActionButton title="Use Barcode" icon="▣" onPress={() => navigation.navigate('BarcodeScanner')} />

        </View>

        {/* Modal for adding item */}
        <ItemAddModal
          visible={modalVisible}
          item={selectedItem}
          onClose={() => setModalVisible(false)}
          onAdd={handleAddToCart}
        />
      </View>
    );
  };

  const ActionButton = ({ title, icon, onPress }: any) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionLabel}>{title}</Text>
    </TouchableOpacity>
  );

  export default SalesEntryScreen;

// (Styles same as your original code, no changes needed)
