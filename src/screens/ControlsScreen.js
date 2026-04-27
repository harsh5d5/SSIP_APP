import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Switch,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Palette,
  Wind,
  Video,
  Moon,
  Zap,
  Coffee,
  Lightbulb,
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const ControlsScreen = () => {
  const { width } = useWindowDimensions();
  const { colors, shadows, spacing } = useTheme();
  
  // Fan State
  const [fanOn, setFanOn] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(3);
  
  // Animation State for Fan
  const spinValue = useRef(new Animated.Value(0)).current;
  const spinAnimation = useRef(null);

  // RGB Strip State
  const [rgbOn, setRgbOn] = useState(true);
  const [rgbBrightness, setRgbBrightness] = useState(80);
  const [rgbMode, setRgbMode] = useState('Steady');
  
  // LED Strip State
  const [ledOn, setLedOn] = useState(false);
  const [ledBrightness, setLedBrightness] = useState(50);
  const [ledMode, setLedMode] = useState('Steady');

  const rgbModes = ['Blinking', 'Fade', 'Steady', 'Rainbow'];
  const ledModes = ['Blinking', 'Fade', 'Steady'];

  const styles = createStyles(colors, shadows, spacing);

  // Handle Fan Animation
  useEffect(() => {
    if (fanOn) {
      const duration = 2000 / (fanSpeed * 0.8);
      const startAnimation = () => {
        spinValue.setValue(0);
        spinAnimation.current = Animated.timing(spinValue, {
          toValue: 1,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          if (fanOn) startAnimation();
        });
      };
      startAnimation();
    } else {
      if (spinAnimation.current) spinAnimation.current.stop();
    }
    return () => {
      if (spinAnimation.current) spinAnimation.current.stop();
    };
  }, [fanOn, fanSpeed]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>System Controls</Text>
        <Text style={styles.headerSubtitle}>Customize your home environment</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Quick Scenes */}
        <Text style={styles.sectionTitle}>Quick Scenes</Text>
        <View style={styles.scenesGrid}>
          <SceneCard 
            title="Movie Mode" 
            icon={Video} 
            colors={['#007AFF', '#5AC8FA']} 
            width={width} 
          />
          <SceneCard 
            title="Sleep Mode" 
            icon={Moon} 
            colors={['#1C1C1E', '#000000']} 
            width={width} 
          />
          <SceneCard 
            title="Party Mode" 
            icon={Zap} 
            colors={['#007AFF', '#0A84FF']} 
            width={width} 
          />
          <SceneCard 
            title="Morning" 
            icon={Coffee} 
            colors={['#34C759', '#32D74B']} 
            width={width} 
          />
        </View>

        {/* Smart RGB LED Strip */}
        <Text style={styles.sectionTitle}>Smart RGB LED Strips</Text>
        <View style={styles.controlCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Palette size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Living Room RGB</Text>
              <Text style={styles.cardSubtitle}>{rgbOn ? 'Active' : 'Inactive'}</Text>
            </View>
            <Switch
              value={rgbOn}
              onValueChange={setRgbOn}
              trackColor={{ false: colors.gray, true: colors.primary + '50' }}
              thumbColor={rgbOn ? colors.primary : colors.white}
            />
          </View>

          {rgbOn && (
            <View style={styles.activeControls}>
              <Text style={styles.label}>Brightness: {rgbBrightness}%</Text>
              <View style={styles.sliderTrack}>
                <TouchableOpacity 
                  style={styles.sliderArea} 
                  activeOpacity={1}
                  onPress={(e) => {
                    const newBrightness = Math.round((e.nativeEvent.locationX / (width - 80)) * 100);
                    setRgbBrightness(Math.max(0, Math.min(100, newBrightness)));
                  }}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.sliderFill, { width: `${rgbBrightness}%` }]}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Mode</Text>
              <View style={styles.modeGrid}>
                {rgbModes.map(mode => (
                  <TouchableOpacity 
                    key={mode} 
                    onPress={() => setRgbMode(mode)}
                  >
                    {rgbMode === mode ? (
                      <LinearGradient
                        colors={[colors.primary, colors.accent]}
                        style={styles.modeButton}
                      >
                        <Text style={[styles.modeButtonText, { color: colors.white }]}>{mode}</Text>
                      </LinearGradient>
                    ) : (
                      <View style={styles.modeButtonInactive}>
                        <Text style={styles.modeButtonText}>{mode}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Smart LED Strip */}
        <Text style={styles.sectionTitle}>Smart LED Strips</Text>
        <View style={styles.controlCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.background }]}>
              <Lightbulb size={20} color={colors.textSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Kitchen LED</Text>
              <Text style={styles.cardSubtitle}>{ledOn ? 'Active' : 'Inactive'}</Text>
            </View>
            <Switch
              value={ledOn}
              onValueChange={setLedOn}
              trackColor={{ false: colors.gray, true: colors.primary + '50' }}
              thumbColor={ledOn ? colors.primary : colors.white}
            />
          </View>

          {ledOn && (
            <View style={styles.activeControls}>
              <Text style={styles.label}>Brightness: {ledBrightness}%</Text>
              <View style={styles.sliderTrack}>
                <TouchableOpacity 
                  style={styles.sliderArea} 
                  activeOpacity={1}
                  onPress={(e) => {
                    const newBrightness = Math.round((e.nativeEvent.locationX / (width - 80)) * 100);
                    setLedBrightness(Math.max(0, Math.min(100, newBrightness)));
                  }}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.sliderFill, { width: `${ledBrightness}%` }]}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Mode</Text>
              <View style={styles.modeGrid}>
                {ledModes.map(mode => (
                  <TouchableOpacity 
                    key={mode} 
                    onPress={() => setLedMode(mode)}
                  >
                    {ledMode === mode ? (
                      <LinearGradient
                        colors={[colors.primary, colors.accent]}
                        style={styles.modeButton}
                      >
                        <Text style={[styles.modeButtonText, { color: colors.white }]}>{mode}</Text>
                      </LinearGradient>
                    ) : (
                      <View style={styles.modeButtonInactive}>
                        <Text style={styles.modeButtonText}>{mode}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Smart Fan Section */}
        <Text style={styles.sectionTitle}>Climate Control</Text>
        <View style={styles.controlCard}>
          <View style={styles.cardHeader}>
            <Animated.View style={[styles.iconCircle, { backgroundColor: '#E3F2FD', transform: [{ rotate: spin }] }]}>
              <Wind size={20} color="#2196F3" />
            </Animated.View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Smart Fan</Text>
              <Text style={styles.cardSubtitle}>Ceiling Fan • Room 1</Text>
            </View>
            <Switch
              value={fanOn}
              onValueChange={setFanOn}
              trackColor={{ false: colors.gray, true: colors.primary + '50' }}
              thumbColor={fanOn ? colors.primary : colors.white}
            />
          </View>

          {fanOn && (
            <View style={styles.fanControlArea}>
              <View style={styles.fanStatus}>
                <Text style={styles.fanSpeedText}>{fanSpeed}</Text>
                <Text style={styles.fanLevelText}>Level</Text>
              </View>
              
              <View style={styles.fanStepsContainer}>
                {[1, 2, 3, 4, 5].map((step) => (
                  <TouchableOpacity
                    key={step}
                    style={[styles.fanStep, fanSpeed >= step && { backgroundColor: colors.primary }]}
                    onPress={() => setFanSpeed(step)}
                  />
                ))}
              </View>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const SceneCard = ({ title, icon: Icon, colors, width }) => {
  const { spacing } = useTheme();
  return (
    <TouchableOpacity 
      style={[styles.sceneWrapper, { width: (width - 64) / 2 }]}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.sceneGradient, { padding: spacing.md }]}
      >
        <Icon size={24} color="#FFFFFF" />
        <Text style={[styles.sceneTitleText, { color: '#FFFFFF' }]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const createStyles = (colors, shadows, spacing) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl + 10,
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  sceneWrapper: {
    height: 100,
    borderRadius: 24,
    overflow: 'hidden',
    ...shadows.light,
  },
  sceneGradient: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sceneTitleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  controlCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.lg,
    ...shadows.light,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  activeControls: {
    marginTop: spacing.xl,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  sliderTrack: {
    height: 40,
    backgroundColor: colors.background,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  sliderArea: {
    flex: 1,
  },
  sliderFill: {
    height: '100%',
    borderRadius: 20,
  },
  modeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  modeButtonInactive: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  modeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  fanControlArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  fanStatus: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.card,
    ...shadows.light,
  },
  fanSpeedText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  fanLevelText: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: -4,
  },
  fanStepsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  fanStep: {
    width: 12,
    height: 40,
    backgroundColor: colors.gray,
    borderRadius: 6,
  },
});

const styles = StyleSheet.create({}); // Dummy for export

export default ControlsScreen;
