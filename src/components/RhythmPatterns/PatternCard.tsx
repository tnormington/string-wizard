import type { RhythmPattern } from '../../types/rhythm';
import { BeatNotation } from './BeatNotation';

interface PatternCardProps {
  pattern: RhythmPattern;
  isActive: boolean;
  isPlaying: boolean;
  currentBeat: number;
  onSelect: (pattern: RhythmPattern) => void;
  onTogglePlay: (pattern: RhythmPattern) => void;
}

const DIFFICULTY_STYLES = {
  beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const TYPE_LABELS = {
  strumming: 'Strumming',
  fingerpicking: 'Fingerpicking',
  hybrid: 'Hybrid',
};

export function PatternCard({
  pattern,
  isActive,
  isPlaying,
  currentBeat,
  onSelect,
  onTogglePlay,
}: PatternCardProps) {
  return (
    <div
      className={`
        rounded-xl border p-4 transition-all cursor-pointer
        ${isActive
          ? 'border-primary-500 bg-white dark:bg-gray-800/80 shadow-lg shadow-primary-500/10'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/40 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/60'
        }
      `}
      onClick={() => onSelect(pattern)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{pattern.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{pattern.description}</p>
        </div>

        {/* Play button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay(pattern);
          }}
          className={`
            flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
            transition-all focus:outline-none focus:ring-2 focus:ring-primary-400
            ${isActive && isPlaying
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white'
            }
          `}
          aria-label={isActive && isPlaying ? 'Stop playback' : 'Play pattern'}
        >
          {isActive && isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[pattern.difficulty]}`}>
          {pattern.difficulty}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
          {pattern.timeSignature}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600">
          {TYPE_LABELS[pattern.type]}
        </span>
        {pattern.genre.map(g => (
          <span key={g} className="text-xs px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
            {g}
          </span>
        ))}
      </div>

      {/* Text notation */}
      <div className="mb-3 px-3 py-2 bg-gray-100 dark:bg-gray-900/60 rounded-lg font-mono text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
        {pattern.notation}
      </div>

      {/* Visual beat notation (expanded when active) */}
      {isActive && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <BeatNotation
            beats={pattern.beats}
            currentBeat={currentBeat}
            isPlaying={isPlaying}
          />

          {/* BPM indicator */}
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
            <span>Suggested tempo: {pattern.bpm} BPM</span>
          </div>

          {/* Tips */}
          {pattern.tips && (
            <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-blue-300">
                <span className="font-semibold">Tip:</span> {pattern.tips}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
