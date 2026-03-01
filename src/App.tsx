import { useState, useEffect } from 'react'
import { ChordLibrary } from './components/ChordLibrary'
import { FretboardTrainer } from './components/FretboardTrainer'
import { ScaleLibrary } from './components/ScaleLibrary'
import { RhythmPatterns } from './components/RhythmPatterns'
import { IntervalTrainer } from './components/IntervalTrainer'
import { Metronome } from './components/Metronome'
import { ThemeToggle } from './components/ThemeToggle'
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp'
import { useTheme } from './hooks/useTheme'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { type ShortcutCommand } from './types/shortcuts'

type AppView = 'chords' | 'trainer' | 'scales' | 'rhythm' | 'intervals' | 'metronome';

const NAV_ITEMS: { key: AppView; label: string; shortcutKey: string }[] = [
  { key: 'chords', label: 'Chord Library', shortcutKey: '1' },
  { key: 'trainer', label: 'Fretboard Trainer', shortcutKey: '2' },
  { key: 'scales', label: 'Scale Reference', shortcutKey: '3' },
  { key: 'rhythm', label: 'Rhythm Patterns', shortcutKey: '4' },
  { key: 'intervals', label: 'Interval Trainer', shortcutKey: '5' },
  { key: 'metronome', label: 'Metronome', shortcutKey: '6' },
];

/** All registered shortcut commands (for the help overlay) */
const SHORTCUT_COMMANDS: ShortcutCommand[] = [
  // Navigation
  ...NAV_ITEMS.map((item) => ({
    id: `nav-${item.key}`,
    label: item.label,
    description: `Go to ${item.label}`,
    category: 'navigation' as const,
    binding: { key: item.shortcutKey },
  })),
  { id: 'nav-prev', label: 'Previous tab', description: 'Previous tab', category: 'navigation', binding: { key: 'ArrowLeft', modifiers: ['alt'] } },
  { id: 'nav-next', label: 'Next tab', description: 'Next tab', category: 'navigation', binding: { key: 'ArrowRight', modifiers: ['alt'] } },
  // General
  { id: 'toggle-theme', label: 'Toggle theme', description: 'Toggle dark/light mode', category: 'general', binding: { key: 'd', modifiers: ['shift'] } },
  { id: 'show-help', label: 'Show shortcuts', description: 'Show keyboard shortcuts', category: 'general', binding: { key: '?' } },
];

function App() {
  const [view, setView] = useState<AppView>('chords');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const register = useKeyboardShortcuts();

  const handleNavClick = (key: AppView) => {
    setView(key);
    setMobileMenuOpen(false);
  };

  // Register global keyboard shortcuts
  useEffect(() => {
    const unregisterFns: (() => void)[] = [];

    // Number keys 1-6 for nav
    for (const item of NAV_ITEMS) {
      unregisterFns.push(
        register({ key: item.shortcutKey }, () => setView(item.key)),
      );
    }

    // Alt+Left / Alt+Right to cycle tabs
    unregisterFns.push(
      register({ key: 'ArrowLeft', modifiers: ['alt'] }, () => {
        setView((prev) => {
          const idx = NAV_ITEMS.findIndex((n) => n.key === prev);
          return NAV_ITEMS[(idx - 1 + NAV_ITEMS.length) % NAV_ITEMS.length].key;
        });
      }),
    );
    unregisterFns.push(
      register({ key: 'ArrowRight', modifiers: ['alt'] }, () => {
        setView((prev) => {
          const idx = NAV_ITEMS.findIndex((n) => n.key === prev);
          return NAV_ITEMS[(idx + 1) % NAV_ITEMS.length].key;
        });
      }),
    );

    // Shift+D to toggle theme
    unregisterFns.push(
      register({ key: 'D', modifiers: ['shift'] }, toggleTheme),
    );

    // ? to show help
    unregisterFns.push(
      register({ key: '?' }, () => setShowHelp((prev) => !prev)),
    );

    return () => unregisterFns.forEach((fn) => fn());
  }, [register, toggleTheme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-bold truncate">Guitar Chords App</h1>
            <div className="flex items-center gap-2">
              {/* Desktop nav */}
              <nav className="hidden lg:flex gap-1">
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    title={`${item.label} (${item.shortcutKey})`}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                      view === item.key
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              {/* Shortcuts help button */}
              <button
                onClick={() => setShowHelp(true)}
                title="Keyboard shortcuts (?)"
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Show keyboard shortcuts"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01" />
                </svg>
              </button>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              {/* Mobile/tablet hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile/tablet nav dropdown */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-3 pb-1 flex flex-col gap-1 border-t border-gray-200 dark:border-gray-700 pt-3">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    view === item.key
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="ml-2 text-xs opacity-50">{item.shortcutKey}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>
      <main className="container mx-auto px-3 sm:px-4 py-4 max-w-6xl">
        {view === 'chords' && <ChordLibrary />}
        {view === 'trainer' && <FretboardTrainer />}
        {view === 'scales' && <ScaleLibrary />}
        {view === 'rhythm' && <RhythmPatterns />}
        {view === 'intervals' && <IntervalTrainer />}
        {view === 'metronome' && <Metronome />}
      </main>

      {/* Keyboard shortcuts help overlay */}
      {showHelp && (
        <KeyboardShortcutsHelp
          shortcuts={SHORTCUT_COMMANDS}
          onClose={() => setShowHelp(false)}
        />
      )}
    </div>
  )
}

export default App
