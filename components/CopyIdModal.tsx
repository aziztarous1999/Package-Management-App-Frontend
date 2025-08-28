import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  trackingId: string | null;
  onClose: () => void;
};

export default function CopyIdModal({ visible, trackingId, onClose }: Props) {
  if (!trackingId) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', padding: 24, justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 6, color: '#ff6d4d' }}>
            Tracking ID
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>{trackingId}</Text>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              onPress={async () => { await Clipboard.setStringAsync(trackingId); onClose(); }}
              style={{ flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#ff6d4d' }}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700' }}>Copy</Text>
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
