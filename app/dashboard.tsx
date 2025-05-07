import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard</Text>
      <Button title="Go to Customers" onPress={() => router.push('/customers')} />
    </View>
  );
}
