/** Musical note names */
export type NoteName = 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab' | 'A' | 'A#' | 'Bb' | 'B';

/** Chord quality/type */
export type ChordQuality =
  | 'major'
  | 'minor'
  | 'dominant7'
  | 'major7'
  | 'minor7'
  | 'diminished'
  | 'augmented'
  | 'sus2'
  | 'sus4'
  | 'add9'
  | 'power';

/** Chord category for grouping in the UI */
export type ChordCategory = 'basic' | 'barre' | 'seventh' | 'extended' | 'altered' | 'power';

/** Difficulty level */
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * Represents a single fret position on a specific string.
 * -1 = muted (x), 0 = open string, 1+ = fret number
 */
export type FretPosition = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Finger assignment for a fret position.
 * 0 = no finger (open/muted), 1 = index, 2 = middle, 3 = ring, 4 = pinky, T = thumb
 */
export type Finger = 0 | 1 | 2 | 3 | 4 | 'T';

/**
 * A chord voicing represents one way to play a chord on the guitar.
 * Strings are ordered from low E (6th) to high E (1st): [E, A, D, G, B, e]
 */
export interface ChordVoicing {
  /** Fret positions for each string [6th, 5th, 4th, 3rd, 2nd, 1st] */
  frets: [FretPosition, FretPosition, FretPosition, FretPosition, FretPosition, FretPosition];
  /** Finger assignments for each string */
  fingers: [Finger, Finger, Finger, Finger, Finger, Finger];
  /** Starting fret for the diagram (usually 1 unless it's a higher position chord) */
  baseFret: number;
  /** Whether this voicing uses a barre */
  barre?: number;
  /** The strings covered by the barre [fromString, toString] (1-indexed from high E) */
  barreStrings?: [number, number];
}

/**
 * A complete chord definition with all its metadata and voicings.
 */
export interface Chord {
  /** Unique identifier, e.g., "C_major", "Am_minor" */
  id: string;
  /** Root note of the chord */
  root: NoteName;
  /** Chord quality */
  quality: ChordQuality;
  /** Display name, e.g., "C Major", "Am" */
  name: string;
  /** Short symbol, e.g., "C", "Am", "G7" */
  symbol: string;
  /** Category for filtering */
  category: ChordCategory;
  /** Difficulty level */
  difficulty: Difficulty;
  /** Available voicings (first is the most common/recommended) */
  voicings: ChordVoicing[];
  /** Notes in the chord, e.g., ["C", "E", "G"] */
  notes: NoteName[];
  /** Intervals from root, e.g., ["1", "3", "5"] */
  intervals: string[];
}
