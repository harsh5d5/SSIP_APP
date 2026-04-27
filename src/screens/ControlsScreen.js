import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  Palette,
  Wind,
  Video,
  Moon,
  Zap,
  Coffee,
} from 'lucide-react-native';
import { Colors, Spacing, Shadows } from '../theme';

const ControlsScreen = () => {
  const { width } = useWindowDimensions();
  const [fanSpeed, setFanSpeed] = useState(3);
  const [activeTab, setActiveTab] = useState('static');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>System Controls</Text>
        <Text style={styles.headerSubtitle}>Customize your home environment</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Simplified Scenes Section (Solid Colors) */}
        <Text style={styles.sectionTitle}>Quick Scenes</Text>
        <View style={styles.scenesGrid}>
          <SceneCard title="Movie Mode" icon={Video} color="#4A00E0" width={width} />
          <SceneCard title="Sleep Mode" icon={Moon} color="#2C3E50" width={width} />
          <SceneCard title="Party Mode" icon={Zap} color="#FF4B2B" width={width} />
          <SceneCard title="Morning" icon={Coffee} color="#F37335" width={width} />
        </View>

        {/* Simplified Ambient Lighting */}
        <Text style={styles.sectionTitle}>Ambient Lighting</Text>
        <View style={styles.controlCard}>
          <View style={styles.lightingHeader}>
            <View style={styles.iconCircle}>
              <Palette size={20} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.cardTitle}>RGB Controller</Text>
              <Text style={styles.cardSubtitle}>Main Living Area</Text>
            </View>
          </View>

          <View style={styles.colorPaletteContainer}>
            <View style={[styles.colorBox, { backgroundColor: '#FF0000' }]} />
            <View style={[styles.colorBox, { backgroundColor: '#00FF00' }]} />
            <View style={[styles.colorBox, { backgroundColor: '#0000FF' }]} />
            <View style={[styles.colorBox, { backgroundColor: '#FFFF00' }]} />
            <View style={[styles.colorBox, { backgroundColor: '#FF00FF' }]} />
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'static' && styles.tabActive]}
              onPress={() => setActiveTab('static')}
            >
              <Text style={[styles.tabText, activeTab === 'static' && styles.tabTextActive]}>Static</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'pulse' && styles.tabActive]}
              onPress={() => setActiveTab('pulse')}
            >
              <Text style={[styles.tabText, activeTab === 'pulse' && styles.tabTextActive]}>Pulse</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Smart Fan Section */}
        <Text style={styles.sectionTitle}>Climate Control</Text>
        <View style={styles.controlCard}>
          <View style={styles.lightingHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Wind size={20} color="#2196F3" />
            </View>
            <View>
              <Text style={styles.cardTitle}>Smart Fan</Text>
              <Text style={styles.cardSubtitle}>Ceiling Fan • Room 1</Text>
            </View>
          </View>

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
  lightingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
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
  colorPaletteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  colorBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: Colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    padding: 4,
    borderRadius: 14,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: Colors.white,
    ...Shadows.light,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  fanControlArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
