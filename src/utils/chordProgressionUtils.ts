import type { Chord, ChordQuality, NoteName } from '../types/chord';
import { chords } from '../data/chords';
import { getNoteIndex, NOTES } from './musicTheory';

/** A suggested chord with its relationship label and group */
export interface ChordSuggestion {
  chord: Chord;
  relationship: string;
  group: 'Strong resolution' | 'Common alternatives' | 'Color chords';
}

/** Chromatic note names (using sharps) indexed 0–11 */
const CHROMATIC = NOTES;

/** Semitone intervals for a major scale: W W H W W W H */
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

/** Semitone intervals for a natural minor scale: W H W W H W W */
const MINOR_SCALE_INTERVALS = [0, 2, 3, 5, 7, 8, 10];

/** Roman numeral labels for scale degrees */
const MAJOR_DEGREE_LABELS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
const MINOR_DEGREE_LABELS = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'];

/** Quality of each diatonic chord in major key: I ii iii IV V vi vii° */
const MAJOR_DIATONIC_QUALITIES: ChordQuality[] = [
  'major', 'minor', 'minor', 'major', 'major', 'minor', 'diminished',
];

/** Quality of each diatonic chord in natural minor key: i ii° III iv v VI VII */
const MINOR_DIATONIC_QUALITIES: ChordQuality[] = [
  'minor', 'diminished', 'major', 'minor', 'minor', 'major', 'major',
];

/** Get the note name at a given semitone offset from root */
function noteAtSemitones(rootNote: NoteName, semitones: number): string {
  const rootIdx = getNoteIndex(rootNote);
  return CHROMATIC[(rootIdx + semitones) % 12];
}

/** Find the best matching chord in the library for a root + quality */
function findChord(root: string, quality: ChordQuality): Chord | undefined {
  // Normalize root to handle sharp/flat equivalences
  const normalizedRoot = CHROMATIC[getNoteIndex(root)];
  // First try exact match
  let match = chords.find(
    (c) => CHROMATIC[getNoteIndex(c.root)] === normalizedRoot && c.quality === quality,
  );
  if (match) return match;
  // Fallback: try just the root with any related quality
  if (quality === 'diminished') {
    match = chords.find(
      (c) => CHROMATIC[getNoteIndex(c.root)] === normalizedRoot && c.quality === 'minor',
    );
  }
  return match;
}

/** Build diatonic suggestions for a major key */
function getMajorKeySuggestions(rootNote: NoteName, selectedDegree: number): ChordSuggestion[] {
  const suggestions: ChordSuggestion[] = [];

  // Common progressions from each degree
  const strongResolutions: Record<number, number[]> = {
    0: [3, 4],       // I -> IV, V
    1: [4, 3],       // ii -> V, IV
    2: [3, 5],       // iii -> IV, vi
    3: [4, 0],       // IV -> V, I
    4: [0, 5],       // V -> I, vi
    5: [1, 3],       // vi -> ii, IV
    6: [0, 4],       // vii° -> I, V
  };

  const commonAlternatives: Record<number, number[]> = {
    0: [5, 1],       // I -> vi, ii
    1: [6, 0],       // ii -> vii°, I
    2: [1, 4],       // iii -> ii, V
    3: [1, 5],       // IV -> ii, vi
    4: [3, 1],       // V -> IV, ii
    5: [4, 0],       // vi -> V, I
    6: [5, 3],       // vii° -> vi, IV
  };

  for (const degree of (strongResolutions[selectedDegree] ?? [])) {
    const note = noteAtSemitones(rootNote, MAJOR_SCALE_INTERVALS[degree]);
    const quality = MAJOR_DIATONIC_QUALITIES[degree];
    const chord = findChord(note, quality);
    if (chord) {
      suggestions.push({
        chord,
        relationship: `${MAJOR_DEGREE_LABELS[degree]} in ${rootNote} major`,
        group: 'Strong resolution',
      });
    }
  }

  for (const degree of (commonAlternatives[selectedDegree] ?? [])) {
    const note = noteAtSemitones(rootNote, MAJOR_SCALE_INTERVALS[degree]);
    const quality = MAJOR_DIATONIC_QUALITIES[degree];
    const chord = findChord(note, quality);
    if (chord) {
      suggestions.push({
        chord,
        relationship: `${MAJOR_DEGREE_LABELS[degree]} in ${rootNote} major`,
        group: 'Common alternatives',
      });
    }
  }

  return suggestions;
}

