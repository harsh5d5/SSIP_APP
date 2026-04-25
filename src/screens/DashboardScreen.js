import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  Zap,
  Calendar,
  IndianRupee,
  Wifi,
  Activity,
  Plus,
  Tv,
  Bed,
  Utensils,
  User,
  Bath,
  Sun,
} from 'lucide-react-native';
import { Colors, Spacing } from '../theme';
import StatCard from '../components/StatCard';
import RoomCard from '../components/RoomCard';

const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome Back, Admin</Text>
            <Text style={styles.subtitleText}>Your 2-BHK Smart Home is running smoothly.</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.statusChip, { backgroundColor: `${Colors.success}15` }]}>
              <Wifi size={14} color={Colors.success} />
              <Text style={[styles.statusText, { color: Colors.success }]}>Online</Text>
            </View>
          </View>
        </View>

        {/* Energy Stats */}
        <Text style={styles.sectionTitle}>Energy Monitoring</Text>
        <View style={styles.statsRow}>
          <StatCard
            title="Live"
            value="450"
            unit="W"
            icon={Zap}
            color={Colors.primary}
            trend="+2% hr"
          />
          <StatCard
            title="Month"
            value="342"
            unit="kWh"
            icon={Calendar}
            color="#2196F3"
            trend="-12% mo"
          />
          <StatCard
            title="Cost"
            value="₹1,850"
            unit=""
            icon={IndianRupee}
            color={Colors.success}
            trend="Save ₹240"
          />
        </View>

        {/* Room Controls */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Room Controls</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.roomsGrid}>
          <RoomCard
            name="Living Room"
            devices="6 Devices"
            temp="24°C"
            humidity="45%"
            icon={Tv}
            isActive={true}
          />
          <RoomCard
            name="Master Bed"
            devices="4 Devices"
            temp="22°C"
            humidity="40%"
            icon={Bed}
            isActive={true}
          />
          <RoomCard
            name="Kitchen"
            devices="3 Devices"
            temp="28°C"
            humidity="60%"
            icon={Utensils}
            isActive={false}
          />
          <RoomCard
            name="Guest Room"
            devices="4 Devices"
            temp="24°C"
            humidity="45%"
            icon={User}
            isActive={false}
          />
          <RoomCard
            name="Washroom 1"
            devices="2 Devices"
            temp="25°C"
            humidity="75%"
            icon={Bath}
            isActive={true}
          />
          <RoomCard
            name="Balcony"
            devices="2 Devices"
            temp="30°C"
            humidity="50%"
            icon={Sun}
            isActive={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  subtitleText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
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
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  roomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
