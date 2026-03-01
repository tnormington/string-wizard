import { getNoteAtPosition, TOTAL_FRETS, STRING_LABELS } from '../../utils/music';

interface FretboardProps {
  highlightPosition?: { stringIndex: number; fret: number } | null;
  feedback?: 'correct' | 'wrong' | null;
  onFretClick?: (stringIndex: number, fret: number) => void;
  interactive?: boolean;
}

const FRET_MARKERS = [3, 5, 7, 9, 12];
const DOUBLE_MARKER = [12];

// Layout constants
const LEFT_PAD = 40;
const TOP_PAD = 30;
const FRET_WIDTH = 60;
const STRING_GAP = 28;
const NUT_WIDTH = 6;

const BOARD_WIDTH = LEFT_PAD + NUT_WIDTH + FRET_WIDTH * TOTAL_FRETS + 20;
const BOARD_HEIGHT = TOP_PAD + STRING_GAP * 5 + 40;

export function Fretboard({ highlightPosition, feedback, onFretClick, interactive }: FretboardProps) {
  const stringY = (idx: number) => TOP_PAD + idx * STRING_GAP;
  const fretX = (fret: number) => LEFT_PAD + NUT_WIDTH + fret * FRET_WIDTH;

  return (
    <svg
      viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
      className="w-full max-w-4xl"
      style={{ minWidth: '500px' }}
      role="img"
      aria-label="Guitar fretboard"
    >
      {/* Fretboard background */}
      <rect
        x={LEFT_PAD}
        y={TOP_PAD - 10}
        width={BOARD_WIDTH - LEFT_PAD - 20}
        height={STRING_GAP * 5 + 20}
        rx={4}
        fill="#5C3A1E"
      />

      {/* Nut */}
      <rect x={LEFT_PAD} y={TOP_PAD - 10} width={NUT_WIDTH} height={STRING_GAP * 5 + 20} fill="#F5F0E8" rx={1} />

      {/* Fret wires */}
      {Array.from({ length: TOTAL_FRETS }, (_, i) => (
        <line
          key={`fret-${i}`}
          x1={fretX(i + 1)}
          y1={TOP_PAD - 10}
          x2={fretX(i + 1)}
          y2={TOP_PAD + STRING_GAP * 5 + 10}
          stroke="#C0C0C0"
          strokeWidth={2}
        />
      ))}

      {/* Fret markers (dots) */}
      {FRET_MARKERS.map((f) => {
        const cx = fretX(f) - FRET_WIDTH / 2;
        const isDouble = DOUBLE_MARKER.includes(f);
        if (isDouble) {
          return (
            <g key={`marker-${f}`}>
              <circle cx={cx} cy={TOP_PAD + STRING_GAP * 1.5} r={5} fill="#D4AF37" opacity={0.5} />
              <circle cx={cx} cy={TOP_PAD + STRING_GAP * 3.5} r={5} fill="#D4AF37" opacity={0.5} />
            </g>
          );
        }
        return (
          <circle
            key={`marker-${f}`}
            cx={cx}
            cy={TOP_PAD + STRING_GAP * 2.5}
            r={5}
            fill="#D4AF37"
            opacity={0.5}
          />
        );
      })}

      {/* Strings */}
      {Array.from({ length: 6 }, (_, i) => (
        <line
          key={`string-${i}`}
          x1={LEFT_PAD}
          y1={stringY(i)}
          x2={BOARD_WIDTH - 20}
          y2={stringY(i)}
          stroke="#D4AF37"
          strokeWidth={1.5 + i * 0.3}
          opacity={0.8}
        />
      ))}

      {/* String labels */}
      {STRING_LABELS.map((label, i) => (
        <text
          key={`label-${i}`}
          x={LEFT_PAD - 20}
          y={stringY(i) + 5}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize={12}
          fontFamily="monospace"
        >
          {label}
        </text>
      ))}

      {/* Fret numbers */}
      {Array.from({ length: TOTAL_FRETS }, (_, i) => (
        <text
          key={`fnum-${i}`}
          x={fretX(i + 1) - FRET_WIDTH / 2}
          y={BOARD_HEIGHT - 5}
          textAnchor="middle"
          fill="#64748b"
          fontSize={11}
          fontFamily="monospace"
        >
          {i + 1}
        </text>
      ))}

      {/* Clickable areas per fret/string */}
      {interactive &&
        Array.from({ length: 6 }, (_, s) =>
          Array.from({ length: TOTAL_FRETS + 1 }, (_, f) => {
            const x = f === 0 ? LEFT_PAD - 15 : fretX(f) - FRET_WIDTH + 2;
            const w = f === 0 ? NUT_WIDTH + 25 : FRET_WIDTH - 4;
            return (
              <rect
                key={`click-${s}-${f}`}
                x={x}
                y={stringY(s) - STRING_GAP / 2}
                width={w}
                height={STRING_GAP}
                fill="transparent"
                className="cursor-pointer hover:fill-white/10"
                onClick={() => onFretClick?.(s, f)}
                role="button"
                aria-label={`String ${6 - s}, fret ${f}: ${getNoteAtPosition(s, f)}`}
              />
            );
          }),
        )}

      {/* Highlighted position */}
      {highlightPosition && (
        <circle
          cx={
            highlightPosition.fret === 0
              ? LEFT_PAD - 8
              : fretX(highlightPosition.fret) - FRET_WIDTH / 2
          }
          cy={stringY(highlightPosition.stringIndex)}
          r={11}
          fill={feedback === 'correct' ? '#22c55e' : feedback === 'wrong' ? '#ef4444' : '#3b82f6'}
          stroke="white"
          strokeWidth={2}
          className="transition-colors duration-200"
        />
      )}
      {highlightPosition && (
        <text
          x={
            highlightPosition.fret === 0
              ? LEFT_PAD - 8
              : fretX(highlightPosition.fret) - FRET_WIDTH / 2
          }
          y={stringY(highlightPosition.stringIndex) + 4}
          textAnchor="middle"
          fill="white"
          fontSize={10}
          fontWeight="bold"
          fontFamily="monospace"
          pointerEvents="none"
        >
          ?
        </text>
      )}
    </svg>
  );
}
