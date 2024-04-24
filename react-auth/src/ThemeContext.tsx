import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface ThemeContextData {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextData>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const fetchUserTheme = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you have the user's token stored in localStorage
        const response = await axios.get('/api/user/theme', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userTheme = response.data.theme;
        setTheme(userTheme);
      } catch (error) {
        console.error('Error fetching user theme:', error);
      }
    };

    fetchUserTheme();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};