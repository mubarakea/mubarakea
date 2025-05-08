// src/screens/RequestItemList/RequestItemListScreen.tsx

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Request {
  id: string;
  name: string;
  quantity: number;
  date: string;
}

const STORAGE_KEY = 'requests';

const RequestItemListScreen = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadRequests = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      const data: Request[] = json ? JSON.parse(json) : [];
      setRequests(data);
    } catch (err: any) {
      Alert.alert('Error', 'Failed to load requests');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const removeRequest = async (id: string) => {
    Alert.alert(
      'Delete Request?',
      'Are you sure you want to delete this request?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const filtered = requests.filter((r) => r.id !== id);
            setRequests(filtered);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
          },
        },
      ]
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadRequests();
  }, []);

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#263159" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {requests.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No requests made yet.</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onLongPress={() => removeRequest(item.id)}
            >
              <View>
                <Text style={styles.name}>
                  {item.quantity} × {item.name}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default RequestItemListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  row: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#263159',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
