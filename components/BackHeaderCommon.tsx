import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

type BackHeaderProps = {
  onPress?: () => void;
  style?: ViewStyle; // Optional style prop
};

export const BackHeaderCommon: React.FC<BackHeaderProps> = ({ onPress, style }) => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#8A003B", "#67002B", "#49001D", "#46011D"]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={[styles.gradientWrapper, style]} // merged styles
    >
      <TouchableOpacity
        onPress={onPress ? onPress : () => router.back()}
        style={styles.button}
      >
        <Ionicons name="chevron-back" size={22} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    borderRadius: 100,
  },
  button: {
    padding: 8,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
