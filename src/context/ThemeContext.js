import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    isDarkMode,
    colors: isDarkMode ? {
      primary: '#0A84FF', // Brighter Blue for Dark Mode
      accent: '#5AC8FA',
      background: '#000000', // Pure Black
      card: '#1C1C1E', // Dark Gray Card
      textPrimary: '#FFFFFF',
      textSecondary: '#AEAEB2',
      border: 'rgba(255,255,255,0.1)',
      white: '#FFFFFF',
      gray: '#3A3A3C',
      glass: 'rgba(28,28,30,0.8)',
    } : {
      primary: '#007AFF', // Premium Blue
      accent: '#5AC8FA',
      background: '#F2F2F7', // iOS Light Gray
      card: '#FFFFFF',
      textPrimary: '#1C1C1E',
      textSecondary: '#8E8E93',
      border: 'rgba(0,0,0,0.05)',
      white: '#FFFFFF',
      gray: '#E5E5EA',
      glass: 'rgba(255,255,255,0.8)',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    shadows: isDarkMode ? {
      light: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 2,
      },
      blue: {
        shadowColor: '#0A84FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
      }
    } : {
      light: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      },
      blue: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
