import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

interface ProfileScreenProps {
  route: {
    params: {
      username: string;
    };
  };
}

/**
 * ProfileScreen - GitHub profile viewer
 * 
 * Displays a developer's GitHub profile using WebView.
 * Users can browse the full GitHub profile including:
 * - Repositories
 * - Contributions
 * - Followers/Following
 * - Bio and details
 */
const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  const { username } = route.params;
  const githubUrl = `https://github.com/${username}`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: githubUrl }}
        startInLoadingState
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ProfileScreen;
