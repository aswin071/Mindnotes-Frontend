/**
 * Secure Storage Utility
 * Handles storing and retrieving sensitive data like tokens
 */

import * as SecureStore from 'expo-secure-store';
import { AuthTokens, User } from '@/types/api';

const KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
};

export const storage = {
  /**
   * Store authentication tokens securely
   */
  async setTokens(tokens: AuthTokens): Promise<void> {
    try {
      await SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, tokens.access);
      await SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, tokens.refresh);
    } catch (error) {
      console.error('Error storing tokens:', error);
      throw error;
    }
  },

  /**
   * Get access token
   */
  async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },

  /**
   * Get refresh token
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },

  /**
   * Get both tokens
   */
  async getTokens(): Promise<AuthTokens | null> {
    try {
      const access = await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
      const refresh = await SecureStore.getItemAsync(KEYS.REFRESH_TOKEN);

      if (access && refresh) {
        return { access, refresh };
      }
      return null;
    } catch (error) {
      console.error('Error getting tokens:', error);
      return null;
    }
  },

  /**
   * Store user data
   */
  async setUser(user: User): Promise<void> {
    try {
      await SecureStore.setItemAsync(KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error storing user:', error);
      throw error;
    }
  },

  /**
   * Get user data
   */
  async getUser(): Promise<User | null> {
    try {
      const userStr = await SecureStore.getItemAsync(KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  /**
   * Clear all stored data
   */
  async clear(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN);
      await SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN);
      await SecureStore.deleteItemAsync(KEYS.USER);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await SecureStore.getItemAsync(KEYS.ACCESS_TOKEN);
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },
};
