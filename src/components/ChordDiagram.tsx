import type { ChordVoicing } from '../types/chord';

interface ChordDiagramProps {
  voicing: ChordVoicing;
  name: string;
  symbol: string;
  width?: number;
}

const STRING_COUNT = 6;
const FRET_COUNT = 5;

export function ChordDiagram({ voicing, name, symbol, width = 160 }: ChordDiagramProps) {
  const height = width * 1.35;
  const padding = { top: 45, bottom: 20, left: 30, right: 20 };
  const diagramWidth = width - padding.left - padding.right;
  const diagramHeight = height - padding.top - padding.bottom;
  const stringSpacing = diagramWidth / (STRING_COUNT - 1);
  const fretSpacing = diagramHeight / FRET_COUNT;

  const getStringX = (stringIndex: number) => padding.left + stringIndex * stringSpacing;
  const getFretY = (fretIndex: number) => padding.top + fretIndex * fretSpacing;

  const showBaseFret = voicing.baseFret > 1;

  return (
    <div className="flex flex-col items-center w-full">
      <span className="text-base sm:text-lg font-bold text-white mb-1">{symbol}</span>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="select-none w-full max-w-[160px]"
        aria-label={`${name} chord diagram`}
      >
        {/* Nut (thick bar at top) or base fret indicator */}
        {!showBaseFret ? (
          <rect
            x={padding.left - 2}
            y={padding.top - 4}
            width={diagramWidth + 4}
            height={5}
            fill="white"
            rx={1}
          />
        ) : (
          <text
            x={padding.left - 16}
            y={getFretY(0.5) + 5}
            fill="#9ca3af"
            fontSize={12}
            textAnchor="middle"
            fontWeight="bold"
          >
            {voicing.baseFret}fr
          </text>
        )}

        {/* Fret lines */}
        {Array.from({ length: FRET_COUNT + 1 }, (_, i) => (
          <line
            key={`fret-${i}`}
            x1={padding.left}
            y1={getFretY(i)}
            x2={padding.left + diagramWidth}
            y2={getFretY(i)}
            stroke="#6b7280"
            strokeWidth={i === 0 ? 1 : 0.5}
          />
        ))}

        {/* String lines */}
        {Array.from({ length: STRING_COUNT }, (_, i) => (
          <line
            key={`string-${i}`}
            x1={getStringX(i)}
            y1={padding.top}
            x2={getStringX(i)}
            y2={padding.top + diagramHeight}
            stroke="#9ca3af"
            strokeWidth={1 + (5 - i) * 0.15}
          />
        ))}

        {/* Barre indicator */}
        {voicing.barre && voicing.barreStrings && (
          <rect
            x={getStringX(6 - voicing.barreStrings[1]) - 5}
            y={getFretY(voicing.frets.findIndex((f) => f === voicing.barre) >= 0
              ? voicing.frets.findIndex((f) => f > 0 && f === Math.min(...voicing.frets.filter(f => f > 0)))
              : 0) - fretSpacing / 2 + fretSpacing / 2 - 6}
            width={
              (voicing.barreStrings[1] - voicing.barreStrings[0]) * stringSpacing + 10
            }
            height={12}
            rx={6}
            fill="#3b82f6"
            opacity={0.7}
          />
        )}

        {/* Finger positions, open strings, and muted strings */}
        {voicing.frets.map((fret, stringIdx) => {
          const x = getStringX(stringIdx);

          if (fret === -1) {
            // Muted string (X)
            return (
              <text
                key={`mute-${stringIdx}`}
                x={x}
                y={padding.top - 12}
                fill="#ef4444"
                fontSize={14}
                textAnchor="middle"
                fontWeight="bold"
              >
                ×
              </text>
            );
          }

          if (fret === 0) {
            // Open string (O)
            return (
              <circle
                key={`open-${stringIdx}`}
                cx={x}
                cy={padding.top - 14}
                r={5}
                fill="none"
                stroke="#10b981"
                strokeWidth={1.5}
              />
            );
          }

          // Fretted position
          const adjustedFret = showBaseFret ? fret - voicing.baseFret + 1 : fret;
          const y = getFretY(adjustedFret) - fretSpacing / 2;

          return (
            <g key={`finger-${stringIdx}`}>
              <circle cx={x} cy={y} r={8} fill="#3b82f6" />
              {voicing.fingers[stringIdx] !== 0 && (
                <text
                  x={x}
                  y={y + 4}
                  fill="white"
                  fontSize={10}
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {voicing.fingers[stringIdx]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <span className="text-xs text-gray-400 mt-0.5">{name}</span>
    </div>
  );
}
