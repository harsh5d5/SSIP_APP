import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { Zap, Activity, Battery, IndianRupee, Droplets } from 'lucide-react-native';
import { Colors, Spacing, Shadows } from '../theme';

const EnergyScreen = () => {
  const { width } = useWindowDimensions();
  const [tankLevel, setTankLevel] = useState(72); // Percentage 0-100

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Utilities & Energy</Text>
        <Text style={styles.headerSubtitle}>Real-time monitoring of all home resources</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Tank Level Sensor (NEW) */}
        <Text style={styles.sectionTitle}>Tank Level Sensor</Text>
        <View style={styles.tankCard}>
          <View style={styles.tankInfo}>
            <View style={styles.iconCircle}>
              <Droplets size={24} color="#2196F3" />
            </View>
            <View>
              <Text style={styles.tankLabel}>Main Overhead Tank</Text>
              <Text style={styles.tankDetail}>Ultrasonic Sensor • Active</Text>
            </View>
            <View style={styles.levelBadge}>
              <Text style={styles.levelValue}>{tankLevel}%</Text>
            </View>
          </View>

          <View style={styles.tankVisualContainer}>
            {/* The Tank Cylinder */}
            <View style={styles.tankCylinder}>
              <View style={[styles.tankFill, { height: `${tankLevel}%` }]} />
              <View style={styles.tankGlassEffect} />
              
              {/* Measurement Ticks */}
              <View style={styles.ticksContainer}>
                {[100, 75, 50, 25, 0].map(tick => (
                  <View key={tick} style={styles.tickRow}>
                    <View style={styles.tickLine} />
                    <Text style={styles.tickText}>{tick}%</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.tankActionArea}>
              <Text style={styles.capacityText}>Estimated: {(tankLevel * 10).toFixed(0)} Liters</Text>
              <TouchableOpacity 
                style={styles.refreshBtn}
                onPress={() => setTankLevel(Math.floor(Math.random() * 100))}
              >
                <Text style={styles.refreshText}>Refresh Data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Energy Usage Section */}
        <Text style={styles.sectionTitle}>Power Consumption</Text>
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.liveValue}>1.24 <Text style={styles.unit}>kW</Text></Text>
              <Text style={styles.chartSubtitle}>Current usage: Stable</Text>
            </View>
            <View style={styles.liveBadgeSmall}>
              <View style={styles.pulseDot} />
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
          </View>
          
          <View style={styles.simpleGraphPlaceholder}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.placeholderText}>Load: 65% of Solar Capacity</Text>
          </View>
        </View>

        {/* Detailed Stats Grid */}
        <View style={styles.detailsGrid}>
          <DetailItem label="Voltage" value="228.4" unit="V" icon={Activity} color="#2196F3" />
          <DetailItem label="Current" value="5.4" unit="A" icon={Zap} color={Colors.primary} />
          <DetailItem label="Battery" value="82" unit="%" icon={Battery} color={Colors.success} />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  tankCard: {
    backgroundColor: Colors.white,
    borderRadius: 28,
    padding: Spacing.lg,
    ...Shadows.light,
    marginBottom: Spacing.md,
  },
  tankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tankLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  tankDetail: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  levelBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  levelValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  tankVisualContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
  },
  tankCylinder: {
    width: 80,
    height: 160,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  tankFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2196F3',
  },
  tankGlassEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: '80%',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  ticksContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingLeft: 4,
  },
  tickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tickLine: {
    width: 6,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  tickText: {
    fontSize: 8,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  tankActionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  capacityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  refreshBtn: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  refreshText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textSecondary,
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
  liveBadgeSmall: {
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
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  placeholderText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 8,
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
