import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import {
  Cpu,
  Smartphone,
  Laptop,
  Speaker,
  Tv,
  Activity,
  Zap,
  Clock,
  ChevronRight,
  Plus,
  X,
  CheckCircle2,
} from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const SystemScreen = () => {
  const { colors, shadows, spacing, isDarkMode } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [selectedType, setSelectedType] = useState('Smart RGB LED Strip');

  const [devices, setDevices] = useState([
    { id: '1', name: 'MacBook Pro', detail: "Admin's Laptop", icon: Laptop, status: 'Online' },
    { id: '2', name: 'Philips Hue - Lvl', detail: 'Master Bedroom', icon: Zap, status: 'Online' },
    { id: '3', name: 'Smart TV - 4K', detail: 'Living Room', icon: Tv, status: 'Offline' },
    { id: '4', name: 'Alexa Speaker', detail: 'Kitchen', icon: Speaker, status: 'Online' },
  ]);

  const deviceTypes = [
    'Smart RGB LED Strip',
    'Smart LED Strip',
    'Fan Regulator',
    'Motion Light',
    'Tank Level Sensor',
    'MultiLoad 1 to 20'
  ];

  const styles = createStyles(colors, shadows, spacing, isDarkMode);

  const handleAddDevice = () => {
    if (newDeviceName.trim() === '') return;
    const newDevice = {
      id: Date.now().toString(),
      name: newDeviceName,
      detail: selectedType,
      icon: Zap,
      status: 'Online',
    };
    setDevices([newDevice, ...devices]);
    setModalVisible(false);
    setNewDeviceName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>System Hub</Text>
        <Text style={styles.headerSubtitle}>Manage automation rules and hardware</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Automations Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Automations</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.automationList}>
          <AutomationItem 
            title="Motion in Hallway" 
            subtitle="Turns on lights for 2 mins" 
            icon={Activity} 
            active={true} 
          />
          <AutomationItem 
            title="Solar Battery Full" 
            subtitle="Switch to solar power" 
            icon={Zap} 
            active={true} 
          />
          <AutomationItem 
            title="Sunrise Mode" 
            subtitle="Open curtains at 6:00 AM" 
            icon={Clock} 
            active={false} 
          />
        </View>

        {/* Connected Devices Section */}
        <View style={styles.sectionHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={styles.sectionTitle}>Connected Devices</Text>
            <Text style={styles.deviceCount}>{devices.length} Active</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.deviceList}>
          {devices.map(device => (
            <DeviceItem 
              key={device.id}
              name={device.name} 
              detail={device.detail} 
              icon={device.icon} 
              status={device.status} 
            />
          ))}
        </View>

        <View style={styles.systemInfoCard}>
          <View style={[styles.infoIconBg, { backgroundColor: colors.background }]}>
            <Cpu size={24} color={colors.primary} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Raspberry Pi 5 Master</Text>
            <Text style={styles.infoSubtitle}>OS: SSIP-IoT v2.4 • Uptime: 14 days</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Add Device Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Device</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Device Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Living Room RGB Strip"
              value={newDeviceName}
              onChangeText={setNewDeviceName}
              placeholderTextColor={colors.textSecondary}
            />

            <Text style={styles.inputLabel}>Device Category</Text>
            <ScrollView style={styles.typeList} showsVerticalScrollIndicator={false}>
              {deviceTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeOption, selectedType === type && styles.typeOptionSelected]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={[styles.typeOptionText, selectedType === type && styles.typeOptionTextSelected]}>
                    {type}
                  </Text>
                  {selectedType === type && <CheckCircle2 size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleAddDevice}>
              <Text style={styles.saveButtonText}>Add to System</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const AutomationItem = ({ title, subtitle, icon: Icon, active }) => {
  const { colors, spacing } = useTheme();
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    }}>
      <View style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: active ? `${colors.primary}15` : colors.background
      }}>
        <Icon size={20} color={active ? colors.primary : colors.textSecondary} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.textPrimary }}>{title}</Text>
        <Text style={{ fontSize: 11, color: colors.textSecondary }}>{subtitle}</Text>
      </View>
      <Switch 
        value={active}
        trackColor={{ false: colors.gray, true: colors.primary + '50' }}
        thumbColor={active ? colors.primary : colors.white}
      />
    </View>
  );
};

const DeviceItem = ({ name, detail, icon: Icon, status }) => {
  const { colors } = useTheme();
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    }}>
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Icon size={20} color={colors.textPrimary} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.textPrimary }}>{name}</Text>
        <Text style={{ fontSize: 11, color: colors.textSecondary }}>{detail}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: status === 'Online' ? '#34C759' : '#FF3B30' }} />
        <Text style={{ fontSize: 11, fontWeight: 'bold', color: status === 'Online' ? '#34C759' : '#FF3B30' }}>{status}</Text>
        <ChevronRight size={16} color={colors.textSecondary} />
      </View>
    </View>
  );
};

const createStyles = (colors, shadows, spacing, isDarkMode) => StyleSheet.create({
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
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.light,
  },
  automationList: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.sm,
    ...shadows.light,
  },
  deviceCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#34C759',
    backgroundColor: '#34C75915',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deviceList: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.sm,
    ...shadows.light,
    marginBottom: spacing.xl,
  },
  systemInfoCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.light,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    marginLeft: spacing.md,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  infoSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.xl,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  textInput: {
    backgroundColor: colors.card,
    height: 56,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    ...shadows.light,
  },
  typeList: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  typeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.sm,
    ...shadows.light,
  },
  typeOptionSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  typeOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  typeOptionTextSelected: {
    color: colors.primary,
  },
  saveButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.blue,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SystemScreen;
