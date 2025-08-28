import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import BottomBar from '../../components/BottomBar';
import { useAuth } from '../../hooks/useAuth';

export default function TabsLayout() {
  const { token } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!token) router.replace('/(auth)/login'); }, [token]);

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomBar {...props} />}
    >
      <Tabs.Screen name="packages" options={{ title: 'My Packages' }} />
      <Tabs.Screen name="create"   options={{ title: 'Create' }} />
      <Tabs.Screen name="track"    options={{ title: 'Search' }} />
    </Tabs>
  );
}
