// src/components/QuickAction.tsx

import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

export const QuickAction = ({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.label}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 70,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});
