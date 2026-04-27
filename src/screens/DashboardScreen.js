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
import { LinearGradient } from 'expo-linear-gradient';
import {
  Zap,
  Calendar,
  Thermometer,
  Droplets,
  Wifi,
  Plus,
  Tv,
  Bed,
  Moon,
  Sun,
  ShieldCheck,
  Search,
  Layers,
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import StatCard from '../components/StatCard';
import RoomCard from '../components/RoomCard';

const DashboardScreen = () => {
  const { width } = useWindowDimensions();
  const { colors, shadows, spacing, isDarkMode, toggleTheme } = useTheme();
  
  // MultiLoad State (20 Toggles)
  const [loads, setLoads] = useState(Array(20).fill(false).map((_, i) => ({
    id: i + 1,
    active: i < 3 // First 3 active by default
  })));

  const toggleLoad = (id) => {
    setLoads(loads.map(load => 
      load.id === id ? { ...load, active: !load.active } : load
    ));
  };

  const styles = createStyles(colors, shadows, spacing);

  return (
    <SafeAreaView style={styles.container}>
      {/* Premium Glass Header */}
      <View style={styles.topHeader}>
        <LinearGradient
          colors={isDarkMode ? ['#0A84FF', '#5AC8FA'] : ['#007AFF', '#5AC8FA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCircle}
        >
          <Text style={styles.profileInitial}>A</Text>
        </LinearGradient>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerIcon, shadows.blue]} onPress={toggleTheme}>
            {isDarkMode ? <Sun size={20} color={colors.primary} /> : <Moon size={20} color={colors.primary} />}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerIcon, shadows.blue]}>
            <Plus size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.greetingText}>Good Evening,</Text>
          <Text style={styles.nameText}>Welcome home, <Text style={styles.nameHighlight}>Alex</Text></Text>
          <Text style={styles.statusSubtitle}>System online • 12 sensors active</Text>
        </View>

        {/* Top Overview Stats */}
        <View style={styles.overviewRow}>
          <View style={[styles.miniStat, { width: (width - 64) / 3 }]}>
            <Thermometer size={16} color={colors.primary} />
            <Text style={styles.miniStatValue}>21.4°C</Text>
          </View>
          <View style={[styles.miniStat, { width: (width - 64) / 3 }]}>
            <Zap size={16} color="#FFD60A" />
            <Text style={styles.miniStatValue}>1.24 kW</Text>
          </View>
          <View style={[styles.miniStat, { width: (width - 64) / 3 }]}>
            <Droplets size={16} color="#0A84FF" />
            <Text style={styles.miniStatValue}>48%</Text>
          </View>
        </View>

        {/* MultiLoad 1 to 20 Master Hub */}
        <View style={styles.sectionHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text style={styles.sectionTitle}>Relay Master Board</Text>
            <View style={styles.loadBadge}>
              <Text style={styles.loadBadgeText}>{loads.filter(l => l.active).length} ON</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Layers size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.relayCard}>
          <Text style={styles.relaySubtitle}>MultiLoad Control (1 - 20)</Text>
          <View style={styles.relayGrid}>
            {loads.map((load) => (
              <TouchableOpacity
                key={load.id}
                onPress={() => toggleLoad(load.id)}
                style={[
                  styles.relayButton, 
                  { width: (width - 80) / 5 }, // 5 columns
                  load.active && styles.relayButtonActive
                ]}
              >
                <Text style={[styles.relayNumber, load.active && styles.relayNumberActive]}>
                  {load.id}
                </Text>
                <View style={[styles.relayIndicator, { backgroundColor: load.active ? colors.white : colors.gray }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Active Rooms */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Rooms</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.roomsGrid}>
          <RoomCard
            name="Media Room"
            devices="7 devices"
            temp="22°C"
            humidity="44%"
            icon={Tv}
            isActive={true}
          />
          <RoomCard
            name="Garden"
            devices="4 devices"
            temp="28°C"
            humidity="60%"
            icon={Sun}
            isActive={false}
          />
        </View>

        {/* Security Summary Badge */}
        <TouchableOpacity style={styles.securityBanner}>
          <View style={styles.securityIconBg}>
            <ShieldCheck size={24} color={colors.white} />
          </View>
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>Security System Active</Text>
            <Text style={styles.securityStatus}>Motion Light Ready • System Armed</Text>
          </View>
          <View style={styles.onlineBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.onlineText}>Live</Text>
          </View>
        </TouchableOpacity>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors, shadows, spacing) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl + 10, // Added extra padding for Android Status Bar
    paddingBottom: spacing.md,
    backgroundColor: colors.glass,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  profileCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.blue,
  },
  profileInitial: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  welcomeContainer: {
    marginBottom: spacing.lg,
  },
  greetingText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  nameText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  nameHighlight: {
    color: colors.primary,
  },
  statusSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  miniStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 8,
    ...shadows.light,
  },
  miniStatValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.xl,
  },
  loadBadge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  loadBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
  },
  relayCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.lg,
    ...shadows.light,
  },
  relaySubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  relayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  relayButton: {
    height: 64,
    backgroundColor: colors.background,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  relayButtonActive: {
    backgroundColor: colors.primary,
    ...shadows.blue,
  },
  relayNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  relayNumberActive: {
    color: colors.white,
  },
  relayIndicator: {
    width: 12,
    height: 4,
    borderRadius: 2,
  },
  viewAll: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  roomsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  securityBanner: {
    marginTop: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.light,
    borderWidth: 1,
    borderColor: colors.border,
  },
  securityIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  securityStatus: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.success,
  },
});

export default DashboardScreen;
