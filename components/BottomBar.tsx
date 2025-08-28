import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';

export default function BottomBar(props: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: insets.bottom || 8,
        paddingHorizontal: 12,
        paddingTop: 8,
        borderTopWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fff',
      }}
    >
      {/* default tabs */}
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {props.state.routes.map((route, index) => {
          const isFocused = props.state.index === index;
          const onPress = () => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{ paddingVertical: 8, paddingHorizontal: 12, marginRight: 8, borderRadius: 8 }}
            >
              <Text style={{ fontWeight: isFocused ? '700' : '500',color:"#ff6d4d" }}>
                {props.descriptors[route.key]?.options?.title ?? route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* logout button */}
      <TouchableOpacity
        onPress={async () => {
          await logout();          // clear token
          router.replace('/(auth)/login'); // go to login
        }}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ef4444',
          backgroundColor: '#fff5f5',
        }}
      >
        <Text style={{ color: '#ef4444', fontWeight: '700' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
