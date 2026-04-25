import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { Thermometer, Droplets } from 'lucide-react-native';
import { Colors, Spacing, Shadows } from '../theme';

const RoomCard = ({ name, devices, temp, humidity, icon: Icon, isActive }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrapper, { backgroundColor: isActive ? `${Colors.primary}15` : Colors.background }]}>
          <Icon size={24} color={isActive ? Colors.primary : Colors.textSecondary} />
        </View>
        <Switch
          value={isActive}
          onValueChange={() => {}}
          trackColor={{ false: Colors.gray, true: `${Colors.primary}50` }}
          thumbColor={isActive ? Colors.primary : Colors.white}
        />
      </View>
      
      <View style={styles.middleRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.devices}>{devices}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.infoItem}>
          <Thermometer size={14} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{temp}</Text>
        </View>
        <View style={styles.infoItem}>
          <Droplets size={14} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{humidity}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: Spacing.md,
    width: '48%',
    height: 160,
    justifyContent: 'space-between',
    ...Shadows.light,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: Spacing.sm,
    borderRadius: 12,
  },
  middleRow: {
    marginTop: Spacing.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  devices: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
});

export default RoomCard;
