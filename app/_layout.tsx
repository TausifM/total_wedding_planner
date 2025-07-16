import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
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
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* ✅ Just Slot here — don't re-declare Stack or Tabs */}
      <Slot />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
