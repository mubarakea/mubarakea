// src/components/CustomerList.tsx
import React from 'react';
import { FlatList, Text, RefreshControl } from 'react-native';
import { Customer } from '../database/models/Customer';
import { CustomerCard } from '../components/CustomerCard';

export function CustomerList({
  data,
  refreshing,
  onRefresh,
  onSelect,
}: {
  data: Customer[];
  refreshing: boolean;
  onRefresh: () => void;
  onSelect: (c: Customer) => void;
}) {
  if (data.length === 0) {
    return <Text style={{ textAlign:'center', marginTop:20 }}>No customers for today.</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={i => i.id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <CustomerCard customer={item} onPress={() => onSelect(item)} />
      )}
    />
  );
}
