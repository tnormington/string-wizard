export type StrokeType = 'down' | 'up' | 'mute' | 'rest' | 'accent-down' | 'accent-up';

export type PatternType = 'strumming' | 'fingerpicking' | 'hybrid';

export type TimeSignature = '4/4' | '3/4' | '6/8' | '2/4';

export type Genre = 'rock' | 'pop' | 'folk' | 'country' | 'blues' | 'reggae' | 'funk' | 'latin';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Beat {
  stroke: StrokeType;
  /** Duration as fraction of a beat: 1 = quarter, 0.5 = eighth, 0.25 = sixteenth */
  duration: number;
  /** Whether this beat falls on a strong beat position */
  isDownbeat?: boolean;
}

export interface RhythmPattern {
  id: string;
  name: string;
  description: string;
  type: PatternType;
  timeSignature: TimeSignature;
  genre: Genre[];
  difficulty: Difficulty;
  bpm: number;
  beats: Beat[];
  /** Visual text notation like "D D U U D U" */
  notation: string;
  tips?: string;
}
