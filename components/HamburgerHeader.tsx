import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function HamburgerHeader({ onPress }: { onPress: () => void }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="menu" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
}
