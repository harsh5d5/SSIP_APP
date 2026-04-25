import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { ShieldCheck, Mail, Lock } from 'lucide-react-native';
import { Colors, Spacing, Shadows } from '../theme';

const { width } = Dimensions.get('window');

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Shapes */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <ShieldCheck size={40} color={Colors.white} />
        </View>

        <Text style={styles.title}>SSIP Home Security</Text>
        <Text style={styles.subtitle}>Enter your credentials to access the hub</Text>

        <View style={styles.inputGroup}>
          <View style={styles.inputWrapper}>
            <Mail size={20} color={Colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Lock size={20} color={Colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  card: {
    width: Math.min(width * 0.85, 400),
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.medium,
  },
  iconContainer: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 20,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  inputGroup: {
    width: '100%',
    gap: Spacing.md,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    height: 56,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
