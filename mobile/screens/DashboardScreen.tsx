import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';
import { calculateClarityProgress } from '../lib/lifePurpose';
import { getSunSignDescription } from '../lib/astrology';
import { getHumanDesignDescription, getHumanDesignStrategy } from '../lib/humanDesign';

export default function DashboardScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [clarityProgress, setClarityProgress] = useState(0);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setClarityProgress(calculateClarityProgress(data));
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading your Inner Map...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Profile not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.nameText}>{profile.name}</Text>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Clarity Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.cardTitle}>Clarity Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${clarityProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>{clarityProgress}%</Text>
          <Text style={styles.progressSubtext}>
            {clarityProgress < 100
              ? 'Complete more of your profile'
              : 'Your profile is complete!'}
          </Text>
        </View>

        {/* System Cards */}
        <View style={styles.cardsContainer}>
          {/* Astrology Card */}
          <View style={[styles.card, styles.astrologyCard]}>
            <Text style={styles.cardEmoji}>☀️</Text>
            <Text style={styles.cardHeader}>Astrology</Text>
            {profile.sun_sign ? (
              <>
                <Text style={styles.cardValue}>{profile.sun_sign}</Text>
                <Text style={styles.cardDescription}>
                  {getSunSignDescription(profile.sun_sign)}
                </Text>
              </>
            ) : (
              <Text style={styles.cardEmpty}>Not set yet</Text>
            )}
          </View>

          {/* Human Design Card */}
          <View style={[styles.card, styles.hdCard]}>
            <Text style={styles.cardEmoji}>🔮</Text>
            <Text style={styles.cardHeader}>Human Design</Text>
            {profile.hd_type ? (
              <>
                <Text style={styles.cardValue}>{profile.hd_type}</Text>
                <Text style={styles.cardDescription}>
                  {getHumanDesignDescription(profile.hd_type)}
                </Text>
                <Text style={styles.cardStrategy}>
                  Strategy: {getHumanDesignStrategy(profile.hd_type)}
                </Text>
              </>
            ) : (
              <Text style={styles.cardEmpty}>Not set yet</Text>
            )}
          </View>

          {/* MBTI Card */}
          <View style={[styles.card, styles.mbtiCard]}>
            <Text style={styles.cardEmoji}>🧠</Text>
            <Text style={styles.cardHeader}>MBTI</Text>
            {profile.mbti_type ? (
              <Text style={styles.cardValue}>{profile.mbti_type}</Text>
            ) : (
              <Text style={styles.cardEmpty}>Not set yet</Text>
            )}
          </View>

          {/* Enneagram Card */}
          <View style={[styles.card, styles.enneagramCard]}>
            <Text style={styles.cardEmoji}>🌟</Text>
            <Text style={styles.cardHeader}>Enneagram</Text>
            {profile.enneagram_type ? (
              <Text style={styles.cardValue}>Type {profile.enneagram_type}</Text>
            ) : (
              <Text style={styles.cardEmpty}>Not set yet</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  signOutButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  signOutText: {
    color: '#374151',
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#6366f1',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 12,
  },
  progressSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  astrologyCard: {
    borderLeftColor: '#6366f1',
  },
  hdCard: {
    borderLeftColor: '#a855f7',
  },
  mbtiCard: {
    borderLeftColor: '#3b82f6',
  },
  enneagramCard: {
    borderLeftColor: '#ec4899',
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  cardStrategy: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
    fontWeight: '600',
  },
  cardEmpty: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
