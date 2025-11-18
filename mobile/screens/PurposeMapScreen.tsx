import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { Profile } from '../types';
import { buildLifePurposeDraft } from '../lib/lifePurpose';

export default function PurposeMapScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [purposeContent, setPurposeContent] = useState('');

  useEffect(() => {
    loadPurposeMap();
  }, []);

  const loadPurposeMap = async () => {
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
        // Generate purpose map
        const draft = buildLifePurposeDraft(data);
        setPurposeContent(draft);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Weaving your Life Purpose Map...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Profile not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Life Purpose Map</Text>
        <Text style={styles.subtitle}>
          A synthesis of your Astrology, Human Design, MBTI, and Enneagram
        </Text>

        {/* Profile Summary */}
        <View style={styles.summaryContainer}>
          {profile.sun_sign && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>☀️</Text>
              <Text style={styles.summaryText}>{profile.sun_sign}</Text>
            </View>
          )}
          {profile.hd_type && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>🔮</Text>
              <Text style={styles.summaryText}>{profile.hd_type}</Text>
            </View>
          )}
          {profile.mbti_type && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>🧠</Text>
              <Text style={styles.summaryText}>{profile.mbti_type}</Text>
            </View>
          )}
          {profile.enneagram_type && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryEmoji}>🌟</Text>
              <Text style={styles.summaryText}>Type {profile.enneagram_type}</Text>
            </View>
          )}
        </View>

        {/* Purpose Content */}
        <View style={styles.contentCard}>
          <Text style={styles.contentText}>{purposeContent}</Text>
        </View>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            💡 This is a foundational map. For AI-enhanced insights with deeper analysis,
            the web version includes OpenAI integration.
          </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
  },
  summaryEmoji: {
    fontSize: 20,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  contentCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  note: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  noteText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});
