import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ImageBackground, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { login, token } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState(''), [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (token) router.replace('/(tabs)/packages'); }, [token]);

  const onSubmit = async () => {
    console.log("submiting login");
    try { setLoading(true); await login(email.trim(), password); router.replace('/(tabs)/packages'); }
    catch (e:any) { Alert.alert('Login failed', e?.response?.data?.error || e.message);console.log("failed : ",e.message); }
    finally { setLoading(false); }
  };

  return (
<ImageBackground
  source={require('../../assets/images/background.png')}
  style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', padding: 16 }}
>
  <View style={{ gap: 12, padding: 20, borderRadius: 12,marginTop:256 }}>
    <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center' }}>Sign In</Text>

    <TextInput
      placeholder="Email"
      autoCapitalize="none"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
      style={{ borderWidth: 1, padding: 10, borderRadius: 8, backgroundColor: '#fff' }}
    />
    <TextInput
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
      style={{ borderWidth: 1, padding: 10, borderRadius: 8, backgroundColor: '#fff' }}
    />

    <Button title={loading ? 'Loading...' : 'Login'} onPress={onSubmit} color={"#ff6d4d"} />
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
  <Text>Don't have an account? </Text>
  <Text
    style={{ fontWeight: '700', color: '#ff6d4d' }}
    onPress={() => router.push('/(auth)/register')}
  >
    Sign Up
  </Text>
</View>
  </View>
</ImageBackground>

  );
}
