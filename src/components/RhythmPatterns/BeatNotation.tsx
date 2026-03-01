import type { Beat, StrokeType } from '../../types/rhythm';

interface BeatNotationProps {
  beats: Beat[];
  currentBeat: number;
  isPlaying: boolean;
}

const STROKE_SYMBOLS: Record<StrokeType, { symbol: string; label: string; color: string }> = {
  'down':       { symbol: '↓', label: 'Down',       color: 'text-blue-400' },
  'up':         { symbol: '↑', label: 'Up',         color: 'text-green-400' },
  'mute':       { symbol: '✕', label: 'Mute',       color: 'text-yellow-400' },
  'rest':       { symbol: '·', label: 'Rest',        color: 'text-gray-500' },
  'accent-down': { symbol: '⬇', label: 'Accent Down', color: 'text-blue-300' },
  'accent-up':   { symbol: '⬆', label: 'Accent Up',   color: 'text-green-300' },
};

function getBeatWidth(duration: number): string {
  if (duration >= 1) return 'min-w-[3.5rem]';
  if (duration >= 0.5) return 'min-w-[2.5rem]';
  return 'min-w-[1.75rem]';
}

export function BeatNotation({ beats, currentBeat, isPlaying }: BeatNotationProps) {
  return (
    <div className="space-y-3">
      {/* Beat notation display */}
      <div className="flex items-end gap-0.5 overflow-x-auto pb-2">
        {beats.map((beat, index) => {
          const stroke = STROKE_SYMBOLS[beat.stroke];
          const isActive = isPlaying && currentBeat === index;
          const isAccent = beat.stroke.startsWith('accent');
          const isDownbeat = beat.isDownbeat;

          return (
            <div
              key={index}
              className={`
                flex flex-col items-center justify-end
                ${getBeatWidth(beat.duration)}
                rounded-lg px-1 py-2 transition-all duration-100
                ${isActive
                  ? 'bg-primary-500/30 ring-2 ring-primary-400 scale-110'
                  : 'bg-gray-800/50'
                }
                ${isDownbeat ? 'border-l-2 border-gray-600' : ''}
              `}
            >
              {/* Accent indicator */}
              {isAccent && (
                <span className="text-[10px] text-orange-400 font-bold mb-0.5">{'>'}</span>
              )}

              {/* Arrow / Symbol */}
              <span
                className={`
                  text-xl font-bold leading-none
                  ${stroke.color}
                  ${isActive ? 'animate-pulse' : ''}
                  ${isAccent ? 'text-2xl' : ''}
                `}
              >
                {stroke.symbol}
              </span>

              {/* Duration indicator */}
              <div className="mt-1.5 flex gap-px">
                {beat.duration <= 0.25 && (
                  <div className="flex gap-px">
                    <div className="w-1 h-1 rounded-full bg-gray-500" />
                    <div className="w-1 h-1 rounded-full bg-gray-500" />
                  </div>
                )}
                {beat.duration > 0.25 && beat.duration <= 0.5 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                )}
                {beat.duration > 0.5 && (
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                )}
              </div>

              {/* Beat number for downbeats */}
              {isDownbeat && (
                <span className="text-[10px] text-gray-400 mt-1 font-mono">
                  {Math.floor(beats.slice(0, index).reduce((sum, b) => sum + b.duration, 0)) + 1}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="text-blue-400">↓</span> Down
        </span>
        <span className="flex items-center gap-1">
          <span className="text-green-400">↑</span> Up
        </span>
        <span className="flex items-center gap-1">
          <span className="text-yellow-400">✕</span> Mute
        </span>
        <span className="flex items-center gap-1">
          <span className="text-gray-500">·</span> Rest
        </span>
        <span className="flex items-center gap-1">
          <span className="text-orange-400">{'>'}</span> Accent
        </span>
      </div>
    </div>
  );
}
