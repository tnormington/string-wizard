import { useState, useEffect, useCallback, createContext, useContext } from 'react';

export interface AccessibilitySettings {
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
}

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

const STORAGE_KEY = 'guitar-app-accessibility';

function getInitialSettings(): AccessibilitySettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }

  return {
    highContrast: window.matchMedia('(prefers-contrast: more)').matches,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    largeText: false,
  };
}

export const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function useAccessibilityProvider(): AccessibilityContextValue {
  const [settings, setSettings] = useState<AccessibilitySettings>(getInitialSettings);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Apply CSS classes to document root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('high-contrast', settings.highContrast);
    root.classList.toggle('reduced-motion', settings.reducedMotion);
    root.classList.toggle('large-text', settings.largeText);
  }, [settings]);

  // Listen for OS preference changes
  useEffect(() => {
    const contrastMq = window.matchMedia('(prefers-contrast: more)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleContrast = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, highContrast: e.matches }));
    };
    const handleMotion = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, reducedMotion: e.matches }));
    };

    contrastMq.addEventListener('change', handleContrast);
    motionMq.addEventListener('change', handleMotion);
    return () => {
      contrastMq.removeEventListener('change', handleContrast);
      motionMq.removeEventListener('change', handleMotion);
    };
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  }, []);

  const toggleLargeText = useCallback(() => {
    setSettings(prev => ({ ...prev, largeText: !prev.largeText }));
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const el = document.getElementById(`aria-live-${priority}`);
    if (el) {
      el.textContent = '';
      // Force DOM reflow so screen readers pick up the change
      void el.offsetHeight;
      el.textContent = message;
    }
  }, []);

  return { settings, toggleHighContrast, toggleReducedMotion, toggleLargeText, announce };
}

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
