interface BeatVisualizerProps {
  beats: number;
  currentBeat: number;
  accentPattern: boolean[];
  isPlaying: boolean;
  onToggleAccent: (index: number) => void;
}

export function BeatVisualizer({
  beats,
  currentBeat,
  accentPattern,
  isPlaying,
  onToggleAccent,
}: BeatVisualizerProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-6" role="group" aria-label="Beat accent pattern">
      {Array.from({ length: beats }, (_, i) => {
        const isActive = isPlaying && currentBeat === i;
        const isAccent = accentPattern[i];

        return (
          <button
            key={i}
            type="button"
            onClick={() => onToggleAccent(i)}
            className={`
              relative flex items-center justify-center rounded-full transition-all duration-75
              ${isAccent ? 'w-14 h-14' : 'w-11 h-11'}
              ${isActive && isAccent
                ? 'bg-amber-400 shadow-lg shadow-amber-400/50 scale-110'
                : isActive
                  ? 'bg-sky-400 shadow-lg shadow-sky-400/50 scale-110'
                  : isAccent
                    ? 'bg-amber-600 hover:bg-amber-500'
                    : 'bg-gray-600 hover:bg-gray-500'
              }
            `}
            aria-label={`Beat ${i + 1}${isAccent ? ', accented' : ''}${isActive ? ', currently playing' : ''}`}
            aria-pressed={isAccent}
          >
            <span className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-white'}`}>
              {i + 1}
            </span>
            {isAccent && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-300 border border-amber-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}
