import CopyIdModal from '@/components/CopyIdModal';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import StatusBadge from '../../components/StatusBadge';
import { ensureToken, listColisApi } from '../../hooks/api';

type Colis = {
  tracking_id: string;
  recipient_name: string;
  address: string;
  description?: string;
  status: 'pending' | 'delivered' | 'canceled' | string;
  created_at?: any;
  updated_at?: any;
  sender_email?: string;
};

function toLocal(isoOrObj: any): string {
  const iso = typeof isoOrObj === 'string' ? iso : isoOrObj?.$date;
  if (!iso) return '-';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '-' : d.toLocaleString();
}

export default function MyPackagesScreen() {
  const [items, setItems] = useState<Colis[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const [copyId, setCopyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    await ensureToken();
    try {
      setLoading(true);
      const { data } = await listColisApi();
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      Alert.alert('Load failed', e?.response?.data?.error || e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await load();
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  useFocusEffect(
    React.useCallback(() => {
      load();
      return () => {};
    }, [load])
  );

  return (
    <View style={{ flex: 1,paddingTop:24,backgroundColor:"#ff914d" }}>
      <FlatList
        data={items}
        keyExtractor={(it) => it.tracking_id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12,color:"white" }}>
            My Packages 
          </Text>
        }
        ListEmptyComponent={
          !loading ? (
            <View style={{ paddingVertical: 24 }}>
              <Text style={{color:"white"}}>No packages yet.</Text>
            </View>
          ) : null
        }
        StillLoadingComponent={
          loading ? (
            <View style={{ paddingVertical: 24 }}>
              <Text style={{color:"white"}}>Loading...</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 12,
              padding: 12,
              backgroundColor: 'rgba(255,255,255,0.9)',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: '800',color:"#ff6d4d" }}>{item.recipient_name}</Text>
              <StatusBadge status={item.status} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
  <Text style={{ color:"#ff6d4d" }}>Tracking: 
  <Text style={{ fontWeight: '600',color:"black" }}> {item.tracking_id}</Text></Text>
  <TouchableOpacity
    onPress={() => {
      setCopyId(item.tracking_id);
      setCopyOpen(true);
    }}
    style={{ borderColor:"#ff6d4d", marginLeft: 8, paddingHorizontal: 12, paddingVertical: 2, borderWidth: 1, borderRadius: 6, backgroundColor:"rgba(255,109,77,0.7)" }}
  >
    <Text style={{ fontSize: 12, color:"white" }}>Copy ID</Text>
  </TouchableOpacity>
</View>
            <Text numberOfLines={2} ><Text  style={{ color:"#ff6d4d" }}>Address:</Text> {item.address}</Text>
            <Text><Text  style={{ color:"#ff6d4d" }}>Description:</Text> {item.description || '-'}</Text>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>
            <Text  style={{ color:"#ff6d4d" }}>Created:</Text> {toLocal(item.created_at)}
            </Text>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>
            <Text  style={{ color:"#ff6d4d" }}>Updated:</Text> {toLocal(item.updated_at)}
            </Text>
          </View>
        )}
      />
      <CopyIdModal
        visible={copyOpen}
        trackingId={copyId}
        onClose={() => { setCopyOpen(false); setCopyId(null); }}
      />
    </View>
  );
}
