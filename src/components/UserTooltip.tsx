import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types/User';

interface UserTooltipProps {
  user: User;
  onPress?: () => void;
}

/**
 * UserTooltip Component
 * Displays user information in a tooltip/callout on the map
 * Shows name, organization, and avatar
 * 
 * @param user - User object containing profile information
 * @param onPress - Callback when tooltip is pressed
 */
const UserTooltip: React.FC<UserTooltipProps> = ({ user, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {user.name || user.username}
          </Text>
          <Text style={styles.org} numberOfLines={1}>
            {user.org || 'Developer'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    minWidth: 200
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#f0f0f0'
  },
  info: {
    flex: 1
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4
  },
  org: {
    fontSize: 12,
    color: '#666',
  }
});

export default UserTooltip;
