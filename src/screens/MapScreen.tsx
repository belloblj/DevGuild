import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import UserMarker from '../components/UserMarker';
import UserTooltip from '../components/UserTooltip';
import { MOCK_USERS, User } from '../types/User';
import { storageService } from '../services/storage';

interface MapScreenProps {
  navigation: any;
}

/**
 * MapScreen - Main community map view
 * 
 * Displays all registered developers on an interactive map.
 * Features:
 * - Shows user avatars as map markers
 * - Tap marker to see user details in tooltip
 * - Tap tooltip to navigate to user's GitHub profile
 * 
 * Note: In production, users would be fetched from a backend API
 */
const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      // In production, fetch from backend:
      // const response = await fetch('https://api.example.com/users');
      // const users = await response.json();
      
      // For MVP, use mock data
      setUsers(MOCK_USERS);
    } catch (error) {
      console.error('Error loading users:', error);
      // Fallback to mock data on error
      setUsers(MOCK_USERS);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerPress = (user: User) => {
    // Marker pressed - opens callout/tooltip
  };

  const handleTooltipPress = (user: User) => {
    // Navigate to user's GitHub profile
    navigation.navigate('Profile', { username: user.username });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
      showsUserLocation
    >
      {users.map((user) => (
        <Marker
          key={user.username}
          coordinate={{
            latitude: user.latitude,
            longitude: user.longitude,
          }}
          onPress={() => handleMarkerPress(user)}
        >
          <UserMarker avatar={user.avatar} size={50} />

          <Callout tooltip>
            <UserTooltip
              user={user}
              onPress={() => handleTooltipPress(user)}
            />
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default MapScreen;
