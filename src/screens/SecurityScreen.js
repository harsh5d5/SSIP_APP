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
  ShieldCheck,
  Lock,
  Unlock,
  AlertTriangle,
  History,
  ChevronRight,
  Eye,
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const SecurityScreen = () => {
  const { width } = useWindowDimensions();
  const { colors, shadows, spacing } = useTheme();
  
  // Motion Light State
  const [motionLightOn, setMotionLightOn] = useState(true);
  const [isMotionDetected, setIsMotionDetected] = useState(true);

  const styles = createStyles(colors, shadows, spacing);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Security Hub</Text>
        <Text style={styles.headerSubtitle}>Monitor your home's safety in real-time</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Status Badge */}
        <View style={styles.mainStatusCard}>
          <View style={styles.shieldWrapper}>
            <ShieldCheck size={60} color="#FFFFFF" />
          </View>
          <Text style={styles.statusTitle}>System Armed</Text>
          <Text style={styles.statusText}>Your home is fully protected</Text>
        </View>

        {/* Motion Light Control */}
        <Text style={styles.sectionTitle}>Smart Lighting</Text>
        <View style={styles.controlCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, { backgroundColor: colors.background }]}>
              <Eye size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Motion Light</Text>
              <Text style={styles.cardSubtitle}>Front Yard • PIR Sensor</Text>
            </View>
            <Switch
              value={motionLightOn}
              onValueChange={setMotionLightOn}
              trackColor={{ false: colors.gray, true: colors.primary + '50' }}
              thumbColor={motionLightOn ? colors.primary : colors.white}
            />
          </View>

          {motionLightOn && (
            <View style={styles.motionStatusArea}>
              <View style={[styles.motionIndicator, { backgroundColor: isMotionDetected ? '#FF3B3015' : '#34C75915' }]}>
                <View style={[styles.pulseDot, { backgroundColor: isMotionDetected ? '#FF3B30' : '#34C759' }]} />
                <Text style={[styles.motionStatusText, { color: isMotionDetected ? '#FF3B30' : '#34C759' }]}>
                  {isMotionDetected ? 'MOTION DETECTED' : 'CLEAR'}
                </Text>
              </View>
              <TouchableOpacity 
                style={styles.testBtn}
                onPress={() => setIsMotionDetected(!isMotionDetected)}
              >
                <Text style={styles.testBtnText}>Test Sensor</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Alerts Section */}
        <View style={styles.alertBanner}>
          <View style={styles.alertIconBg}>
            <AlertTriangle size={20} color="#FFFFFF" />
          </View>
          <View style={styles.alertTextContainer}>
            <Text style={styles.alertTitle}>Recent Activity Detected</Text>
            <Text style={styles.alertSubtitle}>Trespassers at 08:47 PM • Front Yard</Text>
          </View>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Lock Status Grid */}
        <Text style={styles.sectionTitle}>Entrance Status</Text>
        <View style={styles.lockGrid}>
          <LockCard label="Front Door" status="Locked" isLocked={true} width={width} />
          <LockCard label="Back Door" status="Unlocked" isLocked={false} width={width} />
          <LockCard label="Garage" status="Locked" isLocked={true} width={width} />
          <LockCard label="Window 1" status="Locked" isLocked={true} width={width} />
        </View>

        {/* Activity Log Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Security Log</Text>
          <TouchableOpacity>
            <History size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.logContainer}>
          <LogItem time="08:47 PM" event="Motion Detected" location="Front Yard" type="warning" />
          <LogItem time="07:12 PM" event="System Armed" location="Global" type="info" />
          <LogItem time="06:30 PM" event="Door Unlocked" location="Garage" type="success" />
          <LogItem time="06:15 PM" event="Fingerprint Auth" location="Front Door" type="info" />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const LockCard = ({ label, status, isLocked, width }) => {
  const { colors, shadows } = useTheme();
  return (
    <TouchableOpacity style={[
      { 
        backgroundColor: colors.card,
        borderRadius: 24,
        padding: 16,
        width: (width - 64) / 2,
        ...shadows.light,
        marginBottom: 16
      }
    ]}>
      <View style={[{ 
        width: 44, 
        height: 44, 
        borderRadius: 14, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: 12,
        backgroundColor: isLocked ? colors.background : colors.background
      }]}>
        {isLocked ? <Lock size={20} color={colors.primary} /> : <Unlock size={20} color={colors.textSecondary} />}
      </View>
      <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.textPrimary }}>{label}</Text>
      <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 2, color: isLocked ? colors.primary : colors.textSecondary }}>{status}</Text>
    </TouchableOpacity>
  );
};

const LogItem = ({ time, event, location, type }) => {
  const { colors } = useTheme();
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    }}>
      <View style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 12,
        backgroundColor: type === 'warning' ? '#FF3B30' : type === 'success' ? '#34C759' : colors.primary 
      }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.textPrimary }}>{event}</Text>
        <Text style={{ fontSize: 11, color: colors.textSecondary }}>{location} • {time}</Text>
      </View>
      <ChevronRight size={16} color={colors.textSecondary} />
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
  mainStatusCard: {
    backgroundColor: colors.primary,
    borderRadius: 32,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.blue,
    marginBottom: spacing.xl,
  },
  shieldWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  controlCard: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: spacing.lg,
    ...shadows.light,
    marginBottom: spacing.xl,
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
  motionStatusArea: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  motionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  motionStatusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  testBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  testBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  alertBanner: {
    backgroundColor: colors.isDarkMode ? '#FF3B3020' : '#FFF5F5',
    borderRadius: 20,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.isDarkMode ? '#FF3B3050' : '#FFE3E3',
    marginBottom: spacing.xl,
  },
  alertIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTextContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  alertSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  viewBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    ...shadows.light,
  },
  viewBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  lockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  logContainer: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    ...shadows.light,
  },
});

export default SecurityScreen;
