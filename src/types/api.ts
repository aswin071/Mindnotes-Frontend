/**
 * API Response Types
 */

export interface ApiResponse<T = any> {
  status: boolean;
  message: string;
  results: {
    data: T;
  };
  additional_info?: Record<string, any>;
}

export interface UserProfile {
  default_entry_privacy: string;
  default_focus_duration: number;
  focus_sound_enabled: boolean;
  mood_tracking_enabled: boolean;
  total_entries: number;
  current_streak: number;
  longest_streak: number;
  total_focus_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number: string;
  avatar: string | null;
  bio: string;
  dob: string;
  gender: string;
  profession: string;
  timezone: string;
  language: string;
  email_notifications: boolean;
  push_notifications: boolean;
  daily_reminder: boolean;
  reminder_time: string | null;
  is_verified: boolean;
  onboarding_completed: boolean;
  onboarding_step: number;
  created_at: string;
  last_login_at: string | null;
  profile: UserProfile;
  is_pro: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  full_name: string;
  dob: string;
  gender: string;
  profession: string;
}

export interface ApiError {
  status: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// ==================== JOURNAL ENTRY ====================
export interface Photo {
  caption?: string;
  order: number;
  url?: string;
}

export interface VoiceNote {
  audio_url: string;
  duration: number;
  transcription?: string;
}

export interface JournalEntry {
  id: number;
  title: string;
  content: string;
  entry_type: 'text' | 'voice' | 'mixed';
  location_name?: string;
  latitude?: number;
  longitude?: number;
  weather?: string;
  temperature?: number;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  photos?: Photo[];
  voice_notes?: VoiceNote[];
  tags?: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  color?: string;
}

export interface CreateEntryRequest {
  title: string;
  content: string;
  entry_type: 'text' | 'voice' | 'mixed';
  photos?: Array<{
    caption?: string;
    order: number;
  }>;
  voice_notes?: Array<{
    audio_url: string;
    duration: number;
  }>;
  location_name?: string;
  latitude?: number;
  longitude?: number;
  weather?: string;
  temperature?: number;
  tag_names?: string[];
  is_favorite?: boolean;
}

export interface CreateEntryResponse {
  entry: JournalEntry;
}