/** Build diatonic suggestions for a minor key */
function getMinorKeySuggestions(rootNote: NoteName, selectedDegree: number): ChordSuggestion[] {
  const suggestions: ChordSuggestion[] = [];

  const strongResolutions: Record<number, number[]> = {
    0: [3, 4],       // i -> iv, v
    1: [4, 2],       // ii° -> v, III
    2: [5, 3],       // III -> VI, iv
    3: [4, 0],       // iv -> v, i
    4: [0, 5],       // v -> i, VI
    5: [3, 6],       // VI -> iv, VII
    6: [0, 2],       // VII -> i, III
  };

  const commonAlternatives: Record<number, number[]> = {
    0: [5, 6],       // i -> VI, VII
    1: [0, 3],       // ii° -> i, iv
    2: [6, 0],       // III -> VII, i
    3: [5, 6],       // iv -> VI, VII
    4: [6, 3],       // v -> VII, iv
    5: [0, 2],       // VI -> i, III
    6: [5, 4],       // VII -> VI, v
  };

  for (const degree of (strongResolutions[selectedDegree] ?? [])) {
    const note = noteAtSemitones(rootNote, MINOR_SCALE_INTERVALS[degree]);
    const quality = MINOR_DIATONIC_QUALITIES[degree];
    const chord = findChord(note, quality);
    if (chord) {
      suggestions.push({
        chord,
        relationship: `${MINOR_DEGREE_LABELS[degree]} in ${rootNote} minor`,
        group: 'Strong resolution',
      });
    }
  }

  for (const degree of (commonAlternatives[selectedDegree] ?? [])) {
    const note = noteAtSemitones(rootNote, MINOR_SCALE_INTERVALS[degree]);
    const quality = MINOR_DIATONIC_QUALITIES[degree];
    const chord = findChord(note, quality);
    if (chord) {
      suggestions.push({
        chord,
        relationship: `${MINOR_DEGREE_LABELS[degree]} in ${rootNote} minor`,
        group: 'Common alternatives',
      });
    }
  }

  return suggestions;
}

/** Add color chord suggestions (secondary dominants, borrowed chords) */
function getColorChords(rootNote: NoteName, quality: ChordQuality): ChordSuggestion[] {
  const suggestions: ChordSuggestion[] = [];

  if (quality === 'major' || quality === 'dominant7' || quality === 'major7') {
    // V7 of the current chord (secondary dominant)
    const fifthNote = noteAtSemitones(rootNote, 7);
    const dom7 = findChord(fifthNote, 'dominant7');
    if (dom7) {
      suggestions.push({
        chord: dom7,
        relationship: `V7/${rootNote} (secondary dominant)`,
        group: 'Color chords',
      });
    }

    // Parallel minor
    const minorChord = findChord(rootNote as string, 'minor');
    if (minorChord) {
      suggestions.push({
        chord: minorChord,
        relationship: `Parallel minor of ${rootNote}`,
        group: 'Color chords',
      });
    }
  }

  if (quality === 'minor' || quality === 'minor7') {
    // Relative major (up a minor 3rd)
    const relMajorNote = noteAtSemitones(rootNote, 3);
    const relMajor = findChord(relMajorNote, 'major');
    if (relMajor) {
      suggestions.push({
        chord: relMajor,
        relationship: `Relative major (${relMajorNote})`,
        group: 'Color chords',
      });
    }

    // Parallel major
    const majorChord = findChord(rootNote as string, 'major');
    if (majorChord) {
      suggestions.push({
        chord: majorChord,
        relationship: `Parallel major of ${rootNote}`,
        group: 'Color chords',
      });
    }
  }

  return suggestions;
}

/** Find what degree a chord is in a given key (major) */
function findDegreeInMajorKey(keyRoot: NoteName, chordRoot: NoteName): number | null {
  const keyIdx = getNoteIndex(keyRoot);
  const chordIdx = getNoteIndex(chordRoot);
  const interval = (chordIdx - keyIdx + 12) % 12;
  const degree = MAJOR_SCALE_INTERVALS.indexOf(interval);
  return degree >= 0 ? degree : null;
}

/**
 * Get chord progression suggestions for a given chord.
 * Returns 4-8 suggestions grouped by relationship type.
 */
