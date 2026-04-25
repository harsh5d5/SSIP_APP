import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Spacing, Shadows } from '../theme';

const StatCard = ({ title, value, unit, icon: Icon, color, trend }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: `${color}15` }]}>
          <Icon size={20} color={color} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {unit ? <Text style={styles.unit}>{unit}</Text> : null}
      </View>
      <Text style={[styles.trend, { color: trend.includes('+') ? Colors.error : Colors.success }]}>
        {trend}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.md,
    flex: 1,
    ...Shadows.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconWrapper: {
    padding: Spacing.sm,
    borderRadius: 10,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Spacing.xs,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  unit: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  trend: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default StatCard;
