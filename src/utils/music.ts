export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;

export type NoteName = (typeof NOTES)[number];

// Standard tuning: E2, A2, D3, G3, B3, E4 (low to high, strings 6 to 1)
export const STANDARD_TUNING: NoteName[] = ['E', 'A', 'D', 'G', 'B', 'E'];

export const STRING_LABELS = ['6', '5', '4', '3', '2', '1'];

export const TOTAL_FRETS = 12;

/** Returns the note at a given string index and fret number. */
export function getNoteAtPosition(stringIndex: number, fret: number): NoteName {
  const openNote = STANDARD_TUNING[stringIndex];
  const noteIndex = NOTES.indexOf(openNote);
  return NOTES[(noteIndex + fret) % 12];
}

/** Generates a random string index (0-5) and fret (0-TOTAL_FRETS). */
export function getRandomPosition(): { stringIndex: number; fret: number } {
  return {
    stringIndex: Math.floor(Math.random() * 6),
    fret: Math.floor(Math.random() * (TOTAL_FRETS + 1)),
  };
}

/** Returns all positions on the fretboard that match a given note. */
export function findNotePositions(note: NoteName): { stringIndex: number; fret: number }[] {
  const positions: { stringIndex: number; fret: number }[] = [];
  for (let s = 0; s < 6; s++) {
    for (let f = 0; f <= TOTAL_FRETS; f++) {
      if (getNoteAtPosition(s, f) === note) {
        positions.push({ stringIndex: s, fret: f });
      }
    }
  }
  return positions;
}

/** Returns a random note from the chromatic scale. */
export function getRandomNote(): NoteName {
  return NOTES[Math.floor(Math.random() * NOTES.length)];
}
