import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useMemo } from 'react';
import Index from '@/src/ui/Index';

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark'
        ? {
            ...MD3DarkTheme,
            colors: theme.dark,
          }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme],
  );

  return (
    <PaperProvider theme={paperTheme}>
      <Index />
    </PaperProvider>
  );
}
