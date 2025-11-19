/**
 * Authentication Service
 * Handles all authentication-related operations
 */

import { apiClient } from './api';
import { storage } from '@/utils/storage';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  ApiResponse,
  User,
} from '@/types/api';

export class AuthService {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<User> {
    try {
      const response: ApiResponse<LoginResponse> = await apiClient.post(
        '/authentication/login',
        credentials
      );

      // Store tokens and user data
      await storage.setTokens(response.results.data.tokens);
      await storage.setUser(response.results.data.user);

      return response.results.data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register new user
   */
  async register(userData: SignupRequest): Promise<User> {
    try {
      const response: ApiResponse<LoginResponse> = await apiClient.post(
        '/authentication/signup',
        userData
      );

      // Store tokens and user data
      await storage.setTokens(response.results.data.tokens);
      await storage.setUser(response.results.data.user);

      return response.results.data.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      // Call logout endpoint (optional, depends on your API)
      // await apiClient.post('/authentication/logout');

      // Clear local storage
      await storage.clear();
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear storage even if API call fails
      await storage.clear();
      throw error;
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await storage.getUser();
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<void> {
    try {
      const refreshToken = await storage.getRefreshToken();

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response: ApiResponse<{ access: string; refresh: string }> =
        await apiClient.post('/authentication/token/refresh', {
          refresh: refreshToken,
        });

      // Update stored tokens
      await storage.setTokens({
        access: response.results.data.access,
        refresh: response.results.data.refresh,
      });
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, clear storage and require re-login
      await storage.clear();
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return await storage.isAuthenticated();
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post('/authentication/password-reset', { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post('/authentication/password-reset/confirm', {
        token,
        password: newPassword,
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<void> {
    try {
      await apiClient.post('/authentication/verify-email', { token });
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
