import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// build a 3×3 grid array: [Mon, Tue, Wed, Thu, Fri, Sat, '', 'Sunday', '']
const gridData = [
  ...daysOfWeek,
  '',           // empty cell
  'Sunday',     // centered
  '',           // empty cell
];

export default function ManageRoutesScreen({ navigation }: any) {
  const renderItem = ({ item }: { item: string }) => {
    if (!item) {
      // placeholder: invisible but still takes up the same space
      return <View style={[styles.dayBox, styles.placeholder]} />;
    }
    return (
      <TouchableOpacity
        style={styles.dayBox}
        onPress={() => navigation.navigate('RouteCustomerList', { day: item })}
      >
        <Text style={styles.dayText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Routes</Text>
      <Text style={styles.subtitle}>Manage your daily routes</Text>

      <FlatList
        data={gridData}
        renderItem={renderItem}
        keyExtractor={(_, idx) => String(idx)}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#263159',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  grid: {
    // optional bottom padding
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayBox: {
    width: '30%',        // each box is 30% of container width
    aspectRatio: 1,      // keep it square
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  placeholder: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#263159',
    textAlign: 'center',
  },
});
