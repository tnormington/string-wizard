export interface Interval {
  name: string;
  shortName: string;
  semitones: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export type PlayDirection = 'ascending' | 'descending' | 'harmonic';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuizQuestion {
  rootNote: number; // MIDI note number
  interval: Interval;
  direction: PlayDirection;
}

export interface QuizResult {
  question: QuizQuestion;
  selectedAnswer: Interval | null;
  correct: boolean;
  timeMs: number;
}

export interface SessionStats {
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  bestStreak: number;
  averageTimeMs: number;
}

export const INTERVALS: Interval[] = [
  { name: 'Minor 2nd', shortName: 'm2', semitones: 1, difficulty: 'intermediate' },
  { name: 'Major 2nd', shortName: 'M2', semitones: 2, difficulty: 'beginner' },
  { name: 'Minor 3rd', shortName: 'm3', semitones: 3, difficulty: 'beginner' },
  { name: 'Major 3rd', shortName: 'M3', semitones: 4, difficulty: 'beginner' },
  { name: 'Perfect 4th', shortName: 'P4', semitones: 5, difficulty: 'beginner' },
  { name: 'Tritone', shortName: 'TT', semitones: 6, difficulty: 'intermediate' },
  { name: 'Perfect 5th', shortName: 'P5', semitones: 7, difficulty: 'beginner' },
  { name: 'Minor 6th', shortName: 'm6', semitones: 8, difficulty: 'intermediate' },
  { name: 'Major 6th', shortName: 'M6', semitones: 9, difficulty: 'intermediate' },
  { name: 'Minor 7th', shortName: 'm7', semitones: 10, difficulty: 'advanced' },
  { name: 'Major 7th', shortName: 'M7', semitones: 11, difficulty: 'advanced' },
  { name: 'Octave', shortName: 'P8', semitones: 12, difficulty: 'beginner' },
];

export function getIntervalsForDifficulty(difficulty: Difficulty): Interval[] {
  const levels: Record<Difficulty, Difficulty[]> = {
    beginner: ['beginner'],
    intermediate: ['beginner', 'intermediate'],
    advanced: ['beginner', 'intermediate', 'advanced'],
  };
  return INTERVALS.filter((i) => levels[difficulty].includes(i.difficulty));
}

/** Convert MIDI note number to frequency in Hz (A4 = 440Hz = MIDI 69) */
export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const note = NOTE_NAMES[midi % 12];
  return `${note}${octave}`;
}
