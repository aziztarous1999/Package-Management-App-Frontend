import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  visible: boolean;
  trackingId: string | null;
  onClose: () => void;
  onTrack: (id: string) => void;
};

export default function CreateSuccessModal({ visible, trackingId, onClose, onTrack }: Props) {
  if (!trackingId) return null;

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8,color:"#ff6d4d" }}>Package Created 🎉</Text>
          <Text style={{ marginBottom: 12 }}>Tracking ID:</Text>
          <Text style={{ fontSize: 16, fontWeight: '700' }}>{trackingId}</Text>

          <View style={{ height: 12 }} />

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              onPress={async () => {
                await Clipboard.setStringAsync(trackingId);
              }}
              style={{ flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb' }}
            >
              <Text style={{ textAlign: 'center', fontWeight: '600' }}>Copy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onTrack(trackingId)}
              style={{ flex: 1, padding: 12, borderRadius: 10, backgroundColor: '#ff6d4d' }}
            >
              <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '700' }}>Track now</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 8 }} />

          <TouchableOpacity onPress={onClose} style={{ padding: 10, alignSelf: 'center',borderWidth:1,borderColor:"#dc3545", padding: 12, borderRadius: 10 }}>
            <Text style={{width:200,textAlign: 'center',color:"#dc3545"}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
