import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ItemAddModal = ({
  visible,
  onClose,
  onAdd,
  item,
}: {
  visible: boolean;
  onClose: () => void;
  onAdd: (entry: any) => void;
  item: any;
}) => {
  const [unit, setUnit] = useState('BASE (1)');
  const [price, setPrice] = useState(item?.price ?? 0);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);

  useEffect(() => {
    const computedTotal = parseFloat(price) * quantity;
    setTotal(computedTotal.toFixed(3));
  }, [price, quantity]);

  const handleAdd = () => {
    onAdd({
      ...item,
      unit,
      price,
      quantity,
      total,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{item?.name ?? 'Item Name'}</Text>

          <Text style={styles.label}>Unit</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={unit} onValueChange={setUnit}>
              <Picker.Item label="BASE (1)" value="BASE (1)" />
              {/* Add dynamic units if needed */}
            </Picker>
          </View>

          <Text style={styles.label}>Price</Text>
          <TextInput
            value={String(price)}
            onChangeText={(val) => setPrice(parseFloat(val || '0'))}
            keyboardType="decimal-pad"
            style={styles.input}
          />

          <Text style={styles.label}>Enter Quantity</Text>
          <TextInput
            value={String(quantity)}
            onChangeText={(val) => setQuantity(parseInt(val || '1'))}
            keyboardType="numeric"
            style={styles.input}
          />

          <Text style={styles.total}>Total: {total} BD</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ItemAddModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
    color: '#263159',
  },
  label: {
    fontSize: 13,
    marginTop: 12,
    color: '#444',
  },
  input: {
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    fontSize: 14,
  },
  pickerWrapper: {
    backgroundColor: '#f0f2f5',
    borderRadius: 8,
    marginTop: 5,
  },
  total: {
    marginTop: 18,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
    color: '#263159',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancel: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
