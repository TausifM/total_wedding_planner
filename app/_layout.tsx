import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Playfair-Bold': require('../assets/fonts/playfair-display.bold.ttf'),
    'Playfair-Regular': require('../assets/fonts/playfair-display.regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    "Poppins-Bold": require('../assets/fonts/poppins.bold.ttf'),
    "Poppins-Regular": require('../assets/fonts/poppins.regular.ttf'),
    "GlacialIndifference-Regular": require('../assets/fonts/GlacialIndifference-Regular.otf'),
    "GlacialIndifference-Bold": require('../assets/fonts/GlacialIndifference-Bold.otf'),
  });

  if (!loaded) {
    return null; // Wait for fonts to load
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Hide header for all unless overridden */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
