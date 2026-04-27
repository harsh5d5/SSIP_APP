import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { Zap, Activity, Battery, IndianRupee } from 'lucide-react-native';
import { Colors, Spacing, Shadows } from '../theme';

const EnergyScreen = () => {
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Energy Analytics</Text>
        <Text style={styles.headerSubtitle}>Real-time power consumption data</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Simplified Stat Card (No Chart) */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.liveValue}>1.24 <Text style={styles.unit}>kW</Text></Text>
              <Text style={styles.chartSubtitle}>Current usage: Stable</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
          </View>
          
          <View style={styles.simpleGraphPlaceholder}>
            <Text style={styles.placeholderText}>Graph disabled for compatibility</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
          </View>
        </View>

        {/* Detailed Stats Grid */}
        <View style={styles.detailsGrid}>
          <DetailItem label="Voltage" value="228.4" unit="V" icon={Activity} color="#2196F3" />
          <DetailItem label="Current" value="5.4" unit="A" icon={Zap} color={Colors.primary} />
          <DetailItem label="Total Today" value="8.2" unit="kWh" icon={Battery} color={Colors.success} />
        </View>

        {/* Cost Estimation Card */}
        <Text style={styles.sectionTitle}>Cost & Savings</Text>
        <View style={styles.costCard}>
          <View style={styles.costHeader}>
            <View style={styles.costIconCircle}>
              <IndianRupee size={20} color={Colors.white} />
            </View>
            <View>
              <Text style={styles.costLabel}>Estimated Monthly Bill</Text>
              <Text style={styles.costValue}>₹1,850.00</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailItem = ({ label, value, unit, icon: Icon, color }) => (
  <View style={styles.detailCard}>
    <View style={[styles.detailIconBg, { backgroundColor: `${color}15` }]}>
      <Icon size={18} color={color} />
    </View>
    <Text style={styles.detailValue}>{value} <Text style={styles.detailUnit}>{unit}</Text></Text>
    <Text style={styles.detailLabel}>{label}</Text>
  </View>
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
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: Spacing.md,
    ...Shadows.light,
    marginBottom: Spacing.xl,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.md,
  },
  liveValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  unit: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  chartSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.error,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.error,
  },
  simpleGraphPlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  placeholderText: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  detailCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.light,
  },
  detailIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  detailUnit: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  detailLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  costCard: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: Spacing.lg,
    ...Shadows.light,
  },
  costHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  costIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  costValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
});

export default EnergyScreen;
