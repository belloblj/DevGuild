import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';

/**
 * DevGuild - Main App Component
 * 
 * Root component that sets up:
 * - Safe area boundaries
 * - Gesture handler for navigation animations
 * - Status bar styling
 * - Navigation stack
 * 
 * Project structure prioritizes:
 * - Clean, readable code for external developers
 * - Easy to fork and modify
 * - Well-documented with comments explaining intent
 */
const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
        />
        <AppNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
