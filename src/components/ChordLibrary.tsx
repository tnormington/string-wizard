import { useState } from 'react';
import type { ChordCategory, ChordQuality, Difficulty, NoteName } from '../types/chord';
import {
  filterChords,
  getAvailableCategories,
  getAvailableQualities,
  getAvailableRoots,
  getCategoryLabel,
  getQualityLabel,
} from '../utils/chordUtils';
import { ChordDiagram } from './ChordDiagram';

export function ChordLibrary() {
  const [search, setSearch] = useState('');
  const [selectedRoot, setSelectedRoot] = useState<NoteName | ''>('');
  const [selectedQuality, setSelectedQuality] = useState<ChordQuality | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<ChordCategory | ''>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | ''>('');

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

  const clearFilters = () => {
    setSearch('');
    setSelectedRoot('');
    setSelectedQuality('');
    setSelectedCategory('');
    setSelectedDifficulty('');
  };

  const hasActiveFilters =
    search || selectedRoot || selectedQuality || selectedCategory || selectedDifficulty;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chords (e.g., Am, G7, major)..."
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedRoot}
          onChange={(e) => setSelectedRoot(e.target.value as NoteName | '')}
          className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Roots</option>
          {roots.map((root) => (
            <option key={root} value={root}>
              {root}
            </option>
          ))}
        </select>

        <select
          value={selectedQuality}
          onChange={(e) => setSelectedQuality(e.target.value as ChordQuality | '')}
          className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {qualities.map((q) => (
            <option key={q} value={q}>
              {getQualityLabel(q)}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ChordCategory | '')}
          className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {getCategoryLabel(cat)}
            </option>
          ))}
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | '')}
          className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md text-sm text-gray-300 transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-400">
        Showing {filteredChords.length} chord{filteredChords.length !== 1 ? 's' : ''}
      </p>

      {/* Chord grid */}
      {filteredChords.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredChords.map((chord) => (
            <div
              key={chord.id}
              className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-blue-500 transition-colors flex flex-col items-center"
            >
              <ChordDiagram
                voicing={chord.voicings[0]}
                name={chord.name}
                symbol={chord.symbol}
              />
              <div className="mt-2 flex flex-wrap gap-1 justify-center">
                <span className="px-1.5 py-0.5 bg-gray-700 rounded text-[10px] text-gray-300">
                  {chord.difficulty}
                </span>
                <span className="px-1.5 py-0.5 bg-blue-900/50 rounded text-[10px] text-blue-300">
                  {getCategoryLabel(chord.category)}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-gray-500 text-center">
                {chord.notes.join(' - ')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No chords found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
