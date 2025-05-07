import { useRouter } from 'expo-router';
import { View, Button, Text } from 'react-native';

export default function Login() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={() => router.push('/dashboard')} />
    </View>
  );
}
