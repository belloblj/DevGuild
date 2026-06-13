import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { storageService } from '../services/storage';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

interface AppNavigatorProps {}

/**
 * AppNavigator - Main navigation configuration
 * 
 * Implements conditional navigation based on onboarding status:
 * - If user has saved GitHub username → Show Map (main screen)
 * - If no username found → Show Welcome screen (first-time setup)
 * 
 * Navigation Stack:
 * 1. Welcome - GitHub username validation
 * 2. Map - Community map with all users
 * 3. Profile - Individual GitHub profile viewer
 */
const AppNavigator: React.FC<AppNavigatorProps> = () => {
  const [initialRoute, setInitialRoute] = useState<'Welcome' | 'Map' | null>(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const username = await storageService.getUsername();
      // Set initial route based on whether user has completed onboarding
      setInitialRoute(username ? 'Map' : 'Welcome');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setInitialRoute('Welcome');
    }
  };

  // Show loading while checking onboarding status
  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: true,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'DevGuild Community' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ route }) => ({
            title: route.params.username,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
