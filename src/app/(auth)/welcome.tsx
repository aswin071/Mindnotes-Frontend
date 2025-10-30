/**
 * Welcome / Login Screen
 *
 * Entry point for unauthenticated users
 * Features:
 * - Illustrated header (Sunrise over hills)
 * - Main headline "Your Journal Awaits"
 * - Three authentication options:
 *   1. Sign up with Email
 *   2. Continue with Google
 *   3. Continue with Apple
 * - Login link for existing users
 * - Feature snippet about syncing across devices
 *
 * Design: Playful, warm, inviting with yellow primary color
 */

import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Cloud } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleSignUpWithEmail = () => {
    router.push('/(auth)/signup');
  };

  const handleSignUpWithGoogle = () => {
    // TODO: Implement Google OAuth
    console.log('Google Sign Up');
    // For now, navigate to home after successful Google auth
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 500);
  };

  const handleSignUpWithApple = () => {
    // TODO: Implement Apple OAuth
    console.log('Apple Sign Up');
    // For now, navigate to home after successful Apple auth
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 500);
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.neutral.beige },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration Section */}
        <View style={styles.illustrationContainer}>
          <SunriseIllustration />
        </View>

        {/* Headline */}
        <Text style={[styles.headline, { color: theme.colors.neutral.black }]}>
          Your Journal Awaits
        </Text>

        {/* Button Group */}
        <View style={styles.buttonGroup}>
          {/* Sign Up with Email Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              { backgroundColor: theme.colors.primary.main },
            ]}
            onPress={handleSignUpWithEmail}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.buttonText,
                { color: theme.colors.neutral.black },
              ]}
            >
              Sign up with Email
            </Text>
          </TouchableOpacity>

          {/* Continue with Google Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.secondaryButton,
              { backgroundColor: theme.colors.neutral.white },
            ]}
            onPress={handleSignUpWithGoogle}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.buttonText,
                { color: theme.colors.neutral.black },
              ]}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Continue with Apple Button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.secondaryButton,
              { backgroundColor: theme.colors.neutral.white },
            ]}
            onPress={handleSignUpWithApple}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.buttonText,
                { color: theme.colors.neutral.black },
              ]}
            >
              Continue with Apple
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginLinkContainer}>
          <Text style={[styles.loginLinkText, { color: '#9E8747' }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text
              style={[
                styles.loginLink,
                { color: theme.colors.primary.main },
              ]}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        {/* Feature Snippet */}
        <View
          style={[
            styles.featureSnippet,
            {
              backgroundColor: theme.colors.neutral.beige,
              borderRadius: theme.borderRadius.lg,
            },
          ]}
        >
          <View
            style={[
              styles.featureIcon,
              { backgroundColor: `${theme.colors.primary.main}33` },
            ]}
          >
            <Cloud
              size={24}
              color={theme.colors.neutral.black}
              strokeWidth={1.5}
            />
          </View>
          <Text
            style={[
              styles.featureText,
              { color: theme.colors.neutral.black },
            ]}
          >
            Syncs across your devices
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Sunrise Illustration Component
 * Custom SVG-like illustration of a sunrise over hills
 * Colors: Yellow sun (#FCD34D) over brown and beige hills
 */
function SunriseIllustration() {
  return (
    <View
      style={[
        styles.illustration,
        { backgroundColor: theme.colors.neutral.beige },
      ]}
    >
      {/* Sky Background */}
      <View style={styles.sky} />

      {/* Sun Rays */}
      <View style={styles.sunRaysContainer}>
        {/* Top Ray */}
        <View
          style={[
            styles.sunRay,
            styles.sunRayTop,
            { backgroundColor: theme.colors.primary.main },
          ]}
        />
        {/* Top Left Ray */}
        <View
          style={[
            styles.sunRay,
            styles.sunRayTopLeft,
            { backgroundColor: theme.colors.primary.main },
          ]}
        />
        {/* Top Right Ray */}
        <View
          style={[
            styles.sunRay,
            styles.sunRayTopRight,
            { backgroundColor: theme.colors.primary.main },
          ]}
        />
        {/* Left Ray */}
        <View
          style={[
            styles.sunRay,
            styles.sunRayLeft,
            { backgroundColor: theme.colors.primary.main },
          ]}
        />
        {/* Right Ray */}
        <View
          style={[
            styles.sunRay,
            styles.sunRayRight,
            { backgroundColor: theme.colors.primary.main },
          ]}
        />
        {/* Bottom Left Ray */}
        <View
          style={[
            styles.sunRay,
            styles.sunRayBottomLeft,
            { backgroundColor: theme.colors.primary.main },
          ]}
        />
        {/* Bottom Right Ray */}
        <View
          style={[
            styles.sunRay,
            styles.sunRayBottomRight,
            { backgroundColor: theme.colors.primary.main },
          ]}
        />
      </View>

      {/* Sun Circle */}
      <View
        style={[
          styles.sun,
          { backgroundColor: theme.colors.primary.main },
        ]}
      />

      {/* Hills - Back */}
      <View style={[styles.hillBack, { backgroundColor: '#A0826D' }]} />

      {/* Hills - Middle */}
      <View style={[styles.hillMiddle, { backgroundColor: '#B8956A' }]} />

      {/* Hills - Front */}
      <View style={[styles.hillFront, { backgroundColor: '#D4C5A9' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  illustrationContainer: {
    width: '100%',
    marginBottom: 24,
  },
  illustration: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  sky: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#F5E6D3',
  },
  sunRaysContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%',
  },
  sunRay: {
    position: 'absolute',
    borderRadius: 4,
  },
  sunRayTop: {
    width: 6,
    height: 24,
    top: 0,
    left: '50%',
    marginLeft: -3,
  },
  sunRayTopLeft: {
    width: 6,
    height: 24,
    top: 6,
    left: 15,
    transform: [{ rotate: '-45deg' }],
  },
  sunRayLeft: {
    width: 24,
    height: 6,
    left: 0,
    top: '50%',
    marginTop: -3,
  },
  sunRayBottomLeft: {
    width: 6,
    height: 24,
    top: 'auto',
    bottom: 6,
    left: 15,
    transform: [{ rotate: '45deg' }],
  },
  sunRayTopRight: {
    width: 6,
    height: 24,
    top: 6,
    right: 15,
    transform: [{ rotate: '45deg' }],
  },
  sunRayRight: {
    width: 24,
    height: 6,
    right: 0,
    top: '50%',
    marginTop: -3,
  },
  sunRayBottomRight: {
    width: 6,
    height: 24,
    bottom: 6,
    right: 15,
    transform: [{ rotate: '-45deg' }],
  },
  sun: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    top: '28%',
    zIndex: 10,
  },
  hillBack: {
    position: 'absolute',
    bottom: '30%',
    left: 0,
    right: 0,
    height: '30%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  hillMiddle: {
    position: 'absolute',
    bottom: '15%',
    left: -50,
    right: -50,
    height: '35%',
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
  },
  hillFront: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  headline: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 39,
    textAlign: 'center',
    marginBottom: 24,
    marginHorizontal: 16,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  primaryButton: {
    // Shadow for primary button
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  loginLinkText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
  featureSnippet: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
    marginTop: 32,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
    lineHeight: 22,
  },
});
