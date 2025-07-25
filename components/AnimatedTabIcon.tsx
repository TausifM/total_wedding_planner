import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type AnimatedTabIconProps = {
  focused: boolean;
  iconName: IoniconName;
  color: string;
  size: number;
};

export default function AnimatedTabIcon({ focused, iconName, color, size }: AnimatedTabIconProps) {
  const scale = useSharedValue(focused ? 1.2 : 1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1);
  }, [focused, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons name={iconName} size={size} color={color} />
    </Animated.View>
  );
}
