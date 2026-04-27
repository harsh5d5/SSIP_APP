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
  ShieldCheck,
  Lock,
  Unlock,
  Eye,
  Bell,
  AlertTriangle,
  History,
  ChevronRight,
} from 'lucide-react-native';
import { Colors, Spacing, Shadows } from '../theme';

const SecurityScreen = () => {
  const { width } = useWindowDimensions();
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
            <ShieldCheck size={60} color={Colors.white} />
          </View>
          <Text style={styles.statusTitle}>System Armed</Text>
          <Text style={styles.statusText}>Your home is fully protected</Text>
        </View>

        {/* Alerts Section (The Red Banner from Web) */}
        <View style={styles.alertBanner}>
          <View style={styles.alertIconBg}>
            <AlertTriangle size={20} color={Colors.white} />
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
            <History size={20} color={Colors.primary} />
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

const LockCard = ({ label, status, isLocked, width }) => (
  <TouchableOpacity style={[styles.lockCard, { width: (width - 64) / 2 }]}>
    <View style={[styles.lockIconCircle, { backgroundColor: isLocked ? '#E3F2FD' : '#FFF3E0' }]}>
      {isLocked ? <Lock size={20} color="#2196F3" /> : <Unlock size={20} color={Colors.primary} />}
    </View>
    <Text style={styles.lockLabel}>{label}</Text>
    <Text style={[styles.lockStatusText, { color: isLocked ? '#2196F3' : Colors.primary }]}>{status}</Text>
  </TouchableOpacity>
);

const LogItem = ({ time, event, location, type }) => (
  <View style={styles.logItem}>
    <View style={[styles.logIndicator, { backgroundColor: type === 'warning' ? Colors.error : type === 'success' ? Colors.success : Colors.primary }]} />
    <View style={styles.logTextWrapper}>
      <Text style={styles.logEvent}>{event}</Text>
      <Text style={styles.logDetail}>{location} • {time}</Text>
    </View>
    <ChevronRight size={16} color={Colors.textSecondary} />
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
  mainStatusCard: {
    backgroundColor: Colors.primary,
    borderRadius: 32,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.orange,
    marginBottom: Spacing.xl,
  },
  shieldWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
  },
  statusText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  alertBanner: {
    backgroundColor: '#FFF5F5',
    borderRadius: 20,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE3E3',
    marginBottom: Spacing.xl,
  },
  alertIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertTextContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.error,
  },
  alertSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  viewBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    ...Shadows.light,
  },
  viewBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.error,
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
  lockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  lockCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.md,
    ...Shadows.light,
  },
  lockIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  lockLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  lockStatusText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  logContainer: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.md,
    ...Shadows.light,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  logTextWrapper: {
    flex: 1,
  },
  logEvent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  logDetail: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
});

export default SecurityScreen;
