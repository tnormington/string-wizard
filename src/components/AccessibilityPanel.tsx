import { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../hooks/useAccessibility';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { settings, toggleHighContrast, toggleReducedMotion, toggleLargeText, toggleLeftHanded } = useAccessibility();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Focus first toggle when opened
  useEffect(() => {
    if (isOpen) {
      const firstToggle = panelRef.current?.querySelector<HTMLButtonElement>('[role="switch"]');
      firstToggle?.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-colors bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 4a1 1 0 100-2 1 1 0 000 2zm0 0v2m-4 2l4-2 4 2m-8 0v6l4 6m0 0l4-6V8" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50"
          role="dialog"
          aria-label="Accessibility settings"
        >
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Accessibility
          </h3>
          <div className="space-y-3">
            <ToggleOption
              label="High Contrast"
              description="Increase color contrast for better visibility"
              checked={settings.highContrast}
              onToggle={toggleHighContrast}
            />
            <ToggleOption
              label="Reduced Motion"
              description="Minimize animations and transitions"
              checked={settings.reducedMotion}
              onToggle={toggleReducedMotion}
            />
            <ToggleOption
              label="Large Text"
              description="Increase text size throughout the app"
              checked={settings.largeText}
              onToggle={toggleLargeText}
            />
            <ToggleOption
              label="Left-Handed"
              description="Mirror diagrams for left-handed players"
              checked={settings.leftHanded}
              onToggle={toggleLeftHanded}
            />
          </div>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Settings are saved automatically.
          </p>
        </div>
      )}
    </div>
  );
}

function ToggleOption({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <span className="text-sm font-medium text-gray-900 dark:text-white" id={`a11y-${label.replace(/\s/g, '-').toLowerCase()}`}>
          {label}
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-labelledby={`a11y-${label.replace(/\s/g, '-').toLowerCase()}`}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-800 ${
          checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
