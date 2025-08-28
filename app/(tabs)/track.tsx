import StatusBadge from '@/components/StatusBadge';
import React, { useState } from 'react';
import { Alert, Button, ImageBackground, Text, TextInput, View } from 'react-native';
import { trackColisApi } from '../../hooks/api';

function toLocal(isoOrObj: any): string {
  const iso = typeof isoOrObj === 'string' ? iso : isoOrObj?.$date;
  if (!iso) return '-';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '-' : d.toLocaleString();
}

export default function TrackScreen() {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onTrack = async () => {
    try {
      setLoading(true);
      const { data } = await trackColisApi(trackingId.trim());
      setResult(data);
    } catch (e:any) {
      setResult(null);
      Alert.alert('Not found', e?.response?.data?.error || e.message);
    } finally { setLoading(false); }
  };

  return (
    <ImageBackground
    source={require('../../assets/images/track-background.png')} style={{ flex:1,padding:16, gap:12,paddingTop:36,backgroundColor:"#ff6d4d" }}>
      <Text style={{ fontSize:22, fontWeight:'700',color:"white" }}>Track Package</Text>
      
      <View
            style={{
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 12,
              padding: 12,
              backgroundColor: 'rgba(255,255,255,0.9)',
            }}
          >
      <TextInput placeholder="Tracking ID" value={trackingId} onChangeText={setTrackingId}
        style={{ borderWidth:1, padding:10, borderRadius:8,marginBottom:8 }} />
      <Button title={loading ? 'Searching...' : 'Track'} onPress={onTrack} color={"#ff6d4d"}/>

      {result && (
        <View
        style={{
          borderWidth: 1,
          borderColor: '#e5e7eb',
          borderRadius: 12,
          padding: 12,
          backgroundColor: 'rgba(255,255,255,0.9)',
          marginTop: 16,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: '800',color:"#ff6d4d" }}>{result.recipient_name}</Text>
          <StatusBadge status={result.status} />
        </View>

        <View style={{ flexDirection: 'row', alignresults: 'center', justifyContent: 'space-between', marginTop: 4 }}>
        <Text style={{ color:"#ff6d4d" }}>Tracking: 
        <Text style={{ fontWeight: '600',color:"black" }}> {result.tracking_id}</Text></Text>
        </View>
                <Text numberOfLines={2} ><Text  style={{ color:"#ff6d4d" }}>Address:</Text> {result.address}</Text>
                <Text><Text  style={{ color:"#ff6d4d" }}>Description:</Text> {result.description || '-'}</Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                <Text  style={{ color:"#ff6d4d" }}>Created:</Text> {toLocal(result.created_at)}
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                <Text  style={{ color:"#ff6d4d" }}>Updated:</Text> {toLocal(result.updated_at)}
                </Text>
              </View>
      )}
      </View>
    </ImageBackground>
  );
}
