import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { githubService } from '../services/github';
import { storageService } from '../services/storage';

interface WelcomeScreenProps {
  navigation: any;
}

/**
 * WelcomeScreen - First-time user setup
 * 
 * Shown only on first app launch. Users must enter and validate
 * their GitHub username before accessing the community map.
 * 
 * Flow:
 * 1. User enters GitHub username
 * 2. App validates username via GitHub API
 * 3. If valid: save username and navigate to Map screen
 * 4. If invalid: show error alert
 */
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateUser = async () => {
    // Validate input
    if (!username.trim()) {
      Alert.alert('Input Required', 'Please enter a GitHub username');
      return;
    }

    if (username.length < 1) {
      Alert.alert('Invalid Username', 'GitHub username must be at least 1 character');
      return;
    }

    setIsLoading(true);

    try {
      // Validate username with GitHub API
      const isValid = await githubService.validateUsername(username);

      if (!isValid) {
        Alert.alert('Username Not Found', 'This GitHub username does not exist. Please check and try again.');
        setIsLoading(false);
        return;
      }

      // Save username locally
      await storageService.saveUsername(username);

      // Navigate to Map screen (replace to prevent back navigation)
      navigation.replace('Map');
    } catch (error) {
      Alert.alert('Network Error', 'Unable to validate username. Please check your internet connection and try again.');
      console.error('Validation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to DevGuild</Text>
        <Text style={styles.subtitle}>
          Connect with developers in your area, share knowledge, and collaborate on projects.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>GitHub Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your GitHub username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            editable={!isLoading}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={validateUser}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Join Community</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Your GitHub username will be validated but never stored on our servers.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0366d6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default WelcomeScreen;
  },
});

export default WelcomeScreen;
