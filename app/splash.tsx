import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/login');
    }, 2000); // simulate loading
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Loading App...</Text>
    </View>
  );
}
