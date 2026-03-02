import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="haditsdetail" options={{ headerShown: false }} />
        <Stack.Screen name="notifikasi" options={{ headerShown: false }} />
         <Stack.Screen name="dzikir" options={{ headerShown: false }} />
        <Stack.Screen name="hijriah" options={{ headerShown: false }} />
         <Stack.Screen name="zakat" options={{ headerShown: false }} />
          <Stack.Screen name="kajian" options={{ headerShown: false }} />
         <Stack.Screen name="donasi" options={{ headerShown: false }} />
         <Stack.Screen name="qiblat" options={{ headerShown: false }} />
         <Stack.Screen name="buatdoa" options={{ headerShown: false }} />
        <Stack.Screen name="surah" options={{ headerShown: false }} />
         <Stack.Screen name="lainnya" options={{ headerShown: false }} />
        <Stack.Screen name="asmaulhusna" options={{ headerShown: false }} />
        <Stack.Screen name="hadist" options={{ headerShown: false }} />
        <Stack.Screen name="detaildoa" options={{ headerShown: false }} />
        <Stack.Screen name="doa" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
