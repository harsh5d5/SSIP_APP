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
import { Colors, Spacing, Shadows } from '../theme';

const SystemScreen = () => {
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

  const handleAddDevice = () => {
    if (newDeviceName.trim() === '') return;
    
    const newDevice = {
      id: Date.now().toString(),
      name: newDeviceName,
      detail: selectedType,
      icon: Zap, // Default icon for new devices
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
            <Plus size={18} color={Colors.primary} />
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
          <AutomationItem 
            title="Door Unlocked" 
            subtitle="Notify on phone" 
            icon={Smartphone} 
            active={true} 
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
            <Plus size={18} color={Colors.primary} />
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
          <View style={styles.infoIconBg}>
            <Cpu size={24} color={Colors.primary} />
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
                <X size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Device Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Living Room RGB Strip"
              value={newDeviceName}
              onChangeText={setNewDeviceName}
              placeholderTextColor={Colors.textSecondary}
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
                  {selectedType === type && <CheckCircle2 size={20} color={Colors.primary} />}
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


const AutomationItem = ({ title, subtitle, icon: Icon, active }) => (
  <View style={styles.autoItem}>
    <View style={[styles.autoIconBg, { backgroundColor: active ? `${Colors.primary}15` : '#F2F2F7' }]}>
      <Icon size={20} color={active ? Colors.primary : Colors.textSecondary} />
    </View>
    <View style={styles.autoTextWrapper}>
      <Text style={styles.autoTitle}>{title}</Text>
      <Text style={styles.autoSubtitle}>{subtitle}</Text>
    </View>
    <Switch 
      value={active}
      trackColor={{ false: Colors.gray, true: `${Colors.primary}50` }}
      thumbColor={active ? Colors.primary : Colors.white}
    />
  </View>
);

const DeviceItem = ({ name, detail, icon: Icon, status }) => (
  <View style={styles.deviceItem}>
    <View style={styles.deviceIconBg}>
      <Icon size={20} color={Colors.textPrimary} />
    </View>
    <View style={styles.deviceTextWrapper}>
      <Text style={styles.deviceName}>{name}</Text>
      <Text style={styles.deviceDetail}>{detail}</Text>
    </View>
    <View style={styles.statusRow}>
      <View style={[styles.statusDot, { backgroundColor: status === 'Online' ? Colors.success : Colors.error }]} />
      <Text style={[styles.statusLabel, { color: status === 'Online' ? Colors.success : Colors.error }]}>{status}</Text>
      <ChevronRight size={16} color={Colors.textSecondary} />
    </View>
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
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.light,
  },
  automationList: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.sm,
    ...Shadows.light,
  },
  autoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  autoIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoTextWrapper: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  autoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  autoSubtitle: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  deviceCount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.success,
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deviceList: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.sm,
    ...Shadows.light,
    marginBottom: Spacing.xl,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  deviceIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceTextWrapper: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  deviceDetail: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  systemInfoCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.light,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    marginLeft: Spacing.md,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  infoSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.xl,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  textInput: {
    backgroundColor: Colors.white,
    height: 56,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
    ...Shadows.light,
  },
  typeList: {
    flex: 1,
    marginBottom: Spacing.xl,
  },
  typeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.sm,
    ...Shadows.light,
  },
  typeOptionSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  typeOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  typeOptionTextSelected: {
    color: Colors.primary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SystemScreen;
