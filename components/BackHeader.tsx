import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type BackHeaderProps = {
  title?: string;
  gradientColors?: string[];
    topOffset?: number; // Optional prop to adjust the top offset
};

const BackHeader: React.FC<BackHeaderProps> = ({
  title = '',
  gradientColors = ['#FF6B6B', '#FFA07A'], // default gradient
    topOffset = 40,
}) => {
  const router = useRouter();

  return (
    <LinearGradient colors={["#8A003B", "#67002B", "#49001D", "#46011D"]}
             style={[styles.container, { top: topOffset }]}
          >
     <TouchableOpacity onPress={() => router.back()} style={styles.button}>
        {/* Optional title can be displayed here */}
        <Ionicons name="chevron-back" size={22} color={iconColor} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default BackHeader;
const styles = StyleSheet.create({
   container: {
    position: 'absolute',
    top: 40, // can be overridden via props
    left: 16,
    borderRadius: 50,
    zIndex: 20,
  },
  button: {
    padding: 8,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

// default icon color
const iconColor = '#fff';