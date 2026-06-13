import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface UserMarkerProps {
  avatar: string;
  size?: number;
}

/**
 * UserMarker Component
 * Displays a developer's avatar as a map marker
 * 
 * @param avatar - URL to the user's GitHub avatar
 * @param size - Optional size of the marker (default: 50)
 */
const UserMarker: React.FC<UserMarkerProps> = ({ avatar, size = 50 }) => {
  return (
    <Image
      source={{ uri: avatar }}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 3,
    borderColor: '#fff',
    backgroundColor: '#f0f0f0'
  }
});

export default UserMarker;
