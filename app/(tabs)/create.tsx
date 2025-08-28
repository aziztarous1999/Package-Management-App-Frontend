import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, ImageBackground, Text, TextInput, View } from 'react-native';
import CreateSuccessModal from '../../components/CreateSuccessModal';
import { createColisApi } from '../../hooks/api';

export default function CreateScreen() {
  const router = useRouter();
  const [recipientName, setRecipientName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [lastId, setLastId] = useState<string | null>(null);

  const onCreate = async () => {
    try {
      setLoading(true);
      const { data } = await createColisApi({
        recipient_name: recipientName,
        address,
        description,
      });
      const id = data?.tracking_id as string;
      setLastId(id);
      setShowModal(true);
      setRecipientName(''); setAddress(''); setDescription('');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // buzz
    } catch (e: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      // keep your existing Alert here if you want
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
    source={require('../../assets/images/create-background.png')}  style={{ flex: 1,padding: 16, gap: 12, paddingTop: 36,backgroundColor:"#ff6d4d" }}>
      <Text style={{ fontSize: 22, fontWeight: '700', color :"white" }}>Create Package</Text>
      <View
            style={{
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 12,
              padding: 12,
              backgroundColor: 'rgba(255,255,255,0.9)',
            }}
          >
      <TextInput placeholder="Recipient name" value={recipientName} onChangeText={setRecipientName}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8,marginBottom:8,borderColor:"#ff6d4d" }} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8,marginBottom:8,borderColor:"#ff6d4d" }} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 10, borderRadius: 8,marginBottom:8,borderColor:"#ff6d4d" }} />
      <Button title={loading ? 'Creating...' : 'Create'} onPress={onCreate} color={"#ff6d4d"} />

      <CreateSuccessModal
        visible={showModal}
        trackingId={lastId}
        onClose={() => setShowModal(false)}
        onTrack={(id) => {
          setShowModal(false);
          router.push({ pathname: '/(tabs)/track', params: { tid: id } });
        }}
      />
      </View>
    </ImageBackground>
  );
}
