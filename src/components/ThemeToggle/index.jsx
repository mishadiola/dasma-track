import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                <>
                    <Moon size={20} />
                    <span>Dark Mode</span>
                </>
            ) : (
                <>
                    <Sun size={20} />
                    <span>Light Mode</span>
                </>
            )}
        </button>
    );
};

export default ThemeToggle;
