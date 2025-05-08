import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const sampleCustomers = [
  { id: 'CUD005', name: 'Customer 1', area: 'Manama', phone: '9730000000', isSelected: true },
  { id: 'CUD008', name: 'Customer 2', area: 'Riffa', phone: '9730000001', isSelected: false },
  { id: 'CUD011', name: 'Customer 3', area: 'Sitra', phone: '9730000002', isSelected: false },
];

const RouteCustomerList = ({ route }: any) => {
  const { day } = route.params;
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState(sampleCustomers);

  const handleToggle = (index: number) => {
    const updated = [...customers];
    updated[index].isSelected = !updated[index].isSelected;
    setCustomers(updated);
  };

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{day}</Text>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search here"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        <Image source={require('../assets/icons/filter.png')} style={styles.filterIcon} />
      </View>

      {/* Customer List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.id}</Text>
              <Text style={styles.sub}>{item.area}</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.phone}>{item.phone}</Text>
              <TouchableOpacity onPress={() => handleToggle(index)}>
                <View style={styles.toggle}>
                  <Text style={styles.toggleText}>{item.isSelected ? '–' : '+'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default RouteCustomerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263159',
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  filterIcon: {
    width: 18,
    height: 18,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#263159',
  },
  sub: {
    fontSize: 12,
    color: '#666',
  },
  phone: {
    fontSize: 12,
    color: '#444',
    marginBottom: 6,
  },
  right: {
    alignItems: 'flex-end',
  },
  toggle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -1,
  },
});
