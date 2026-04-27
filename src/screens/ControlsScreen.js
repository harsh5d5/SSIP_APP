import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Switch,
} from 'react-native';
import {
  Palette,
  Wind,
  Video,
  Moon,
  Zap,
  Coffee,
  Lightbulb,
} from 'lucide-react-native';
import { Colors, Spacing, Shadows } from '../theme';

const ControlsScreen = () => {
  const { width } = useWindowDimensions();
  const [fanOn, setFanOn] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(3);
  
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
          <SceneCard title="Movie Mode" icon={Video} color="#4A00E0" width={width} />
          <SceneCard title="Sleep Mode" icon={Moon} color="#2C3E50" width={width} />
          <SceneCard title="Party Mode" icon={Zap} color="#FF4B2B" width={width} />
          <SceneCard title="Morning" icon={Coffee} color="#F37335" width={width} />
        </View>

        {/* Smart RGB LED Strip */}
        <Text style={styles.sectionTitle}>Smart RGB LED Strips</Text>
        <View style={styles.controlCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircle}>
              <Palette size={20} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Living Room RGB</Text>
              <Text style={styles.cardSubtitle}>{rgbOn ? 'Active' : 'Inactive'}</Text>
            </View>
            <Switch
              value={rgbOn}
              onValueChange={setRgbOn}
              trackColor={{ false: '#D1D1D6', true: Colors.primary + '50' }}
              thumbColor={rgbOn ? Colors.primary : '#FFFFFF'}
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
                  <View style={[styles.sliderFill, { width: `${rgbBrightness}%` }]} />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Mode</Text>
              <View style={styles.modeGrid}>
                {rgbModes.map(mode => (
                  <TouchableOpacity 
                    key={mode} 
                    style={[styles.modeButton, rgbMode === mode && styles.modeButtonActive]}
                    onPress={() => setRgbMode(mode)}
                  >
                    <Text style={[styles.modeButtonText, rgbMode === mode && styles.modeButtonTextActive]}>{mode}</Text>
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
            <View style={[styles.iconCircle, { backgroundColor: '#F2F2F7' }]}>
              <Lightbulb size={20} color={Colors.textSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Kitchen LED</Text>
              <Text style={styles.cardSubtitle}>{ledOn ? 'Active' : 'Inactive'}</Text>
            </View>
            <Switch
              value={ledOn}
              onValueChange={setLedOn}
              trackColor={{ false: '#D1D1D6', true: Colors.primary + '50' }}
              thumbColor={ledOn ? Colors.primary : '#FFFFFF'}
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
                  <View style={[styles.sliderFill, { width: `${ledBrightness}%`, backgroundColor: '#FFB800' }]} />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Mode</Text>
              <View style={styles.modeGrid}>
                {ledModes.map(mode => (
                  <TouchableOpacity 
                    key={mode} 
                    style={[styles.modeButton, ledMode === mode && styles.modeButtonActive]}
                    onPress={() => setLedMode(mode)}
                  >
                    <Text style={[styles.modeButtonText, ledMode === mode && styles.modeButtonTextActive]}>{mode}</Text>
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
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Wind size={20} color="#2196F3" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Smart Fan</Text>
              <Text style={styles.cardSubtitle}>Ceiling Fan • Room 1</Text>
            </View>
            <Switch
              value={fanOn}
              onValueChange={setFanOn}
              trackColor={{ false: '#D1D1D6', true: '#2196F350' }}
              thumbColor={fanOn ? '#2196F3' : '#FFFFFF'}
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
                    style={[styles.fanStep, fanSpeed >= step && { backgroundColor: '#2196F3' }]}
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

const SceneCard = ({ title, icon: Icon, color, width }) => (
  <TouchableOpacity style={[styles.sceneWrapper, { width: (width - 64) / 2, backgroundColor: color }]}>
    <View style={styles.sceneContent}>
      <Icon size={24} color={Colors.white} />
      <Text style={styles.sceneTitleText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  scenesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  sceneWrapper: {
    height: 100,
    borderRadius: 24,
    ...Shadows.light,
  },
  sceneContent: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  sceneTitleText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  controlCard: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: Spacing.lg,
    ...Shadows.light,
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  activeControls: {
    marginTop: Spacing.xl,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  sliderTrack: {
    height: 40,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  sliderArea: {
    flex: 1,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: Colors.primary,
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
    backgroundColor: '#F2F2F7',
  },
  modeButtonActive: {
    backgroundColor: Colors.primary,
  },
  modeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  modeButtonTextActive: {
    color: Colors.white,
  },
  fanControlArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  fanStatus: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.white,
    ...Shadows.light,
  },
  fanSpeedText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2196F3',
  },
  fanLevelText: {
    fontSize: 10,
    color: Colors.textSecondary,
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
    backgroundColor: '#E5E5EA',
    borderRadius: 6,
  },
});

export default ControlsScreen;
