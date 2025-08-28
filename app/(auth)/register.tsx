import AuthResultModal from '@/components/AuthResultModal';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, ImageBackground, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState(''), [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await register(email.trim(), password);
      setSuccessOpen(true);
    } catch (e: any) {
      setErrorMsg(e?.response?.data?.error || e.message || 'Registration failed');
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ImageBackground
  source={require('../../assets/images/background.png')}
  style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', padding: 16 }}
>
  <View style={{ gap: 12, padding: 20, borderRadius: 12,marginTop:256 }}>
    <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center' }}>Create Account</Text>
      <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address"
        value={email} onChangeText={setEmail} style={{ borderWidth:1, padding:10, borderRadius:8 }} />
      <TextInput placeholder="Password" secureTextEntry value={password}
        onChangeText={setPassword} style={{ borderWidth:1, padding:10, borderRadius:8 }} />
      <Button title={loading ? 'Submitting...' : 'Register'} onPress={onSubmit}  color={"#ff6d4d"} />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
  <Text>have an account? </Text>
  <Text
    style={{ fontWeight: '700', color: '#ff6d4d' }}
    onPress={() => router.push('/(auth)/login')}
  >
    Log in
  </Text>
</View>
    </View>
    <AuthResultModal
        visible={successOpen}
        type="success"
        title="Account Created 🎉"
        message="Your account was created. You can now sign in."
        primaryLabel="Go to Login"
        onPrimary={() => { setSuccessOpen(false); router.replace('/(auth)/login'); }}
        onClose={() => setSuccessOpen(false)}
      />
      <AuthResultModal
        visible={errorOpen}
        type="error"
        title="Registration Failed"
        message={errorMsg}
        primaryLabel="Try Again"
        onPrimary={() => setErrorOpen(false)}
        onClose={() => setErrorOpen(false)}
      />
    </ImageBackground>
  );
}
