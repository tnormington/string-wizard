import { type NoteName, getScaleNotes, getIntervalName } from '../utils/musicTheory';
import type { ScaleDefinition } from '../data/scales';

interface ScaleInfoProps {
  scale: ScaleDefinition;
  rootNote: NoteName;
}

export function ScaleInfo({ scale, rootNote }: ScaleInfoProps) {
  const notes = getScaleNotes(rootNote, scale.intervals);

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-semibold text-white">
        {rootNote} {scale.name}
      </h3>

      <p className="text-sm text-gray-400">{scale.description}</p>

      {/* Notes in scale */}
      <div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Notes</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {notes.map((note, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold ${
                i === 0
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-200'
              }`}
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Intervals */}
      <div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Intervals</span>
        <div className="flex flex-wrap gap-2 mt-1">
          {scale.intervals.map((interval, i) => (
            <span
              key={i}
              className="inline-flex items-center justify-center px-2 h-7 rounded bg-gray-700/70 text-xs text-gray-300 font-mono"
            >
              {getIntervalName(interval)}
            </span>
          ))}
        </div>
      </div>

      {/* Formula (semitones between notes) */}
      <div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Formula (steps)</span>
        <p className="text-sm text-gray-300 font-mono mt-1">
          {scale.intervals.map((interval, i) => {
            if (i === scale.intervals.length - 1) return null;
            const gap = scale.intervals[i + 1] - interval;
            return gap === 1 ? 'H' : gap === 2 ? 'W' : gap === 3 ? 'WH' : `${gap}`;
          }).filter(Boolean).join(' - ')}
        </p>
      </div>

      {/* Common use */}
      <div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Common Uses</span>
        <p className="text-sm text-gray-300 mt-1">{scale.commonUse}</p>
      </div>
    </div>
  );
}
