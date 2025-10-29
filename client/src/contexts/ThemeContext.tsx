import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'enterprise';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

const themes = {
  light: {
    primary: 'rgb(59, 130, 246)', // blue-500
    secondary: 'rgb(107, 114, 128)', // gray-500
    accent: 'rgb(16, 185, 129)', // emerald-500
    background: 'rgb(255, 255, 255)', // white
    surface: 'rgb(249, 250, 251)', // gray-50
    text: 'rgb(17, 24, 39)', // gray-900
    textMuted: 'rgb(107, 114, 128)', // gray-500
    border: 'rgb(229, 231, 235)', // gray-200
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    primary: 'rgb(96, 165, 250)', // blue-400
    secondary: 'rgb(156, 163, 175)', // gray-400
    accent: 'rgb(52, 211, 153)', // emerald-400
    background: 'rgb(17, 24, 39)', // gray-900
    surface: 'rgb(31, 41, 55)', // gray-800
    text: 'rgb(243, 244, 246)', // gray-100
    textMuted: 'rgb(156, 163, 175)', // gray-400
    border: 'rgb(75, 85, 99)', // gray-600
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
  enterprise: {
    primary: 'rgb(79, 70, 229)', // indigo-600
    secondary: 'rgb(55, 65, 81)', // gray-700
    accent: 'rgb(245, 158, 11)', // amber-500 (Renault yellow accent)
    background: 'linear-gradient(135deg, rgb(15, 23, 42) 0%, rgb(30, 41, 59) 100%)', // slate gradient
    surface: 'rgba(30, 41, 59, 0.8)', // slate-800 with transparency
    text: 'rgb(248, 250, 252)', // slate-50
    textMuted: 'rgb(148, 163, 184)', // slate-400
    border: 'rgb(71, 85, 105)', // slate-600
    shadow: 'rgba(0, 0, 0, 0.4)',
  }
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('enterprise'); // Default to enterprise theme

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme to document root
    const root = document.documentElement;
    const currentTheme = themes[theme];
    
    // Set CSS custom properties
    Object.entries(currentTheme).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Add theme class to body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
    
    // Special handling for enterprise theme
    if (theme === 'enterprise') {
      root.style.setProperty('--background-gradient', currentTheme.background);
      document.body.style.background = currentTheme.background;
    } else {
      document.body.style.background = currentTheme.background;
    }
  }, [theme]);

  const toggleTheme = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'enterprise'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// CSS-in-JS theme styles for components
export const getThemeStyles = (theme: Theme) => {
  const currentTheme = themes[theme];
  
  return {
    card: {
      backgroundColor: theme === 'enterprise' ? 'rgba(30, 41, 59, 0.9)' : currentTheme.surface,
      borderColor: currentTheme.border,
      color: currentTheme.text,
      backdropFilter: theme === 'enterprise' ? 'blur(10px)' : 'none',
      boxShadow: `0 4px 6px -1px ${currentTheme.shadow}`,
    },
    button: {
      primary: {
        backgroundColor: currentTheme.primary,
        color: 'white',
        boxShadow: `0 2px 4px ${currentTheme.shadow}`,
      },
      secondary: {
        backgroundColor: 'transparent',
        color: currentTheme.text,
        borderColor: currentTheme.border,
      }
    },
    badge: {
      backgroundColor: currentTheme.accent,
      color: theme === 'light' ? 'white' : 'black',
    },
    gradient: {
      primary: theme === 'enterprise' 
        ? 'linear-gradient(135deg, rgb(79, 70, 229) 0%, rgb(124, 58, 237) 100%)'
        : `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.accent} 100%)`,
      surface: theme === 'enterprise'
        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)'
        : `linear-gradient(135deg, ${currentTheme.surface} 0%, ${currentTheme.background} 100%)`,
    }
  };
};