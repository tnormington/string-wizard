import { NOTES, type NoteName, STANDARD_TUNING } from './music';

export { NOTES, STANDARD_TUNING };
export type { NoteName };

export const NOTE_ALIASES: Record<string, string> = {
  'Db': 'C#',
  'Eb': 'D#',
  'Fb': 'E',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#',
  'Cb': 'B',
};

export function getNoteIndex(note: string): number {
  const normalized = NOTE_ALIASES[note] ?? note;
  return NOTES.indexOf(normalized as NoteName);
}

export function getNoteAtFret(openString: NoteName, fret: number): NoteName {
  const startIndex = getNoteIndex(openString);
  return NOTES[(startIndex + fret) % 12];
}

export function getScaleNotes(root: NoteName, intervals: number[]): NoteName[] {
  const rootIndex = getNoteIndex(root);
  return intervals.map(interval => NOTES[(rootIndex + interval) % 12]);
}

export function isNoteInScale(note: NoteName, scaleNotes: NoteName[]): boolean {
  return scaleNotes.includes(note);
}

export function getIntervalName(semitones: number): string {
  const names: Record<number, string> = {
    0: 'R',
    1: 'b2',
    2: '2',
    3: 'b3',
    4: '3',
    5: '4',
    6: 'b5',
    7: '5',
    8: '#5',
    9: '6',
    10: 'b7',
    11: '7',
  };
  return names[semitones % 12] ?? '';
}

export function getInterval(root: NoteName, note: NoteName): number {
  const rootIndex = getNoteIndex(root);
  const noteIndex = getNoteIndex(note);
  return (noteIndex - rootIndex + 12) % 12;
}
