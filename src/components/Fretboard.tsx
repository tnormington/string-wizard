import { type NoteName, STANDARD_TUNING, getNoteAtFret, getInterval, getIntervalName } from '../utils/musicTheory';

interface FretboardProps {
  scaleNotes: NoteName[];
  rootNote: NoteName;
  startFret?: number;
  endFret?: number;
  showIntervals?: boolean;
  highlightRoot?: boolean;
  tuning?: NoteName[];
}

const FRET_DOT_POSITIONS = [3, 5, 7, 9, 12, 15, 17, 19, 21];
const DOUBLE_DOT_POSITIONS = [12];

export function Fretboard({
  scaleNotes,
  rootNote,
  startFret = 0,
  endFret = 15,
  showIntervals = false,
  highlightRoot = true,
  tuning = STANDARD_TUNING,
}: FretboardProps) {
  const numStrings = tuning.length;
  const numFrets = endFret - startFret;

  const stringSpacing = 30;
  const nutWidth = startFret === 0 ? 8 : 0;
  const paddingLeft = 40 + nutWidth;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 40;
  const fretboardHeight = (numStrings - 1) * stringSpacing;

  // Fret widths decrease as you go up the neck (simulating real guitar)
  const baseFretWidth = 70;
  const getFretWidth = (fretIndex: number) => {
    const actualFret = startFret + fretIndex;
    return baseFretWidth * Math.pow(0.97, actualFret);
  };

  const fretPositions: number[] = [0];
  let x = 0;
  for (let i = 0; i < numFrets; i++) {
    x += getFretWidth(i);
    fretPositions.push(x);
  }
  const totalFretboardWidth = x;

  const svgWidth = paddingLeft + totalFretboardWidth + paddingRight;
  const svgHeight = paddingTop + fretboardHeight + paddingBottom;

  const getFretCenter = (fretIndex: number) => {
    if (fretIndex === 0) return paddingLeft - 15;
    return paddingLeft + (fretPositions[fretIndex - 1] + fretPositions[fretIndex]) / 2;
  };

  const getStringY = (stringIndex: number) => {
    return paddingTop + stringIndex * stringSpacing;
  };

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="w-full max-w-5xl"
      style={{ minWidth: '600px' }}
    >
      {/* Nut */}
      {startFret === 0 && (
        <rect
          x={paddingLeft - nutWidth}
          y={paddingTop - 2}
          width={nutWidth}
          height={fretboardHeight + 4}
          fill="#e8dcc8"
          rx={2}
        />
      )}

      {/* Fretboard background */}
      <rect
        x={paddingLeft}
        y={paddingTop - 2}
        width={totalFretboardWidth}
        height={fretboardHeight + 4}
        fill="#3d2b1f"
        rx={2}
      />

      {/* Fret dots */}
      {Array.from({ length: numFrets }, (_, i) => {
        const fretNumber = startFret + i + 1;
        if (!FRET_DOT_POSITIONS.includes(fretNumber)) return null;
        const cx = getFretCenter(i + 1);
        const isDouble = DOUBLE_DOT_POSITIONS.includes(fretNumber);

        if (isDouble) {
          return (
            <g key={`dot-${fretNumber}`}>
              <circle cx={cx} cy={getStringY(1)} r={5} fill="#5a4a3a" opacity={0.6} />
              <circle cx={cx} cy={getStringY(4)} r={5} fill="#5a4a3a" opacity={0.6} />
            </g>
          );
        }
        return (
          <circle
            key={`dot-${fretNumber}`}
            cx={cx}
            cy={paddingTop + fretboardHeight / 2}
            r={5}
            fill="#5a4a3a"
            opacity={0.6}
          />
        );
      })}

      {/* Fret lines */}
      {fretPositions.slice(1).map((fretX, i) => (
        <line
          key={`fret-${i}`}
          x1={paddingLeft + fretX}
          y1={paddingTop - 2}
          x2={paddingLeft + fretX}
          y2={paddingTop + fretboardHeight + 2}
          stroke="#c0c0c0"
          strokeWidth={i === 0 && startFret === 0 ? 0 : 2}
          opacity={0.7}
        />
      ))}

      {/* Fret numbers */}
      {Array.from({ length: numFrets }, (_, i) => {
        const fretNumber = startFret + i + 1;
        if (fretNumber % 2 !== 0 && fretNumber !== 1 && !FRET_DOT_POSITIONS.includes(fretNumber)) return null;
        return (
          <text
            key={`fret-num-${fretNumber}`}
            x={getFretCenter(i + 1)}
            y={paddingTop + fretboardHeight + 25}
            textAnchor="middle"
            fill="#9ca3af"
            fontSize={11}
          >
            {fretNumber}
          </text>
        );
      })}

      {/* Strings */}
      {tuning.map((_, stringIndex) => {
        const y = getStringY(stringIndex);
        const thickness = 1 + (stringIndex * 0.4);
        return (
          <line
            key={`string-${stringIndex}`}
            x1={paddingLeft}
            y1={y}
            x2={paddingLeft + totalFretboardWidth}
            y2={y}
            stroke="#d4af37"
            strokeWidth={thickness}
            opacity={0.8}
          />
        );
      })}

      {/* String labels (tuning) */}
      {tuning.map((note, stringIndex) => (
        <text
          key={`label-${stringIndex}`}
          x={paddingLeft - nutWidth - 15}
          y={getStringY(stringIndex) + 4}
          textAnchor="middle"
          fill="#9ca3af"
          fontSize={12}
          fontWeight="bold"
        >
          {note}
        </text>
      ))}

      {/* Scale notes on fretboard */}
      {tuning.map((openNote, stringIndex) =>
        Array.from({ length: numFrets + 1 }, (_, fretOffset) => {
          const fretNumber = startFret + fretOffset;
          const note = getNoteAtFret(openNote, fretNumber);

          if (!scaleNotes.includes(note)) return null;

          const isRoot = note === rootNote;
          const cx = fretOffset === 0 && startFret === 0
            ? paddingLeft - nutWidth / 2 - 2
            : getFretCenter(fretOffset);
          const cy = getStringY(stringIndex);
          const interval = getInterval(rootNote, note);
          const intervalName = getIntervalName(interval);
          const label = showIntervals ? intervalName : note;

          return (
            <g key={`note-${stringIndex}-${fretNumber}`}>
              <circle
                cx={cx}
                cy={cy}
                r={12}
                fill={isRoot && highlightRoot ? '#ef4444' : '#3b82f6'}
                stroke={isRoot && highlightRoot ? '#fca5a5' : '#93c5fd'}
                strokeWidth={2}
                opacity={0.95}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill="white"
                fontSize={isRoot ? 11 : 10}
                fontWeight={isRoot ? 'bold' : 'normal'}
              >
                {label}
              </text>
            </g>
          );
        })
      )}

      {/* Start fret indicator when not starting from nut */}
      {startFret > 0 && (
        <text
          x={paddingLeft - 5}
          y={paddingTop + fretboardHeight / 2 + 4}
          textAnchor="end"
          fill="#9ca3af"
          fontSize={14}
          fontWeight="bold"
        >
          {startFret}fr
        </text>
      )}
    </svg>
  );
}
