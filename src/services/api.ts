/**
 * API Client Service
 * Centralized HTTP client with authentication and error handling
 */

import Constants from 'expo-constants';
import { storage } from '@/utils/storage';
import { ApiResponse, ApiError } from '@/types/api';

const API_BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl ||
  process.env.API_BASE_URL ||
  'http://mindnotes-alb-914283325.us-east-1.elb.amazonaws.com/api/v1';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make an authenticated request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const accessToken = await storage.getAccessToken();

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Add authorization header if token exists
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw this.handleError(data, response.status);
      }

      return data as ApiResponse<T>;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  /**
   * Handle API errors
   */
  private handleError(data: any, status: number): Error {
    const apiError: ApiError = {
      status: false,
      message: data?.message || 'An error occurred',
      errors: data?.errors,
    };

    // Handle specific status codes
    if (status === 401) {
      // Unauthorized - could trigger token refresh here
      apiError.message = 'Authentication required';
    } else if (status === 403) {
      apiError.message = 'Access forbidden';
    } else if (status === 404) {
      apiError.message = 'Resource not found';
    } else if (status === 500) {
      apiError.message = 'Server error occurred';
    }

    const error = new Error(apiError.message);
    (error as any).apiError = apiError;
    return error;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    body?: any,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
