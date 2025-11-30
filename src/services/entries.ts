/**
 * Journal Entries Service
 * API service for managing journal entries
 */

import { apiClient } from './api';
import {
  CreateEntryRequest,
  CreateEntryResponse,
  JournalEntry,
  ApiResponse,
} from '@/types/api';

/**
 * Create a new journal entry
 */
export async function createEntry(
  data: CreateEntryRequest
): Promise<ApiResponse<CreateEntryResponse>> {
  return apiClient.post<CreateEntryResponse>('/entries/', data);
}

/**
 * Get all journal entries
 */
export async function getEntries(): Promise<ApiResponse<{ entries: JournalEntry[] }>> {
  return apiClient.get<{ entries: JournalEntry[] }>('/entries/');
}

/**
 * Get a single journal entry by ID
 */
export async function getEntry(id: number): Promise<ApiResponse<{ entry: JournalEntry }>> {
  return apiClient.get<{ entry: JournalEntry }>(`/entries/${id}/`);
}

/**
 * Update a journal entry
 */
export async function updateEntry(
  id: number,
  data: Partial<CreateEntryRequest>
): Promise<ApiResponse<CreateEntryResponse>> {
  return apiClient.put<CreateEntryResponse>(`/entries/${id}/`, data);
}

/**
 * Delete a journal entry
 */
export async function deleteEntry(id: number): Promise<ApiResponse<{}>> {
  return apiClient.delete<{}>(`/entries/${id}/`);
}

/**
 * Toggle favorite status of an entry
 */
export async function toggleFavorite(
  id: number,
  isFavorite: boolean
): Promise<ApiResponse<CreateEntryResponse>> {
  return apiClient.patch<CreateEntryResponse>(`/entries/${id}/`, {
    is_favorite: isFavorite,
  });
}
