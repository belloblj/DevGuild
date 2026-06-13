/**
 * User type definition for DevGuild app
 * Represents a developer in the community with geographic location
 */
export interface User {
  username: string;
  name: string | null;
  org: string | null;
  latitude: number;
  longitude: number;
  avatar: string;
  bio?: string;
  followers?: number;
}

/**
 * Mock users data for development and demo purposes
 * In production, this data would come from a backend service
 */
export const MOCK_USERS: User[] = [
  {
    username: 'torvalds',
    name: 'Linus Torvalds',
    org: 'Linux Foundation',
    latitude: 37.7749,
    longitude: -122.4194,
    avatar: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    followers: 5000
  },
  {
    username: 'gaearon',
    name: 'Dan Abramov',
    org: 'Meta / React',
    latitude: 37.3382,
    longitude: -121.8863,
    avatar: 'https://avatars.githubusercontent.com/u/810438?v=4',
    followers: 50000
  },
  {
    username: 'vjeux',
    name: 'Christopher Chedeau',
    org: 'Meta',
    latitude: 37.7849,
    longitude: -122.4094,
    avatar: 'https://avatars.githubusercontent.com/u/235379?v=4',
    followers: 8000
  }
];
