/**
 * Create Journal Entry Screen
 *
 * Allows users to write a new journal entry with:
 * - Title input
 * - Main text area for thoughts
 * - Media attachments (photos, audio)
 * - Tags/categories
 * - Voice-to-text toggle
 * - Save functionality
 *
 * Design: Clean, playful, responsive
 * Colors: From global theme
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image as RNImage,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, Image, Mic, X } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface MediaAttachment {
  id: string;
  type: 'image' | 'audio';
  uri: string;
}

export default function CreateEntryScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>(['Grateful', 'Work']);
  const [newTag, setNewTag] = useState('');
  const [media, setMedia] = useState<MediaAttachment[]>([
    {
      id: '1',
      type: 'image',
      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMJgQ20dPs7HPgiEWkgGG7e5Uu2GFJ-3hw1_3po6xLxlWT1DqM6rTG37nhCB5YZqJ2MTefo-JqQLBqy1AwUKZ2B8Wsmf3HCL-L-xD6_nN-pgqQieUACdtCx6ITZzl49WG3vsaa6bNtOu3-YiHzCYrPLMIoi3Wqm6UYwhyzIsxS5bjfkkdtbxfLEhRdEmtbkjJK834THAr68TCGEYHDC1CZIV3W8xAwEJrG9wEpLNK2PLlECcHcjpiTtbrl2PSRoyWgWZS69JK-O7t3',
    },
    {
      id: '2',
      type: 'audio',
      uri: 'audio-placeholder',
    },
  ]);
  const [voiceToText, setVoiceToText] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    console.log('Saving entry:', { title, content, tags, media });
    // TODO: Call API to save entry
    router.back();
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleRemoveMedia = (id: string) => {
    setMedia(media.filter((m) => m.id !== id));
  };

  const handleAddPhoto = () => {
    console.log('Add photo');
    // TODO: Implement image picker
  };

  const handleAddAudio = () => {
    console.log('Add audio');
    // TODO: Implement audio recorder
  };

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.neutral.beige }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.primary.main }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleBack}
          activeOpacity={0.6}
        >
          <ChevronLeft
            size={24}
            color={theme.colors.neutral.black}
            strokeWidth={2.5}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.neutral.black }]}>
          New Entry
        </Text>
        <TouchableOpacity
          style={[
            styles.headerButton,
            styles.saveButton,
            { backgroundColor: theme.colors.primary.main },
          ]}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={[styles.saveButtonText, { color: theme.colors.neutral.black }]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Display */}
        <Text style={[styles.dateText, { color: theme.colors.neutral.gray[500] }]}>
          {getCurrentDate()}
        </Text>

        {/* Title Input */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.neutral.black }]}>
            Title
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.neutral.black,
                backgroundColor: theme.colors.neutral.white,
                borderColor: theme.colors.neutral.gray[200],
              },
            ]}
            placeholder="Give your entry a title... (optional)"
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        {/* Content Textarea */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.neutral.black }]}>
            Today's Thoughts
          </Text>
          <TextInput
            style={[
              styles.textarea,
              {
                color: theme.colors.neutral.black,
                backgroundColor: theme.colors.neutral.white,
                borderColor: theme.colors.neutral.gray[200],
              },
            ]}
            placeholder="Tell me about your day..."
            placeholderTextColor={theme.colors.neutral.gray[400]}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Media Attachments */}
        {media.length > 0 && (
          <View style={styles.mediaContainer}>
            {media.map((item) => (
              <View key={item.id} style={styles.mediaItem}>
                {item.type === 'image' ? (
                  <View
                    style={[
                      styles.mediaImage,
                      { backgroundColor: theme.colors.neutral.white },
                    ]}
                  >
                    <RNImage
                      source={{ uri: item.uri }}
                      style={styles.mediaImageContent}
                    />
                  </View>
                ) : (
                  <View
                    style={[
                      styles.mediaPlaceholder,
                      { backgroundColor: theme.colors.neutral.white },
                    ]}
                  >
                    <Mic
                      size={24}
                      color={theme.colors.primary.main}
                      strokeWidth={2}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={[
                    styles.removeButton,
                    { backgroundColor: theme.colors.neutral.gray[600] },
                  ]}
                  onPress={() => handleRemoveMedia(item.id)}
                  activeOpacity={0.7}
                >
                  <X size={14} color={theme.colors.neutral.white} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Tags Section */}
        <View style={styles.tagsSection}>
          <Text style={[styles.label, { color: theme.colors.neutral.black }]}>
            Add Tags
          </Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tagPill,
                  { backgroundColor: `${theme.colors.primary.main}40` },
                ]}
              >
                <Text style={[styles.tagText, { color: theme.colors.neutral.black }]}>
                  {tag}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveTag(index)}
                  style={{ marginLeft: 6 }}
                >
                  <X size={14} color={theme.colors.neutral.black} strokeWidth={2} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <TextInput
              style={[
                styles.tagInput,
                {
                  color: theme.colors.neutral.black,
                  borderColor: theme.colors.neutral.gray[200],
                },
              ]}
              placeholder="Type new tag..."
              placeholderTextColor={theme.colors.neutral.gray[400]}
              value={newTag}
              onChangeText={setNewTag}
              onSubmitEditing={handleAddTag}
            />
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: theme.spacing[6] }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.actionBar, { backgroundColor: theme.colors.neutral.beige }]}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAddPhoto}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.actionIconContainer,
                { backgroundColor: theme.colors.neutral.white },
              ]}
            >
              <Image
                size={20}
                color={theme.colors.neutral.black}
                strokeWidth={1.5}
              />
            </View>
            <Text
              style={[
                styles.actionLabel,
                { color: theme.colors.neutral.gray[600] },
              ]}
            >
              Add Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAddAudio}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.actionIconContainer,
                { backgroundColor: theme.colors.neutral.white },
              ]}
            >
              <Mic size={20} color={theme.colors.neutral.black} strokeWidth={1.5} />
            </View>
            <Text
              style={[
                styles.actionLabel,
                { color: theme.colors.neutral.gray[600] },
              ]}
            >
              Record
            </Text>
          </TouchableOpacity>
        </View>

        {/* Voice-to-Text Toggle */}
        <View style={styles.voiceToggleContainer}>
          <Text
            style={[
              styles.voiceToggleLabel,
              { color: theme.colors.neutral.gray[600] },
            ]}
          >
            Voice-to-Text
          </Text>
          <TouchableOpacity
            style={[
              styles.toggle,
              {
                backgroundColor: voiceToText ? theme.colors.primary.main : theme.colors.neutral.gray[300],
              },
            ]}
            onPress={() => setVoiceToText(!voiceToText)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.toggleThumb,
                {
                  transform: [{ translateX: voiceToText ? 22 : 2 }],
                  backgroundColor: theme.colors.neutral.white,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation - Hidden on create entry screen */}
      {/* <BottomNav activeTab="journal" /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
  },
  headerButton: {
    padding: theme.spacing[2],
  },
  saveButton: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.borderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  saveButtonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[4],
    paddingBottom: 160, // Space for action bar and nav
  },
  dateText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '400',
    marginBottom: theme.spacing[4],
  },
  fieldGroup: {
    marginBottom: theme.spacing[5],
  },
  label: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    marginBottom: theme.spacing[2],
  },
  input: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    fontSize: theme.typography.fontSize.base,
    fontWeight: '400',
    minHeight: 56,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[4],
    fontSize: theme.typography.fontSize.base,
    fontWeight: '400',
    minHeight: 200,
  },
  mediaContainer: {
    flexDirection: 'row',
    gap: theme.spacing[3],
    marginBottom: theme.spacing[4],
    flexWrap: 'wrap',
  },
  mediaItem: {
    position: 'relative',
    marginBottom: theme.spacing[2],
  },
  mediaImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  mediaImageContent: {
    width: '100%',
    height: '100%',
  },
  mediaPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsSection: {
    marginBottom: theme.spacing[4],
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    alignItems: 'center',
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  tagText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
  },
  tagInput: {
    flex: 1,
    minWidth: 120,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    paddingVertical: theme.spacing[2],
    borderBottomWidth: 1,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: theme.spacing[4],
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral.gray[200],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing[5],
  },
  actionButton: {
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  actionLabel: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '500',
  },
  voiceToggleContainer: {
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  voiceToggleLabel: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '500',
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
