import { type NoteName, STANDARD_TUNING, getNoteIndex } from '../utils/musicTheory';
import { Fretboard } from './Fretboard';

interface ScalePositionsProps {
  scaleNotes: NoteName[];
  rootNote: NoteName;
  showIntervals: boolean;
}

interface PositionRange {
  label: string;
  startFret: number;
  endFret: number;
}

function computePositions(rootNote: NoteName): PositionRange[] {
  const rootIndex = getNoteIndex(rootNote);
  // Calculate positions based on where the root falls on the low E string
  // Each position covers roughly 4-5 frets
  const baseFret = rootIndex === 0 ? 0 : rootIndex; // C starts at fret 0/open, others at their semitone value

  const positions: PositionRange[] = [];
  const offsets = [
    { label: 'Position 1 (Open/Low)', start: 0, end: 4 },
    { label: 'Position 2', start: 3, end: 7 },
    { label: 'Position 3', start: 5, end: 9 },
    { label: 'Position 4', start: 7, end: 11 },
    { label: 'Position 5 (High)', start: 10, end: 14 },
  ];

  for (const offset of offsets) {
    const start = Math.max(0, baseFret + offset.start - rootIndex);
    const end = start + (offset.end - offset.start);
    if (start <= 17) {
      positions.push({
        label: offset.label,
        startFret: start,
        endFret: end,
      });
    }
  }

  return positions;
}

export function ScalePositions({ scaleNotes, rootNote, showIntervals }: ScalePositionsProps) {
  const positions = computePositions(rootNote);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Scale Positions</h3>
      <p className="text-sm text-gray-400">
        Practice these positions individually, then connect them across the entire neck.
      </p>
      <div className="space-y-8">
        {positions.map((position, i) => (
          <div key={i} className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">{position.label}</h4>
            <div className="overflow-x-auto">
              <Fretboard
                scaleNotes={scaleNotes}
                rootNote={rootNote}
                startFret={position.startFret}
                endFret={position.endFret}
                showIntervals={showIntervals}
                tuning={STANDARD_TUNING}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