export function getChordSuggestions(chord: Chord): ChordSuggestion[] {
  const { root, quality } = chord;
  const allSuggestions: ChordSuggestion[] = [];
  const seen = new Set<string>();

  const addUnique = (suggestion: ChordSuggestion) => {
    if (suggestion.chord.id === chord.id) return;
    if (seen.has(suggestion.chord.id)) return;
    seen.add(suggestion.chord.id);
    allSuggestions.push(suggestion);
  };

  // For major chords: treat as I in its own key
  if (quality === 'major' || quality === 'major7' || quality === 'add9') {
    const degree = 0; // I
    for (const s of getMajorKeySuggestions(root, degree)) addUnique(s);
  }

  // For minor chords: treat as i in its own key + vi in relative major
  if (quality === 'minor' || quality === 'minor7') {
    const degree = 0; // i
    for (const s of getMinorKeySuggestions(root, degree)) addUnique(s);

    // Also consider as vi in the relative major (up 3 semitones)
    const relMajorRoot = CHROMATIC[
      (getNoteIndex(root) + 3) % 12
    ] as NoteName;
    const degreeInMajor = findDegreeInMajorKey(relMajorRoot, root);
    if (degreeInMajor !== null) {
      for (const s of getMajorKeySuggestions(relMajorRoot, degreeInMajor)) addUnique(s);
    }
  }

  // For dominant 7th chords: resolve to the target (I)
  if (quality === 'dominant7') {
    // V7 resolves to I (a 4th up / 5th down = 5 semitones up)
    const targetNote = noteAtSemitones(root, 5);
    const targetMajor = findChord(targetNote, 'major');
    if (targetMajor) {
      addUnique({
        chord: targetMajor,
        relationship: `I (resolves from V7)`,
        group: 'Strong resolution',
      });
    }
    const targetMinor = findChord(targetNote, 'minor');
    if (targetMinor) {
      addUnique({
        chord: targetMinor,
        relationship: `i (resolves from V7)`,
        group: 'Strong resolution',
      });
    }

    // Also suggest IV of the target key
    const keyRoot = targetNote;
    const degree = 4; // The dom7 chord IS the V, suggest I and others
    for (const s of getMajorKeySuggestions(keyRoot as NoteName, degree)) addUnique(s);
  }

  // For sus chords: suggest resolution to the parent major/minor
  if (quality === 'sus2' || quality === 'sus4') {
    const major = findChord(root as string, 'major');
    if (major) {
      addUnique({
        chord: major,
        relationship: `Resolves to ${root} major`,
        group: 'Strong resolution',
      });
    }
    const minor = findChord(root as string, 'minor');
    if (minor) {
      addUnique({
        chord: minor,
        relationship: `Resolves to ${root} minor`,
        group: 'Strong resolution',
      });
    }
    // Also try dom7 and suggestions as if it were the parent major
    for (const s of getMajorKeySuggestions(root, 0)) addUnique(s);
  }

  // For diminished chords: resolve up a half step or to several possible keys
  if (quality === 'diminished') {
    const halfStepUp = noteAtSemitones(root, 1);
    const target = findChord(halfStepUp, 'major') ?? findChord(halfStepUp, 'minor');
    if (target) {
      addUnique({
        chord: target,
        relationship: `Resolves up a half step to ${halfStepUp}`,
        group: 'Strong resolution',
      });
    }
    // dim often functions as vii° - suggest the I chord
    const keyRoot = noteAtSemitones(root, 1);
    for (const s of getMajorKeySuggestions(keyRoot as NoteName, 6)) addUnique(s);
  }

  // For augmented chords: resolve up or down a half step
  if (quality === 'augmented') {
    const halfStepUp = noteAtSemitones(root, 1);
    const targetUp = findChord(halfStepUp, 'major');
    if (targetUp) {
      addUnique({
        chord: targetUp,
        relationship: `Resolves up to ${halfStepUp} major`,
        group: 'Strong resolution',
      });
    }
    const target = findChord(root as string, 'major');
    if (target) {
      addUnique({
        chord: target,
        relationship: `Resolves to ${root} major`,
        group: 'Strong resolution',
      });
    }
    for (const s of getMajorKeySuggestions(root, 0)) addUnique(s);
  }

  // For power chords: suggest common rock progressions
  if (quality === 'power') {
    // I5 -> IV5, V5, bVII5 pattern
    const fourthNote = noteAtSemitones(root, 5);
    const fifthNote = noteAtSemitones(root, 7);
    const flatSeventhNote = noteAtSemitones(root, 10);

    for (const [note, label] of [
      [fourthNote, 'IV'],
      [fifthNote, 'V'],
      [flatSeventhNote, 'bVII'],
    ] as const) {
      const power = findChord(note, 'power');
      if (power) {
        addUnique({
          chord: power,
          relationship: `${label} power chord`,
          group: 'Strong resolution',
        });
      }
      // Also suggest the full major chord
      const major = findChord(note, 'major');
      if (major) {
        addUnique({
          chord: major,
          relationship: `${label} major`,
          group: 'Common alternatives',
        });
      }
    }
  }

  // Add color chords
  for (const s of getColorChords(root, quality)) addUnique(s);

  // Limit to 8 suggestions max
  return allSuggestions.slice(0, 8);
}
