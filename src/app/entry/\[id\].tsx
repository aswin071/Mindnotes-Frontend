/**
 * Entry Detail / Edit Screen
 * View and edit individual journal entries
 * Display entry content, mood, tags, and options to delete/favorite
 *
 * TODO: Add entry detail HTML and design
 */

import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '@/components/common';
import { theme } from '@/constants/theme';
import { X, Edit, Trash, Heart } from 'lucide-react-native';

export default function EntryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = React.useState(false);

  // TODO: Fetch entry data by ID from API/store
  const entry = {
    id,
    title: 'My Amazing Day',
    date: new Date().toLocaleDateString(),
    mood: 'happy',
    content:
      'Today was wonderful! I had a productive day at work, spent time with friends, and reflected on my goals. Everything feels aligned and I\'m grateful for this moment.',
    tags: ['gratitude', 'reflection', 'growth'],
    images: [],
  };

  const handleClose = () => {
    router.back();
  };

  const handleEdit = () => {
    // TODO: Navigate to edit mode
    console.log('Edit entry');
  };

  const handleDelete = () => {
    // TODO: Show confirmation and delete entry
    console.log('Delete entry');
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Save favorite status to API
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.neutral.beige,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: theme.spacing[4],
          paddingVertical: theme.spacing[3],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.neutral.gray[200],
        }}
      >
        <TouchableOpacity onPress={handleClose}>
          <X size={24} color={theme.colors.neutral.black} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            gap: theme.spacing[3],
          }}
        >
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Heart
              size={24}
              color={isFavorite ? theme.colors.status.error : theme.colors.neutral.gray[400]}
              fill={isFavorite ? theme.colors.status.error : 'none'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleEdit}>
            <Edit size={24} color={theme.colors.primary.main} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: theme.spacing[4],
          paddingBottom: theme.spacing[8],
        }}
      >
        {/* Date & Mood */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.spacing[4],
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.neutral.gray[600],
            }}
          >
            {entry.date}
          </Text>

          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
            }}
          >
            😊
          </Text>
        </View>

        {/* Title */}
        <Text
          style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.neutral.black,
            marginBottom: theme.spacing[4],
          }}
        >
          {entry.title}
        </Text>

        {/* Content */}
        <Text
          style={{
            fontSize: theme.typography.fontSize.base,
            lineHeight: 28,
            color: theme.colors.neutral.black,
            marginBottom: theme.spacing[6],
          }}
        >
          {entry.content}
        </Text>

        {/* Tags */}
        {entry.tags.length > 0 && (
          <View
            style={{
              marginBottom: theme.spacing[6],
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.neutral.gray[600],
                marginBottom: theme.spacing[2],
              }}
            >
              Tags
            </Text>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: theme.spacing[2],
              }}
            >
              {entry.tags.map((tag) => (
                <View
                  key={tag}
                  style={{
                    paddingHorizontal: theme.spacing[3],
                    paddingVertical: theme.spacing[1],
                    backgroundColor: theme.colors.primary.light,
                    borderRadius: theme.borderRadius.full,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: theme.typography.fontWeight.semibold,
                      color: theme.colors.primary.main,
                    }}
                  >
                    #{tag}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Actions */}
        <View
          style={{
            gap: theme.spacing[3],
            marginTop: theme.spacing[6],
          }}
        >
          <Button
            title="Edit Entry"
            onPress={handleEdit}
            variant="secondary"
            size="large"
            fullWidth
          />

          <Button
            title="Delete Entry"
            onPress={handleDelete}
            variant="danger"
            size="large"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
