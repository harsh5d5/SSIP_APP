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
import { useTheme } from '../context/ThemeContext';

const EnergyScreen = () => {
  const { width } = useWindowDimensions();
  const { colors, shadows, spacing } = useTheme();
  const [tankLevel, setTankLevel] = useState(72);

  const styles = createStyles(colors, shadows, spacing);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Utilities & Energy</Text>
        <Text style={styles.headerSubtitle}>Real-time monitoring of all home resources</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Tank Level Sensor */}
        <Text style={styles.sectionTitle}>Tank Level Sensor</Text>
        <View style={styles.tankCard}>
          <View style={styles.tankInfo}>
            <View style={[styles.iconCircle, { backgroundColor: colors.background }]}>
              <Droplets size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.tankLabel}>Main Overhead Tank</Text>
              <Text style={styles.tankDetail}>Ultrasonic Sensor • Active</Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: colors.background }]}>
              <Text style={[styles.levelValue, { color: colors.primary }]}>{tankLevel}%</Text>
            </View>
          </View>

          <View style={styles.tankVisualContainer}>
            <View style={[styles.tankCylinder, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <View style={[styles.tankFill, { height: `${tankLevel}%`, backgroundColor: colors.primary }]} />
              <View style={styles.tankGlassEffect} />
              
              <View style={styles.ticksContainer}>
                {[100, 75, 50, 25, 0].map(tick => (
                  <View key={tick} style={styles.tickRow}>
                    <View style={[styles.tickLine, { backgroundColor: colors.border }]} />
                    <Text style={[styles.tickText, { color: colors.textSecondary }]}>{tick}%</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.tankActionArea}>
              <Text style={styles.capacityText}>Estimated: {(tankLevel * 10).toFixed(0)} Liters</Text>
              <TouchableOpacity 
                style={[styles.refreshBtn, { backgroundColor: colors.background }]}
                onPress={() => setTankLevel(Math.floor(Math.random() * 100))}
              >
                <Text style={[styles.refreshText, { color: colors.textSecondary }]}>Refresh Data</Text>
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
            <View style={[styles.liveBadgeSmall, { backgroundColor: colors.background }]}>
              <View style={[styles.pulseDot, { backgroundColor: '#FF3B30' }]} />
              <Text style={[styles.liveBadgeText, { color: '#FF3B30' }]}>LIVE</Text>
            </View>
          </View>
          
          <View style={styles.simpleGraphPlaceholder}>
            <View style={[styles.progressTrack, { backgroundColor: colors.background }]}>
              <View style={[styles.progressFill, { width: '65%', backgroundColor: colors.primary }]} />
            </View>
            <Text style={styles.placeholderText}>Load: 65% of Solar Capacity</Text>
          </View>
        </View>

        {/* Detailed Stats Grid */}
        <View style={styles.detailsGrid}>
          <DetailCard label="Voltage" value="228.4" unit="V" icon={Activity} color={colors.primary} />
          <DetailCard label="Current" value="5.4" unit="A" icon={Zap} color="#FFD60A" />
          <DetailCard label="Battery" value="82" unit="%" icon={Battery} color="#34C759" />
        </View>

        {/* Cost Estimation Card */}
        <Text style={styles.sectionTitle}>Cost & Savings</Text>
        <View style={styles.costCard}>
          <View style={styles.costHeader}>
            <View style={[styles.costIconCircle, { backgroundColor: '#34C759' }]}>
              <IndianRupee size={20} color="#FFFFFF" />
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

const DetailCard = ({ label, value, unit, icon: Icon, color }) => {
  const { colors, shadows } = useTheme();
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 16,
      alignItems: 'center',
      ...shadows.light,
      marginBottom: 16
    }}>
      <View style={{
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: `${color}15`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <Icon size={18} color={color} />
      </View>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.textPrimary }}>{value} <Text style={{ fontSize: 10, color: colors.textSecondary }}>{unit}</Text></Text>
      <Text style={{ fontSize: 10, color: colors.textSecondary, fontWeight: '600' }}>{label}</Text>
    </View>
  );
};

const createStyles = (colors, shadows, spacing) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl + 10, // Safe Zone Fix
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
  tankCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.lg,
    ...shadows.light,
    marginBottom: spacing.md,
  },
  tankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tankLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  tankDetail: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  levelValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tankVisualContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
  },
  tankCylinder: {
    width: 80,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 2,
  },
  tankFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
  },
  tickText: {
    fontSize: 8,
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
    color: colors.textPrimary,
  },
  refreshBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  refreshText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  chartCard: {
    backgroundColor: colors.card,
    borderRadius: 32,
    padding: spacing.md,
    ...shadows.light,
    marginBottom: spacing.xl,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.md,
  },
  liveValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  unit: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  chartSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  liveBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  simpleGraphPlaceholder: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  placeholderText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 8,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  costCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.lg,
    ...shadows.light,
  },
  costHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  costIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  costValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default EnergyScreen;
