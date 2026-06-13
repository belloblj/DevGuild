import AsyncStorage from '@react-native-async-storage/async-storage';

const GITHUB_USERNAME_KEY = 'github_username';
const USERS_CACHE_KEY = 'users_cache';

/**
 * Storage service for managing app data persistence
 */
export const storageService = {
  /**
   * Save the user's GitHub username after validation
   */
  async saveUsername(username: string): Promise<void> {
    try {
      await AsyncStorage.setItem(GITHUB_USERNAME_KEY, username);
    } catch (error) {
      console.error('Error saving username:', error);
      throw error;
    }
  },

  /**
   * Retrieve the saved GitHub username
   */
  async getUsername(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(GITHUB_USERNAME_KEY);
    } catch (error) {
      console.error('Error retrieving username:', error);
      return null;
    }
  },

  /**
   * Clear the stored username (for logout)
   */
  async clearUsername(): Promise<void> {
    try {
      await AsyncStorage.removeItem(GITHUB_USERNAME_KEY);
    } catch (error) {
      console.error('Error clearing username:', error);
      throw error;
    }
  },

  /**
   * Cache users data locally to reduce API calls
   */
  async cacheUsers(users: any[]): Promise<void> {
    try {
      await AsyncStorage.setItem(USERS_CACHE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error caching users:', error);
    }
  },

  /**
   * Retrieve cached users data
   */
  async getCachedUsers(): Promise<any[] | null> {
    try {
      const cached = await AsyncStorage.getItem(USERS_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error('Error retrieving cached users:', error);
      return null;
    }
  },

  /**
   * Clear all app data
   */
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([GITHUB_USERNAME_KEY, USERS_CACHE_KEY]);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
};
