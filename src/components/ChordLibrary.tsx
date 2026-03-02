import { useCallback, useState } from 'react';
import type { Chord, ChordCategory, ChordQuality, Difficulty, NoteName } from '../types/chord';
import {
  filterChords,
  getAvailableCategories,
  getAvailableQualities,
  getAvailableRoots,
  getCategoryLabel,
  getQualityLabel,
} from '../utils/chordUtils';
import { ChordDiagram } from './ChordDiagram';
import { ChordSuggestionPanel } from './ChordSuggestionPanel';

export function ChordLibrary() {
  const [search, setSearch] = useState('');
  const [selectedRoot, setSelectedRoot] = useState<NoteName | ''>('');
  const [selectedQuality, setSelectedQuality] = useState<ChordQuality | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<ChordCategory | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');
  const [selectedChordId, setSelectedChordId] = useState<string | null>(null);

  const roots = getAvailableRoots();
  const qualities = getAvailableQualities();
  const categories = getAvailableCategories();

  const filteredChords = filterChords({
    root: selectedRoot || undefined,
    quality: selectedQuality || undefined,
    category: selectedCategory || undefined,
    difficulty: selectedDifficulty || undefined,
    search: search || undefined,
  });

  const selectedChord = selectedChordId
    ? filteredChords.find((c) => c.id === selectedChordId) ?? null
    : null;

  const clearFilters = () => {
    setSearch('');
    setSelectedRoot('');
    setSelectedQuality('');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  const hasActiveFilters =
    search || selectedRoot || selectedQuality || selectedCategory || selectedDifficulty;

  const handleChordClick = useCallback((chord: Chord) => {
    setSelectedChordId((prev) => (prev === chord.id ? null : chord.id));
  }, []);

  const handleSuggestionSelect = useCallback((chord: Chord) => {
    setSelectedChordId(chord.id);
  }, []);

  const handlePanelClose = useCallback(() => {
    setSelectedChordId(null);
  }, []);

  const selectClass =
    'flex-1 min-w-0 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <section aria-label="Chord Library" className="space-y-4 sm:space-y-6">
      {/* Search */}
      <div role="search">
        <label htmlFor="chord-search" className="sr-only">Search chords</label>
        <input
          id="chord-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chords (e.g., Am, G7, major)..."
          className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters - grid layout for mobile */}
      <fieldset className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
        <legend className="sr-only">Filter chords</legend>
        <label htmlFor="filter-root" className="sr-only">Filter by root note</label>
        <select
          id="filter-root"
          value={selectedRoot}
          onChange={(e) => setSelectedRoot(e.target.value as NoteName | '')}
          className={selectClass}
        >
          <option value="">All Roots</option>
          {roots.map((root) => (
            <option key={root} value={root}>
              {root}
            </option>
          ))}
        </select>

        <label htmlFor="filter-quality" className="sr-only">Filter by chord type</label>
        <select
          id="filter-quality"
          value={selectedQuality}
          onChange={(e) => setSelectedQuality(e.target.value as ChordQuality | '')}
          className={selectClass}
        >
          <option value="">All Types</option>
          {qualities.map((q) => (
            <option key={q} value={q}>
              {getQualityLabel(q)}
            </option>
          ))}
        </select>

        <label htmlFor="filter-category" className="sr-only">Filter by category</label>
        <select
          id="filter-category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ChordCategory | '')}
          className={selectClass}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {getCategoryLabel(cat)}
            </option>
          ))}
        </select>

        <label htmlFor="filter-difficulty" className="sr-only">Filter by difficulty level</label>
        <select
          id="filter-difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | '')}
          className={selectClass}
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="col-span-2 sm:col-span-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </fieldset>

      {/* Results count */}
      <p className="text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        Showing {filteredChords.length} chord{filteredChords.length !== 1 ? 's' : ''}
      </p>

      {/* Chord grid with inline suggestion panel */}
      {filteredChords.length > 0 ? (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
          role="list"
          aria-label="Chord diagrams"
        >
          {filteredChords.map((chord) => (
            <ChordCard
              key={chord.id}
              chord={chord}
              isSelected={chord.id === selectedChordId}
              onClick={handleChordClick}
              selectedChord={selectedChord}
              onSuggestionSelect={handleSuggestionSelect}
              onPanelClose={handlePanelClose}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500" role="status">
          <p className="text-lg">No chords found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </section>
  );
}

/**
 * Individual chord card that also renders the suggestion panel
 * after the last item in its grid row when selected.
 */
function ChordCard({
  chord,
  isSelected,
  onClick,
  selectedChord,
  onSuggestionSelect,
  onPanelClose,
}: {
  chord: Chord;
  isSelected: boolean;
  onClick: (chord: Chord) => void;
  selectedChord: Chord | null;
  onSuggestionSelect: (chord: Chord) => void;
  onPanelClose: () => void;
}) {

  return (
    <>
      <button
        role="listitem"
        aria-label={`${chord.name} chord, ${chord.difficulty} difficulty. Click to see progression suggestions.`}
        aria-expanded={isSelected}
        onClick={() => onClick(chord)}
        className={`bg-gray-100 dark:bg-gray-800 rounded-lg p-2 sm:p-3 border-2 transition-all flex flex-col items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900 ${
          isSelected
            ? 'border-blue-500 shadow-lg shadow-blue-500/20'
            : 'border-transparent hover:border-blue-300 dark:hover:border-blue-700'
        }`}
      >
        <ChordDiagram
          voicing={chord.voicings[0]}
          name={chord.name}
          symbol={chord.symbol}
        />
        <div className="mt-2 flex flex-wrap gap-1 justify-center">
          <span className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-[10px] text-gray-600 dark:text-gray-300">
            {chord.difficulty}
          </span>
          <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/50 rounded text-[10px] text-blue-600 dark:text-blue-300">
            {getCategoryLabel(chord.category)}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-gray-500 text-center">
          {chord.notes.join(' - ')}
        </p>
      </button>
      {isSelected && selectedChord && (
        <ChordSuggestionPanel
          key={selectedChord.id}
          chord={selectedChord}
          onSelectChord={onSuggestionSelect}
          onClose={onPanelClose}
        />
      )}
    </>
  );
}
