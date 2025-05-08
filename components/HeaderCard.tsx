// src/components/HeaderCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HeaderCard({
  label,
}: {
  label: string;  // e.g. "Wednesday"
}) {
  // you can adjust the locale/format to taste
  const todayDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day:   'numeric',
    year:  'numeric',
  });

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.day}>{label}</Text>
        <Text style={styles.date}>{todayDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#3b5998',
    borderRadius:    12,
    padding:         20,
    marginBottom:    20,
    flexDirection:   'row',
    justifyContent:  'space-between',
    alignItems:      'center',
  },
  day: {
    fontSize:   22,
    color:      '#fff',
    fontWeight: 'bold',
  },
  date: {
    fontSize:   14,
    color:      '#fff',
    marginTop:  6,
  },
});
