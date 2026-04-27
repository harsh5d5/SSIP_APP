import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { Thermometer, Droplets } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const RoomCard = ({ name, devices, temp, humidity, icon: Icon, isActive }) => {
  const { colors, shadows, spacing } = useTheme();
  const styles = createStyles(colors, shadows, spacing);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrapper, { backgroundColor: isActive ? `${colors.primary}15` : colors.background }]}>
          <Icon size={24} color={isActive ? colors.primary : colors.textSecondary} />
        </View>
        <Switch
          value={isActive}
          onValueChange={() => {}}
          trackColor={{ false: colors.gray, true: `${colors.primary}50` }}
          thumbColor={isActive ? colors.primary : colors.white}
        />
      </View>
      
      <View style={styles.middleRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.devices}>{devices}</Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.infoItem}>
          <Thermometer size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>{temp}</Text>
        </View>
        <View style={styles.infoItem}>
          <Droplets size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>{humidity}</Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (colors, shadows, spacing) => StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.md,
    width: '48%',
    height: 160,
    justifyContent: 'space-between',
    ...shadows.light,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: spacing.sm,
    borderRadius: 12,
  },
  middleRow: {
    marginTop: spacing.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  devices: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});

export default RoomCard;
