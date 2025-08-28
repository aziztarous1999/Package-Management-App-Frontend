import React from 'react';
import { Text } from 'react-native';

export default function StatusBadge({ status }: { status?: string }) {
  const s = (status || '').toLowerCase();
  const color = s === 'delivered' ? 'green' : s === 'canceled' ? 'crimson' : 'orange';
  return <Text style={{ color, fontWeight: '700' }}>{s || 'unknown'}</Text>;
}