# API Integration Guide

## Overview

This document describes the API integration architecture for the MindNotes application.

## Configuration

### Environment Variables

The API base URL is configured in multiple places for flexibility:

1. `.env` file (local development)
2. `app.json` - `expo.extra.apiBaseUrl` (Expo configuration)
3. Fallback hardcoded URL in the API client

**Current API Base URL:**
```
http://mindnotes-alb-914283325.us-east-1.elb.amazonaws.com/api/v1
```

### Setup

1. Copy `.env.example` to `.env` if not already created
2. Update the `API_BASE_URL` if needed
3. The `app.json` file contains the configuration for Expo builds

## Architecture

### File Structure

```
src/
├── services/
│   ├── api.ts           # Core API client with fetch wrapper
│   ├── auth.ts          # Authentication service
│   └── index.ts         # Service exports
├── utils/
│   └── storage.ts       # Secure storage utility for tokens
└── types/
    └── api.ts           # TypeScript type definitions
```

## Services

### API Client (`src/services/api.ts`)

A centralized HTTP client built on native `fetch` with:
- Automatic authentication header injection
- Error handling and transformation
- RESTful methods (GET, POST, PUT, PATCH, DELETE)
- TypeScript generic support

**Usage:**
```typescript
import { apiClient } from '@/services';

// GET request
const response = await apiClient.get<DataType>('/endpoint');

// POST request
const response = await apiClient.post<DataType>('/endpoint', { data });
```

### Authentication Service (`src/services/auth.ts`)

Handles all authentication operations:

**Methods:**
- `login(credentials)` - Login with email and password
- `register(userData)` - Register new user
- `logout()` - Logout and clear storage
- `getCurrentUser()` - Get stored user data
- `refreshToken()` - Refresh access token
- `isAuthenticated()` - Check authentication status
- `forgotPassword(email)` - Request password reset
- `resetPassword(token, password)` - Reset password
- `verifyEmail(token)` - Verify email address

**Usage:**
```typescript
import { authService } from '@/services';

// Login
const user = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Check authentication
const isAuth = await authService.isAuthenticated();
```

### Storage Utility (`src/utils/storage.ts`)

Secure storage using `expo-secure-store` for sensitive data:

**Methods:**
- `setTokens(tokens)` - Store access and refresh tokens
- `getAccessToken()` - Retrieve access token
- `getRefreshToken()` - Retrieve refresh token
- `getTokens()` - Retrieve both tokens
- `setUser(user)` - Store user data
- `getUser()` - Retrieve user data
- `clear()` - Clear all stored data
- `isAuthenticated()` - Check if access token exists

**Note:** All tokens and sensitive data are stored securely using the device's secure storage system.

## Type Definitions

### API Response Structure

All API responses follow this structure:

```typescript
interface ApiResponse<T> {
  status: boolean;
  message: string;
  results: {
    data: T;
  };
  additional_info?: Record<string, any>;
}
```

### Authentication Types

```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

interface AuthTokens {
  access: string;
  refresh: string;
}
```

See [src/types/api.ts](src/types/api.ts) for complete type definitions.

## Authentication Flows

### Login Flow

**Implementation in Login Screen:**

```typescript
import { authService } from '@/services';

const handleLogIn = async () => {
  try {
    const user = await authService.login({
      email: email.trim().toLowerCase(),
      password: password,
    });

    // User and tokens are automatically stored
    router.replace('/(tabs)/home');
  } catch (error: any) {
    const errorMessage = error?.apiError?.message || 'Login failed';
    Alert.alert('Login Failed', errorMessage);
  }
};
```

### Signup Flow with Onboarding

The signup process collects user data across multiple onboarding screens using React Context:

**Flow:**
1. **Onboarding 1** → Introduction (skip or continue)
2. **Onboarding 2** → Collect birthday and gender (stored in context)
3. **Onboarding 3** → Collect profession (stored in context)
4. **Signup Screen** → Collect email, password, and full name + submit all data

**Implementation:**

```typescript
// 1. SignupContext stores data across screens
import { useSignup } from '@/contexts/SignupContext';

// 2. Onboarding screens collect data
const { updateSignupData } = useSignup();
updateSignupData({
  dob: '1990-01-15',
  gender: 'male',
  profession: 'Software Engineer'
});

// 3. Signup screen submits complete data
const user = await authService.register({
  email: 'user@example.com',
  password: 'password123',
  full_name: 'John Doe',
  dob: signupData.dob,
  gender: signupData.gender,
  profession: signupData.profession
});
```

**Files:**
- [src/contexts/SignupContext.tsx](src/contexts/SignupContext.tsx) - Context for managing signup data
- [src/app/(auth)/onboarding-2.tsx](src/app/(auth)/onboarding-2.tsx) - Collects DOB and gender
- [src/app/(auth)/onboarding-3.tsx](src/app/(auth)/onboarding-3.tsx) - Collects profession
- [src/app/(auth)/signup.tsx](src/app/(auth)/signup.tsx) - Final signup submission

## Error Handling

The API client automatically handles errors and transforms them into a consistent format:

```typescript
interface ApiError {
  status: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
```

**HTTP Status Code Handling:**
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (access denied)
- `404` - Not found
- `500` - Server error

All errors are thrown with an `apiError` property containing detailed error information.

## Authentication Flow

1. **Login:**
   - User submits credentials
   - API returns user data and tokens
   - Tokens are stored securely
   - User data is cached locally
   - Navigate to home screen

2. **Authenticated Requests:**
   - API client automatically adds `Authorization: Bearer {token}` header
   - If token is expired, refresh token flow should be triggered (to be implemented)

3. **Logout:**
   - Call logout endpoint (optional)
   - Clear all stored data
   - Navigate to login screen

## Security Best Practices

1. **Token Storage:** All tokens are stored using `expo-secure-store`, which uses:
   - iOS: Keychain Services
   - Android: Encrypted SharedPreferences with Android Keystore

2. **Password Handling:** Passwords are never stored locally and only transmitted over HTTPS

3. **Email Validation:** Client-side validation before API calls

4. **Error Messages:** Generic error messages to users, detailed logs in console for debugging

## Testing

### Test Login Credentials

```json
{
  "email": "fariz121@example.com",
  "password": "fariz@123"
}
```

## Future Enhancements

- [ ] Implement token refresh flow with interceptors
- [ ] Add request/response logging for debugging
- [ ] Implement request retry logic
- [ ] Add offline support with request queuing
- [ ] Implement biometric authentication
- [ ] Add request cancellation support
- [ ] Implement rate limiting handling
- [ ] Add analytics/monitoring integration

## Troubleshooting

### Common Issues

1. **"Network request failed"**
   - Check internet connection
   - Verify API base URL is correct
   - Check if API server is running

2. **"Authentication required"**
   - Token may be expired
   - Try logging out and logging in again

3. **Environment variables not working**
   - Restart Expo development server
   - Clear Metro bundler cache: `npx expo start -c`

## Dependencies

- `expo-secure-store` - Secure storage for tokens
- `expo-constants` - Access to app configuration
- Native `fetch` API - HTTP client (no external dependencies)

## API Documentation

For complete API documentation, refer to the backend API documentation at:
`http://mindnotes-alb-914283325.us-east-1.elb.amazonaws.com/api/docs`
