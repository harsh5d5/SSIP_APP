import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Zap, Shield, Settings2, Cpu } from 'lucide-react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ControlsScreen from './src/screens/ControlsScreen';
import SecurityScreen from './src/screens/SecurityScreen';
import EnergyScreen from './src/screens/EnergyScreen';
import SystemScreen from './src/screens/SystemScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') return <Home size={size} color={color} />;
          if (route.name === 'Controls') return <Settings2 size={size} color={color} />;
          if (route.name === 'Security') return <Shield size={size} color={color} />;
          if (route.name === 'Energy') return <Zap size={size} color={color} />;
          if (route.name === 'System') return <Cpu size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 65,
          paddingBottom: 10,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Controls" component={ControlsScreen} />
      <Tab.Screen name="Security" component={SecurityScreen} />
      <Tab.Screen name="Energy" component={EnergyScreen} />
      <Tab.Screen name="System" component={SystemScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { colors } = useTheme();

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
