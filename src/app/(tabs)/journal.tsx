/**
 * Journal Entries Screen
 *
 * Displays a chronological list of all journal entries
 * Features:
 * - Header with date and motivational quote
 * - Search/filter functionality
 * - Journal entries list with mood indicators
 * - Responsive card layout
 * - Playful animations and interactions
 *
 * Design: Clean, modern cards with mood colors
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  ScrollView as RNScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, ChevronRight, MessageCircle, Plus, Calendar, X, ChevronLeft, ChevronDown } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import BottomNav from '@/components/BottomNav';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  preview: string;
  mood: 'happy' | 'excited' | 'calm' | 'reflective' | 'peaceful' | 'productive' | 'sad' | 'anxious';
  readTime: number; // in minutes
}

const SAMPLE_ENTRIES: JournalEntry[] = [
  {
    id: '1',
    date: 'May 15, 2024',
    title: 'A Perfect Day',
    preview: 'Started the day with a productive morning routine. Had a great meeting at work and finished my big project ahead of schedule. Feeling accomplished...',
    mood: 'excited',
    readTime: 4,
  },
  {
    id: '2',
    date: 'May 14, 2024',
    title: 'Quiet Evening Reflections',
    preview: 'Had a lovely, quiet evening. Read a few chapters of my book and just relaxed. It\'s nice to have these moments of peace to myself...',
    mood: 'peaceful',
    readTime: 3,
  },
  {
    id: '3',
    date: 'May 13, 2024',
    title: 'Productive Day',
    preview: 'Felt so productive today! Finished that big project at work and even had energy to go for a long walk. The weather was perfect...',
    mood: 'calm',
    readTime: 5,
  },
  {
    id: '4',
    date: 'May 12, 2024',
    title: 'Overwhelmed But Hopeful',
    preview: 'A bit of a stressful day. Feeling a little overwhelmed with everything on my plate. Hoping for a better day tomorrow...',
    mood: 'anxious',
    readTime: 2,
  },
  {
    id: '5',
    date: 'May 11, 2024',
    title: 'Learning and Growing',
    preview: 'Today I learned something new that changed my perspective. Sometimes the smallest insights lead to the biggest changes...',
    mood: 'reflective',
    readTime: 6,
  },
];

export default function JournalScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchActive, setSearchActive] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleEntryPress = (entryId: string) => {
    // Navigate to entry detail screen
    // Note: Entry detail screen route would need to be created
    console.log('View entry:', entryId);
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Check if date is within range
  const isDateInRange = (date: Date) => {
    if (!selectedStartDate) return false;
    if (!selectedEndDate) return date >= selectedStartDate;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  // Check if date is a boundary date
  const isBoundaryDate = (date: Date) => {
    if (!selectedStartDate) return false;
    const isSameDay = (d1: Date, d2: Date) =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
    return isSameDay(date, selectedStartDate) || (selectedEndDate && isSameDay(date, selectedEndDate));
  };

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    if (!selectedStartDate) {
      setSelectedStartDate(selected);
    } else if (!selectedEndDate) {
      if (selected >= selectedStartDate) {
        setSelectedEndDate(selected);
      } else {
        setSelectedStartDate(selected);
        setSelectedEndDate(null);
      }
    } else {
      setSelectedStartDate(selected);
      setSelectedEndDate(null);
    }
  };

  // Clear date filter
  const clearDateFilter = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  // Close date filter
  const closeDateFilter = () => {
    setShowDateFilter(false);
  };

  const handleCreateNew = () => {
    // Trigger scale animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 10,
      }),
    ]).start();

    router.push('/(tabs)/create-entry');
  };

  const getMoodColor = (mood: string): string => {
    const moodMap: Record<string, string> = {
      happy: theme.colors.mood.happy,
      excited: theme.colors.mood.excited,
      calm: theme.colors.mood.calm,
      reflective: theme.colors.mood.reflective,
      peaceful: theme.colors.mood.peaceful,
      productive: theme.colors.mood.productive,
      sad: theme.colors.mood.sad,
      anxious: theme.colors.mood.anxious,
    };
    return moodMap[mood] || theme.colors.primary.light;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.neutral.beige }]}>
      {/* Header Section */}
      <View style={[styles.headerSection, { backgroundColor: `${theme.colors.primary.main}15` }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.headerGreeting, { color: theme.colors.neutral.black }]}>
              Your Entries
            </Text>
            <Text style={[styles.headerSubtitle, { color: '#9E8747' }]}>
              {SAMPLE_ENTRIES.length} moments captured
            </Text>
          </View>
        </View>
      </View>

      {/* Search & Filter Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchFilterRow}>
          <TouchableOpacity
            onPress={() => setSearchActive(!searchActive)}
            activeOpacity={0.7}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.searchBar,
                {
                  backgroundColor: theme.colors.neutral.white,
                  borderColor: searchActive ? theme.colors.primary.main : '#E5E7EB',
                },
              ]}
            >
              <Search
                size={18}
                color={searchActive ? theme.colors.primary.main : theme.colors.neutral.gray[400]}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.searchPlaceholder,
                  { color: theme.colors.neutral.gray[400] },
                ]}
              >
                Search entries...
              </Text>
            </View>
          </TouchableOpacity>

          {/* Date Filter Button */}
          <TouchableOpacity
            onPress={() => setShowDateFilter(true)}
            style={[
              styles.filterButton,
              {
                backgroundColor: selectedStartDate ? theme.colors.primary.main : theme.colors.neutral.white,
                borderColor: selectedStartDate ? theme.colors.primary.main : '#E5E7EB',
              },
            ]}
            activeOpacity={0.7}
          >
            <Calendar
              size={20}
              color={selectedStartDate ? theme.colors.neutral.black : theme.colors.neutral.gray[400]}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        {/* Active Filter Display */}
        {selectedStartDate && (
          <View style={[styles.activeFilterTag, { backgroundColor: `${theme.colors.primary.main}20` }]}>
            <Text style={[styles.filterTagText, { color: theme.colors.neutral.black }]}>
              {formatDate(selectedStartDate)}
              {selectedEndDate && ` - ${formatDate(selectedEndDate)}`}
            </Text>
            <TouchableOpacity onPress={clearDateFilter} activeOpacity={0.7}>
              <X size={16} color={theme.colors.neutral.black} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Playful Date Filter Modal */}
      <Modal
        visible={showDateFilter}
        transparent
        animationType="fade"
        onRequestClose={closeDateFilter}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.datePickerModal, { backgroundColor: theme.colors.neutral.beige }]}>
            {/* Modal Header */}
            <View style={[styles.modalHeader, { backgroundColor: theme.colors.primary.main }]}>
              <TouchableOpacity onPress={closeDateFilter} style={styles.closeButton}>
                <X size={24} color={theme.colors.neutral.black} strokeWidth={2.5} />
              </TouchableOpacity>
              <Text style={[styles.modalTitle, { color: theme.colors.neutral.black }]}>
                Filter by Date
              </Text>
              <TouchableOpacity onPress={clearDateFilter} style={styles.clearButton}>
                <Text style={[styles.clearButtonText, { color: theme.colors.neutral.black }]}>
                  Clear
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date Range Display */}
            <View style={styles.dateRangeDisplay}>
              <View
                style={[
                  styles.dateBox,
                  { backgroundColor: theme.colors.neutral.white, borderColor: theme.colors.primary.main },
                ]}
              >
                <Text style={[styles.dateBoxLabel, { color: theme.colors.neutral.gray[500] }]}>
                  From
                </Text>
                <Text style={[styles.dateBoxValue, { color: theme.colors.neutral.black }]}>
                  {formatDate(selectedStartDate)}
                </Text>
              </View>

              {selectedEndDate && (
                <>
                  <View style={{ marginHorizontal: theme.spacing[2] }}>
                    <ChevronRight
                      size={24}
                      color={theme.colors.primary.main}
                      strokeWidth={2}
                    />
                  </View>
                  <View
                    style={[
                      styles.dateBox,
                      { backgroundColor: theme.colors.neutral.white, borderColor: theme.colors.primary.main },
                    ]}
                  >
                    <Text style={[styles.dateBoxLabel, { color: theme.colors.neutral.gray[500] }]}>
                      To
                    </Text>
                    <Text style={[styles.dateBoxValue, { color: theme.colors.neutral.black }]}>
                      {formatDate(selectedEndDate)}
                    </Text>
                  </View>
                </>
              )}
            </View>

            {/* Calendar */}
            <RNScrollView
              contentContainerStyle={styles.calendarContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Month/Year Header */}
              <View style={styles.monthHeader}>
                <TouchableOpacity
                  onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  style={styles.monthNavButton}
                >
                  <ChevronLeft size={20} color={theme.colors.primary.main} strokeWidth={2} />
                </TouchableOpacity>
                <Text style={[styles.monthYear, { color: theme.colors.neutral.black }]}>
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                <TouchableOpacity
                  onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  style={styles.monthNavButton}
                >
                  <ChevronDown size={20} color={theme.colors.primary.main} strokeWidth={2} />
                </TouchableOpacity>
              </View>

              {/* Day Labels */}
              <View style={styles.weekDayLabels}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Text
                    key={day}
                    style={[styles.weekDayLabel, { color: theme.colors.neutral.gray[500] }]}
                  >
                    {day}
                  </Text>
                ))}
              </View>

              {/* Calendar Days */}
              <View style={styles.calendarGrid}>
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                  <View key={`empty-${i}`} style={styles.dayCell} />
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const inRange = isDateInRange(date);
                  const isBoundary = isBoundaryDate(date);

                  return (
                    <TouchableOpacity
                      key={day}
                      onPress={() => handleDateSelect(day)}
                      style={[
                        styles.dayCell,
                        inRange && {
                          backgroundColor: `${theme.colors.primary.main}20`,
                        },
                        isBoundary && {
                          backgroundColor: theme.colors.primary.main,
                        },
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isBoundary && { color: theme.colors.neutral.black, fontWeight: '700' },
                          !isBoundary && { color: theme.colors.neutral.black },
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </RNScrollView>

            {/* Footer Action */}
            <TouchableOpacity
              onPress={closeDateFilter}
              style={[
                styles.applyButton,
                { backgroundColor: theme.colors.primary.main },
              ]}
              activeOpacity={0.8}
            >
              <Text style={[styles.applyButtonText, { color: theme.colors.neutral.black }]}>
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Entries List */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        {(() => {
          const filteredEntries = SAMPLE_ENTRIES.filter((entry) => {
            if (!selectedStartDate) return true;
            const entryDate = new Date(entry.date);
            return isDateInRange(entryDate);
          });

          if (filteredEntries.length === 0 && selectedStartDate) {
            return (
              <View style={styles.emptyStateContainer}>
                <Text style={[styles.emptyStateText, { color: theme.colors.neutral.gray[500] }]}>
                  No entries found in this date range
                </Text>
              </View>
            );
          }

          return filteredEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={[
                styles.entryCard,
                { backgroundColor: theme.colors.neutral.white },
              ]}
              onPress={() => handleEntryPress(entry.id)}
              activeOpacity={0.7}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View>
                  <Text style={[styles.entryDate, { color: theme.colors.neutral.black }]}>
                    {entry.date}
                  </Text>
                  <Text
                    style={[styles.entryTitle, { color: theme.colors.neutral.black }]}
                    numberOfLines={1}
                  >
                    {entry.title}
                  </Text>
                </View>
                <View
                  style={[
                    styles.moodIndicator,
                    { backgroundColor: getMoodColor(entry.mood) },
                  ]}
                />
              </View>

              {/* Card Preview */}
              <Text
                style={[
                  styles.entryPreview,
                  { color: '#9E8747' },
                ]}
                numberOfLines={3}
              >
                {entry.preview}
              </Text>

              {/* Card Footer */}
              <View style={styles.cardFooter}>
                <View style={styles.readTimeContainer}>
                  <MessageCircle
                    size={14}
                    color={theme.colors.neutral.gray[400]}
                    strokeWidth={2}
                  />
                  <Text
                    style={[
                      styles.readTime,
                      { color: theme.colors.neutral.gray[400] },
                    ]}
                  >
                    {entry.readTime} min read
                  </Text>
                </View>
                <ChevronRight
                  size={18}
                  color={theme.colors.primary.main}
                  strokeWidth={2.5}
                />
              </View>
            </TouchableOpacity>
          ));
        })()}

        {/* Empty State Spacer */}
        <View style={{ height: theme.spacing[4] }} />
      </Animated.ScrollView>

      {/* Floating Action Button - Bottom Right */}
      <Animated.View
        style={[
          styles.floatingButton,
          {
            backgroundColor: theme.colors.primary.main,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleCreateNew}
          style={styles.fabContent}
          activeOpacity={0.8}
        >
          <Plus size={28} color={theme.colors.neutral.black} strokeWidth={2.5} />
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Navigation */}
      <BottomNav activeTab="journal" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[5],
    borderBottomLeftRadius: theme.borderRadius.lg,
    borderBottomRightRadius: theme.borderRadius.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerGreeting: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: theme.spacing[1],
  },
  headerSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    lineHeight: 18,
  },
  headerDate: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700',
  },
  newEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newEntryButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: theme.spacing[4],
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 50,
  },
  fabContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    gap: theme.spacing[2],
  },
  searchPlaceholder: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing[4],
    paddingTop: theme.spacing[3],
    paddingBottom: 120, // Space for bottom nav
  },
  entryCard: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing[4],
    marginBottom: theme.spacing[3],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing[2],
  },
  entryDate: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    marginBottom: theme.spacing[1],
  },
  entryTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700',
    lineHeight: 20,
  },
  moodIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 2,
  },
  entryPreview: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: theme.spacing[2],
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing[2],
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
  readTime: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '500',
  },
  // Date Filter Styles
  searchFilterRow: {
    flexDirection: 'row',
    gap: theme.spacing[2],
    alignItems: 'center',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.borderRadius.full,
    marginTop: theme.spacing[2],
  },
  filterTagText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[4],
  },
  datePickerModal: {
    width: '88%',
    maxWidth: 300,
    backgroundColor: theme.colors.neutral.beige,
    borderRadius: 28,
    overflow: 'hidden',
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: theme.spacing[4],
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700',
    color: theme.colors.neutral.black,
    flex: 1,
    textAlign: 'center',
  },
  clearButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600',
  },
  dateRangeDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing[1],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    flexWrap: 'wrap',
  },
  dateBox: {
    flex: 1,
    minWidth: 100,
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[2],
    alignItems: 'center',
  },
  dateBoxLabel: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  dateBoxValue: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '700',
    marginTop: theme.spacing[1],
    textAlign: 'center',
  },
  calendarContainer: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    flexGrow: 1,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing[2],
    marginBottom: theme.spacing[2],
  },
  monthNavButton: {
    padding: theme.spacing[1],
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYear: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  weekDayLabels: {
    flexDirection: 'row',
    marginVertical: theme.spacing[1],
    marginBottom: theme.spacing[2],
  },
  weekDayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing[1],
    marginBottom: theme.spacing[2],
  },
  dayCell: {
    width: '13.33%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    textAlign: 'center',
  },
  applyButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: theme.spacing[3],
    marginVertical: theme.spacing[3],
  },
  applyButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing[8],
    minHeight: 200,
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    textAlign: 'center',
  },
});

