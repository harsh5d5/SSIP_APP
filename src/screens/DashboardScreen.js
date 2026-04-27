import React from 'react';
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
} from 'lucide-react-native';
import { Colors, Spacing, Shadows } from '../theme';
import StatCard from '../components/StatCard';
import RoomCard from '../components/RoomCard';

const DashboardScreen = () => {
  const { width } = useWindowDimensions();
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
          <Text style={styles.statusSubtitle}>12 devices are running perfectly in your home.</Text>
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

        {/* Quick Actions - Adapted from Web to Mobile Horizontal Scroll */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <QuickActionIcon icon={Sun} label="All Lights" active />
          <QuickActionIcon icon={Moon} label="Night Mode" />
          <QuickActionIcon icon={ShieldCheck} label="Away Mode" />
          <QuickActionIcon icon={Zap} label="Eco Mode" />
        </ScrollView>

        {/* Rooms Section */}
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
            <Text style={styles.securityStatus}>All doors locked • No motion detected</Text>
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
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.xl,
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginHorizontal: -Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  qaContainer: {
    alignItems: 'center',
    marginRight: Spacing.md,
    width: 80,
  },
  qaIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    ...Shadows.light,
  },
  qaActive: {
    opacity: 1,
  },
  qaIconActive: {
    backgroundColor: Colors.primary,
    ...Shadows.orange,
  },
  qaLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  qaLabelActive: {
    color: Colors.primary,
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
