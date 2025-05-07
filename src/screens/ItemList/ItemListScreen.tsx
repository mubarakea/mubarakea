import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ItemAddModal from '../SalesEntry/ItemAddModal';

const dummyItems = [
  { id: 1, name: 'Water Bottle 1L', price: 1.5 },
  { id: 2, name: 'Notebook A5', price: 0.75 },
  { id: 3, name: 'Pen Blue', price: 0.25 },
  { id: 4, name: 'Milk 500ml', price: 1.1 },
];

const ItemListScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(dummyItems);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (val: string) => {
    setSearch(val);
    const filtered = dummyItems.filter((item) =>
      item.name.toLowerCase().includes(val.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAdd = (entry: any) => {
    navigation.navigate('SalesEntry', { newItem: entry }); // Optional: send to cart
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Item</Text>
      <TextInput
        placeholder="Search items..."
        style={styles.searchInput}
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Price: {item.price.toFixed(3)} BD</Text>
          </TouchableOpacity>
        )}
      />

      <ItemAddModal
        visible={modalVisible}
        item={selectedItem}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />
    </View>
  );
};

export default ItemListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#263159',
  },
  searchInput: {
    backgroundColor: '#f0f2f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#263159',
  },
  itemPrice: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});
