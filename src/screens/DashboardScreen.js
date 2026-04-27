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
import { Colors, Spacing, Shadows } from '../theme';
import StatCard from '../components/StatCard';
import RoomCard from '../components/RoomCard';

const DashboardScreen = () => {
  const { width } = useWindowDimensions();
  
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileInitial}>A</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <Search size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Plus size={20} color={Colors.textPrimary} />
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
            <Thermometer size={16} color={Colors.primary} />
            <Text style={styles.miniStatValue}>21.4°C</Text>
          </View>
          <View style={[styles.miniStat, { width: (width - 64) / 3 }]}>
            <Zap size={16} color={Colors.accent} />
            <Text style={styles.miniStatValue}>1.24 kW</Text>
          </View>
          <View style={[styles.miniStat, { width: (width - 64) / 3 }]}>
            <Droplets size={16} color="#007AFF" />
            <Text style={styles.miniStatValue}>48%</Text>
          </View>
        </View>

        {/* MultiLoad 1 to 20 Master Hub (NEW) */}
        <View style={styles.sectionHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text style={styles.sectionTitle}>Relay Master Board</Text>
            <View style={styles.loadBadge}>
              <Text style={styles.loadBadgeText}>{loads.filter(l => l.active).length} ON</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Layers size={18} color={Colors.primary} />
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
                <View style={[styles.relayIndicator, { backgroundColor: load.active ? Colors.white : '#D1D1D6' }]} />
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
            <ShieldCheck size={24} color={Colors.white} />
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

const QuickActionIcon = ({ icon: Icon, label, active }) => (
  <TouchableOpacity style={[styles.qaContainer, active && styles.qaActive]}>
    <View style={[styles.qaIconWrapper, active && styles.qaIconActive]}>
      <Icon size={24} color={active ? Colors.white : Colors.textPrimary} />
    </View>
    <Text style={[styles.qaLabel, active && styles.qaLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.light,
  },
  profileInitial: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.light,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  welcomeContainer: {
    marginBottom: Spacing.lg,
  },
  greetingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  nameText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  nameHighlight: {
    color: Colors.primary,
  },
  statusSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  miniStat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 8,
    ...Shadows.light,
  },
  miniStatValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.xl,
  },
  loadBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  loadBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  relayCard: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: Spacing.lg,
    ...Shadows.light,
  },
  relaySubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.lg,
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
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  relayButtonActive: {
    backgroundColor: Colors.primary,
    ...Shadows.orange,
  },
  relayNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  relayNumberActive: {
    color: Colors.white,
  },
  relayIndicator: {
    width: 12,
    height: 4,
    borderRadius: 2,
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  roomsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  securityBanner: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.light,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  securityIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityTextContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  securityStatus: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.success,
  },
});

export default DashboardScreen;
