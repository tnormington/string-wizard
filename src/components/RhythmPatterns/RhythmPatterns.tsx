import { useState, useMemo, useCallback } from 'react';
import type { RhythmPattern, Difficulty, Genre, PatternType, TimeSignature } from '../../types/rhythm';
import { rhythmPatterns } from '../../data/rhythmPatterns';
import { useRhythmPlayer } from '../../hooks/useRhythmPlayer';
import { PatternCard } from './PatternCard';

const ALL_GENRES: Genre[] = ['rock', 'pop', 'folk', 'country', 'blues', 'reggae', 'funk', 'latin'];
const ALL_DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];
const ALL_TYPES: PatternType[] = ['strumming', 'fingerpicking', 'hybrid'];
const ALL_TIME_SIGS: TimeSignature[] = ['4/4', '3/4', '6/8'];

export function RhythmPatterns() {
  const [selectedPattern, setSelectedPattern] = useState<RhythmPattern | null>(null);
  const [filterGenre, setFilterGenre] = useState<Genre | ''>('');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | ''>('');
  const [filterType, setFilterType] = useState<PatternType | ''>('');
  const [filterTimeSig, setFilterTimeSig] = useState<TimeSignature | ''>('');
  const [searchQuery, setSearchQuery] = useState('');

  const player = useRhythmPlayer();

  const filteredPatterns = useMemo(() => {
    return rhythmPatterns.filter(p => {
      if (filterGenre && !p.genre.includes(filterGenre)) return false;
      if (filterDifficulty && p.difficulty !== filterDifficulty) return false;
      if (filterType && p.type !== filterType) return false;
      if (filterTimeSig && p.timeSignature !== filterTimeSig) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filterGenre, filterDifficulty, filterType, filterTimeSig, searchQuery]);

  const handleSelect = useCallback((pattern: RhythmPattern) => {
    if (selectedPattern?.id === pattern.id) {
      setSelectedPattern(null);
      player.stop();
    } else {
      setSelectedPattern(pattern);
      player.stop();
    }
  }, [selectedPattern, player]);

  const handleTogglePlay = useCallback((pattern: RhythmPattern) => {
    if (selectedPattern?.id !== pattern.id) {
      setSelectedPattern(pattern);
    }
    player.toggle(pattern);
  }, [selectedPattern, player]);

  const clearFilters = () => {
    setFilterGenre('');
    setFilterDifficulty('');
    setFilterType('');
    setFilterTimeSig('');
    setSearchQuery('');
  };

  const hasActiveFilters = filterGenre || filterDifficulty || filterType || filterTimeSig || searchQuery;

  return (
    <section aria-label="Rhythm Patterns" className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Rhythm Patterns</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm sm:text-base">
          Browse and practice common strumming and picking patterns with visual notation and audio playback.
        </p>
      </div>

      {/* Playback controls */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700" role="group" aria-label="Playback controls">
        {/* BPM control */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <label htmlFor="bpm-slider" className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            BPM
          </label>
          <input
            id="bpm-slider"
            type="range"
            min={40}
            max={200}
            value={player.bpm}
            onChange={(e) => {
              player.setBpm(Number(e.target.value));
              if (player.isPlaying && selectedPattern) {
                player.stop();
                setTimeout(() => player.play(selectedPattern), 50);
              }
            }}
            className="flex-1 min-w-[60px] accent-primary-500"
          />
          <span className="text-sm font-mono text-gray-900 dark:text-white w-10 text-right">{player.bpm}</span>
        </div>

        {/* Metronome toggle */}
        <button
          onClick={() => player.setWithMetronome(!player.withMetronome)}
          aria-pressed={player.withMetronome}
          aria-label={`Metronome ${player.withMetronome ? 'on' : 'off'}`}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors
            ${player.withMetronome
              ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
              : 'bg-gray-200 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600'
            }
          `}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Metronome
        </button>

        {/* Stop button */}
        {player.isPlaying && (
          <button
            onClick={player.stop}
            aria-label="Stop playback"
            className="px-3 py-1.5 rounded-lg text-sm bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors"
          >
            Stop
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Search */}
        <div className="relative" role="search">
          <label htmlFor="rhythm-search" className="sr-only">Search rhythm patterns</label>
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="rhythm-search"
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filter pills - grid on mobile */}
        <fieldset className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          <legend className="sr-only">Filter rhythm patterns</legend>
          {/* Genre filter */}
          <label htmlFor="rhythm-filter-genre" className="sr-only">Filter by genre</label>
          <select
            id="rhythm-filter-genre"
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value as Genre | '')}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Genres</option>
            {ALL_GENRES.map(g => (
              <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
            ))}
          </select>

          {/* Difficulty filter */}
          <label htmlFor="rhythm-filter-difficulty" className="sr-only">Filter by difficulty</label>
          <select
            id="rhythm-filter-difficulty"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value as Difficulty | '')}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Levels</option>
            {ALL_DIFFICULTIES.map(d => (
              <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
            ))}
          </select>

          {/* Type filter */}
          <label htmlFor="rhythm-filter-type" className="sr-only">Filter by type</label>
          <select
            id="rhythm-filter-type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as PatternType | '')}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Types</option>
            {ALL_TYPES.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>

          {/* Time signature filter */}
          <label htmlFor="rhythm-filter-timesig" className="sr-only">Filter by time signature</label>
          <select
            id="rhythm-filter-timesig"
            value={filterTimeSig}
            onChange={(e) => setFilterTimeSig(e.target.value as TimeSignature | '')}
            className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Time Sigs</option>
            {ALL_TIME_SIGS.map(ts => (
              <option key={ts} value={ts}>{ts}</option>
            ))}
          </select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="col-span-2 sm:col-span-1 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Clear filters
            </button>
          )}
        </fieldset>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500" aria-live="polite">
        {filteredPatterns.length} pattern{filteredPatterns.length !== 1 ? 's' : ''} found
      </p>

      {/* Pattern list */}
      <div className="grid gap-4">
        {filteredPatterns.map(pattern => (
          <PatternCard
            key={pattern.id}
            pattern={pattern}
            isActive={selectedPattern?.id === pattern.id}
            isPlaying={player.isPlaying && selectedPattern?.id === pattern.id}
            currentBeat={player.currentBeat}
            onSelect={handleSelect}
            onTogglePlay={handleTogglePlay}
          />
        ))}

        {filteredPatterns.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No patterns match your filters</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-primary-400 hover:text-primary-300 text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
