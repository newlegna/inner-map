import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { supabase } from '../lib/supabase';
import { calculateSunSign } from '../lib/astrology';
import { calculateHumanDesignType } from '../lib/humanDesign';
import { MBTI_TYPES, ENNEAGRAM_TYPES } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export default function OnboardingScreen({ navigation }: Props) {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);

  // Form data
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [mbtiType, setMbtiType] = useState('');
  const [enneagramType, setEnneagramType] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, birth_date')
          .eq('user_id', user.id)
          .single();

        if (profile) {
          setName(profile.name || '');
          if (profile.birth_date) {
            navigation.replace('Main');
          }
        }
      }
    };
    getUser();
  }, []);

  const handleNext = () => {
    if (step === 1 && !birthDate) {
      Alert.alert('Required', 'Please enter your birth date (YYYY-MM-DD)');
      return;
    }
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    if (!userId) return;

    try {
      const sunSign = birthDate ? calculateSunSign(birthDate) : null;
      const hdType = birthDate ? calculateHumanDesignType(birthDate) : null;

      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          birth_date: birthDate || null,
          birth_time: birthTime || null,
          birth_place: birthPlace || null,
          sun_sign: sunSign,
          hd_type: hdType,
          mbti_type: mbtiType || null,
          enneagram_type: enneagramType || null,
        })
        .eq('user_id', userId);

      if (error) throw error;

      navigation.replace('Main');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {step === 1 ? 'Your Birth Information' : 'Know Your Types?'}
        </Text>
        <Text style={styles.subtitle}>
          Step {step} of 2
        </Text>

        {step === 1 && (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Birth Date (YYYY-MM-DD) *</Text>
              <TextInput
                style={styles.input}
                value={birthDate}
                onChangeText={setBirthDate}
                placeholder="1990-01-15"
                keyboardType="numbers-and-punctuation"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Birth Time (optional)</Text>
              <TextInput
                style={styles.input}
                value={birthTime}
                onChangeText={setBirthTime}
                placeholder="14:30"
                keyboardType="numbers-and-punctuation"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Birth Place (optional)</Text>
              <TextInput
                style={styles.input}
                value={birthPlace}
                onChangeText={setBirthPlace}
                placeholder="New York, USA"
              />
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>MBTI Type (optional)</Text>
              <TextInput
                style={styles.input}
                value={mbtiType}
                onChangeText={setMbtiType}
                placeholder="e.g., INFP"
                autoCapitalize="characters"
              />
              <Text style={styles.hint}>Leave blank if you don't know</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enneagram Type (optional)</Text>
              <TextInput
                style={styles.input}
                value={enneagramType}
                onChangeText={setEnneagramType}
                placeholder="e.g., 4w3"
              />
              <Text style={styles.hint}>Leave blank if you don't know</Text>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setStep(step - 1)}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleNext}
          >
            <Text style={styles.primaryButtonText}>
              {step === 2 ? 'Finish' : 'Continue'}
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 32,
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 16,
  },
  hint: {
    fontSize: 12,
    color: '#9ca3af',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});
