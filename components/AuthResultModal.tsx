import * as Haptics from 'expo-haptics';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  type: 'success' | 'error';
  title?: string;
  message?: string;
  primaryLabel: string;
  onPrimary: () => void;
  onClose: () => void;
};

export default function AuthResultModal({
  visible,
  type,
  title,
  message,
  primaryLabel,
  onPrimary,
  onClose,
}: Props) {
  const isSuccess = type === 'success';
  const accent = isSuccess ? '#16a34a' : '#ef4444'; // green / red

  return (
    <Modal transparent animationType="fade" visible={visible} onShow={() => {
      Haptics.notificationAsync(isSuccess ? Haptics.NotificationFeedbackType.Success
                                          : Haptics.NotificationFeedbackType.Error);
    }} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 24, justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 6, color: accent }}>
            {title || (isSuccess ? 'Success' : 'Error')}
          </Text>
          {message ? <Text style={{ marginBottom: 12 }}>{message}</Text> : null}

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={onPrimary}
              style={{ flex: 1, padding: 12, borderRadius: 10, backgroundColor: accent }}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700' }}>
                {primaryLabel}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              style={{ flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb' }}
            >
              <Text style={{ textAlign: 'center', fontWeight: '600' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
