import { useEffect, useRef } from 'react';
import type { Chord } from '../types/chord';
import { getChordSuggestions, type ChordSuggestion } from '../utils/chordProgressionUtils';
import { ChordDiagram } from './ChordDiagram';

interface ChordSuggestionPanelProps {
  chord: Chord;
  onSelectChord: (chord: Chord) => void;
  onClose: () => void;
}

const GROUP_ORDER = ['Strong resolution', 'Common alternatives', 'Color chords'] as const;

function groupSuggestions(suggestions: ChordSuggestion[]): Map<string, ChordSuggestion[]> {
  const groups = new Map<string, ChordSuggestion[]>();
  for (const group of GROUP_ORDER) {
    const items = suggestions.filter((s) => s.group === group);
    if (items.length > 0) {
      groups.set(group, items);
    }
  }
  return groups;
}

export function ChordSuggestionPanel({ chord, onSelectChord, onClose }: ChordSuggestionPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const suggestions = getChordSuggestions(chord);
  const grouped = groupSuggestions(suggestions);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Scroll panel into view when it opens
  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  if (suggestions.length === 0) {
    return (
      <div
        ref={panelRef}
        role="region"
        aria-label={`No suggestions available for ${chord.name}`}
        className="col-span-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-panel-expand"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Suggestions for {chord.symbol}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close suggestions panel"
          >
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No progression suggestions available for this chord.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      role="region"
      aria-label={`Chord progression suggestions for ${chord.name}`}
      className="col-span-full bg-gray-100 dark:bg-gray-800 border-2 border-blue-500/40 rounded-lg p-3 sm:p-4 animate-panel-expand"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            What comes after {chord.symbol}?
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Click a chord to see its suggestions
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close suggestions panel"
        >
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* All suggestions in a single grid */}
      <div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"
        role="list"
        aria-label="Chord suggestions"
      >
        {Array.from(grouped.entries()).flatMap(([groupName, items]) =>
          items.map((suggestion) => (
            <button
              key={suggestion.chord.id}
              role="listitem"
              onClick={() => onSelectChord(suggestion.chord)}
              className="min-w-0 bg-white dark:bg-gray-900 rounded-lg p-1.5 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800"
              aria-label={`Select ${suggestion.chord.name}: ${suggestion.relationship} (${groupName})`}
            >
              <ChordDiagram
                voicing={suggestion.chord.voicings[0]}
                name={suggestion.chord.name}
                symbol={suggestion.chord.symbol}
                width={90}
              />
              <span className="mt-0.5 text-[9px] text-blue-600 dark:text-blue-400 text-center leading-tight">
                {suggestion.relationship}
              </span>
              <span className="mt-0.5 text-[8px] text-gray-400 dark:text-gray-500 text-center leading-tight">
                {groupName}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
