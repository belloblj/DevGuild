/**
 * GitHub API Service
 * Handles all GitHub API interactions for user validation and data retrieval
 */

interface GitHubUser {
  login: string;
  name: string | null;
  company: string | null;
  location: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  bio: string | null;
}

export const githubService = {
  /**
   * Validate if a GitHub username exists
   * @param username - GitHub username to validate
   * @returns true if username exists, false otherwise
   */
  async validateUsername(username: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      return response.status === 200;
    } catch (error) {
      console.error('Error validating username:', error);
      return false;
    }
  },

  /**
   * Fetch GitHub user profile data
   * @param username - GitHub username
   * @returns User profile data or null if not found
   */
  async fetchUserProfile(username: string): Promise<GitHubUser | null> {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  /**
   * Fetch user's public repositories
   * @param username - GitHub username
   * @returns Array of repositories
   */
  async fetchUserRepos(username: string): Promise<any[]> {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=10&sort=updated`
      );

      if (!response.ok) {
        return [];
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching repositories:', error);
      return [];
    }
  }
};

export type { GitHubUser };
