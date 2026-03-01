import type { Chord } from '../types/chord';

export const chords: Chord[] = [
  // ============================================
  // MAJOR CHORDS
  // ============================================
  {
    id: 'C_major',
    root: 'C',
    quality: 'major',
    name: 'C Major',
    symbol: 'C',
    category: 'basic',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 3, 2, 0, 1, 0],
        fingers: [0, 3, 2, 0, 1, 0],
        baseFret: 1,
      },
      {
        frets: [-1, 3, 5, 5, 5, 3],
        fingers: [0, 1, 3, 3, 3, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 5],
      },
    ],
    notes: ['C', 'E', 'G'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'D_major',
    root: 'D',
    quality: 'major',
    name: 'D Major',
    symbol: 'D',
    category: 'basic',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 0, 2, 3, 2],
        fingers: [0, 0, 0, 1, 3, 2],
        baseFret: 1,
      },
    ],
    notes: ['D', 'F#', 'A'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'E_major',
    root: 'E',
    quality: 'major',
    name: 'E Major',
    symbol: 'E',
    category: 'basic',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [0, 2, 2, 1, 0, 0],
        fingers: [0, 2, 3, 1, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['E', 'G#', 'B'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'F_major',
    root: 'F',
    quality: 'major',
    name: 'F Major',
    symbol: 'F',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [1, 3, 3, 2, 1, 1],
        fingers: [1, 3, 4, 2, 1, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 6],
      },
      {
        frets: [-1, -1, 3, 2, 1, 1],
        fingers: [0, 0, 3, 2, 1, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 2],
      },
    ],
    notes: ['F', 'A', 'C'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'G_major',
    root: 'G',
    quality: 'major',
    name: 'G Major',
    symbol: 'G',
    category: 'basic',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [3, 2, 0, 0, 0, 3],
        fingers: [2, 1, 0, 0, 0, 3],
        baseFret: 1,
      },
      {
        frets: [3, 2, 0, 0, 3, 3],
        fingers: [2, 1, 0, 0, 3, 4],
        baseFret: 1,
      },
    ],
    notes: ['G', 'B', 'D'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'A_major',
    root: 'A',
    quality: 'major',
    name: 'A Major',
    symbol: 'A',
    category: 'basic',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 0, 2, 2, 2, 0],
        fingers: [0, 0, 1, 2, 3, 0],
        baseFret: 1,
      },
    ],
    notes: ['A', 'C#', 'E'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'B_major',
    root: 'B',
    quality: 'major',
    name: 'B Major',
    symbol: 'B',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [-1, 2, 4, 4, 4, 2],
        fingers: [0, 1, 3, 3, 3, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 5],
      },
    ],
    notes: ['B', 'D#', 'F#'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'Bb_major',
    root: 'Bb',
    quality: 'major',
    name: 'Bb Major',
    symbol: 'Bb',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [1, 1, 3, 3, 3, 1],
        fingers: [1, 1, 2, 3, 4, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 6],
      },
    ],
    notes: ['Bb', 'D', 'F'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'Eb_major',
    root: 'Eb',
    quality: 'major',
    name: 'Eb Major',
    symbol: 'Eb',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [-1, -1, 1, 3, 4, 3],
        fingers: [0, 0, 1, 2, 4, 3],
        baseFret: 1,
      },
    ],
    notes: ['Eb', 'G', 'Bb'],
    intervals: ['1', '3', '5'],
  },
  {
    id: 'Ab_major',
    root: 'Ab',
    quality: 'major',
    name: 'Ab Major',
    symbol: 'Ab',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [4, 6, 6, 5, 4, 4],
        fingers: [1, 3, 4, 2, 1, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 6],
      },
    ],
    notes: ['Ab', 'C', 'Eb'],
    intervals: ['1', '3', '5'],
  },

  // ============================================
  // MINOR CHORDS
  // ============================================
  {
    id: 'Am_minor',
    root: 'A',
    quality: 'minor',
    name: 'A Minor',
    symbol: 'Am',
    category: 'basic',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 0, 2, 2, 1, 0],
        fingers: [0, 0, 2, 3, 1, 0],
        baseFret: 1,
      },
    ],
    notes: ['A', 'C', 'E'],
    intervals: ['1', 'b3', '5'],
  },
  {
    id: 'Bm_minor',
    root: 'B',
    quality: 'minor',
    name: 'B Minor',
    symbol: 'Bm',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [-1, 2, 4, 4, 3, 2],
        fingers: [0, 1, 3, 4, 2, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 5],
      },
    ],
    notes: ['B', 'D', 'F#'],
    intervals: ['1', 'b3', '5'],
  },
  {
    id: 'Cm_minor',
    root: 'C',
    quality: 'minor',
    name: 'C Minor',
    symbol: 'Cm',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [-1, 3, 5, 5, 4, 3],
        fingers: [0, 1, 3, 4, 2, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 5],
      },
    ],
    notes: ['C', 'Eb', 'G'],
    intervals: ['1', 'b3', '5'],
  },
  {
    id: 'Dm_minor',
    root: 'D',
    quality: 'minor',
    name: 'D Minor',
    symbol: 'Dm',
    category: 'basic',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 0, 2, 3, 1],
        fingers: [0, 0, 0, 2, 3, 1],
        baseFret: 1,
      },
    ],
    notes: ['D', 'F', 'A'],
    intervals: ['1', 'b3', '5'],
  },
  {
    id: 'Em_minor',
    root: 'E',
    quality: 'minor',
    name: 'E Minor',
    symbol: 'Em',
    category: 'basic',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [0, 2, 2, 0, 0, 0],
        fingers: [0, 2, 3, 0, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['E', 'G', 'B'],
    intervals: ['1', 'b3', '5'],
  },
  {
    id: 'Fm_minor',
    root: 'F',
    quality: 'minor',
    name: 'F Minor',
    symbol: 'Fm',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [1, 3, 3, 1, 1, 1],
        fingers: [1, 3, 4, 1, 1, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 6],
      },
    ],
    notes: ['F', 'Ab', 'C'],
    intervals: ['1', 'b3', '5'],
  },
  {
    id: 'Gm_minor',
    root: 'G',
    quality: 'minor',
    name: 'G Minor',
    symbol: 'Gm',
    category: 'barre',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [3, 5, 5, 3, 3, 3],
        fingers: [1, 3, 4, 1, 1, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 6],
      },
    ],
    notes: ['G', 'Bb', 'D'],
    intervals: ['1', 'b3', '5'],
  },

  // ============================================
  // DOMINANT 7TH CHORDS
  // ============================================
  {
    id: 'A7_dominant7',
    root: 'A',
    quality: 'dominant7',
    name: 'A Dominant 7th',
    symbol: 'A7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 0, 2, 0, 2, 0],
        fingers: [0, 0, 1, 0, 2, 0],
        baseFret: 1,
      },
    ],
    notes: ['A', 'C#', 'E', 'G'],
    intervals: ['1', '3', '5', 'b7'],
  },
  {
    id: 'B7_dominant7',
    root: 'B',
    quality: 'dominant7',
    name: 'B Dominant 7th',
    symbol: 'B7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 2, 1, 2, 0, 2],
        fingers: [0, 2, 1, 3, 0, 4],
        baseFret: 1,
      },
    ],
    notes: ['B', 'D#', 'F#', 'A'],
    intervals: ['1', '3', '5', 'b7'],
  },
  {
    id: 'C7_dominant7',
    root: 'C',
    quality: 'dominant7',
    name: 'C Dominant 7th',
    symbol: 'C7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 3, 2, 3, 1, 0],
        fingers: [0, 3, 2, 4, 1, 0],
        baseFret: 1,
      },
    ],
    notes: ['C', 'E', 'G', 'Bb'],
    intervals: ['1', '3', '5', 'b7'],
  },
  {
    id: 'D7_dominant7',
    root: 'D',
    quality: 'dominant7',
    name: 'D Dominant 7th',
    symbol: 'D7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 0, 2, 1, 2],
        fingers: [0, 0, 0, 2, 1, 3],
        baseFret: 1,
      },
    ],
    notes: ['D', 'F#', 'A', 'C'],
    intervals: ['1', '3', '5', 'b7'],
  },
  {
    id: 'E7_dominant7',
    root: 'E',
    quality: 'dominant7',
    name: 'E Dominant 7th',
    symbol: 'E7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [0, 2, 0, 1, 0, 0],
        fingers: [0, 2, 0, 1, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['E', 'G#', 'B', 'D'],
    intervals: ['1', '3', '5', 'b7'],
  },
  {
    id: 'G7_dominant7',
    root: 'G',
    quality: 'dominant7',
    name: 'G Dominant 7th',
    symbol: 'G7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [3, 2, 0, 0, 0, 1],
        fingers: [3, 2, 0, 0, 0, 1],
        baseFret: 1,
      },
    ],
    notes: ['G', 'B', 'D', 'F'],
    intervals: ['1', '3', '5', 'b7'],
  },

  // ============================================
  // MAJOR 7TH CHORDS
  // ============================================
  {
    id: 'Cmaj7_major7',
    root: 'C',
    quality: 'major7',
    name: 'C Major 7th',
    symbol: 'Cmaj7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 3, 2, 0, 0, 0],
        fingers: [0, 3, 2, 0, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['C', 'E', 'G', 'B'],
    intervals: ['1', '3', '5', '7'],
  },
  {
    id: 'Dmaj7_major7',
    root: 'D',
    quality: 'major7',
    name: 'D Major 7th',
    symbol: 'Dmaj7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 0, 2, 2, 2],
        fingers: [0, 0, 0, 1, 2, 3],
        baseFret: 1,
      },
    ],
    notes: ['D', 'F#', 'A', 'C#'],
    intervals: ['1', '3', '5', '7'],
  },
  {
    id: 'Fmaj7_major7',
    root: 'F',
    quality: 'major7',
    name: 'F Major 7th',
    symbol: 'Fmaj7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 3, 2, 1, 0],
        fingers: [0, 0, 3, 2, 1, 0],
        baseFret: 1,
      },
    ],
    notes: ['F', 'A', 'C', 'E'],
    intervals: ['1', '3', '5', '7'],
  },
  {
    id: 'Gmaj7_major7',
    root: 'G',
    quality: 'major7',
    name: 'G Major 7th',
    symbol: 'Gmaj7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [3, 2, 0, 0, 0, 2],
        fingers: [2, 1, 0, 0, 0, 3],
        baseFret: 1,
      },
    ],
    notes: ['G', 'B', 'D', 'F#'],
    intervals: ['1', '3', '5', '7'],
  },
  {
    id: 'Amaj7_major7',
    root: 'A',
    quality: 'major7',
    name: 'A Major 7th',
    symbol: 'Amaj7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 0, 2, 1, 2, 0],
        fingers: [0, 0, 2, 1, 3, 0],
        baseFret: 1,
      },
    ],
    notes: ['A', 'C#', 'E', 'G#'],
    intervals: ['1', '3', '5', '7'],
  },

  // ============================================
  // MINOR 7TH CHORDS
  // ============================================
  {
    id: 'Am7_minor7',
    root: 'A',
    quality: 'minor7',
    name: 'A Minor 7th',
    symbol: 'Am7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 0, 2, 0, 1, 0],
        fingers: [0, 0, 2, 0, 1, 0],
        baseFret: 1,
      },
    ],
    notes: ['A', 'C', 'E', 'G'],
    intervals: ['1', 'b3', '5', 'b7'],
  },
  {
    id: 'Bm7_minor7',
    root: 'B',
    quality: 'minor7',
    name: 'B Minor 7th',
    symbol: 'Bm7',
    category: 'seventh',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [-1, 2, 0, 2, 0, 2],
        fingers: [0, 1, 0, 2, 0, 3],
        baseFret: 1,
      },
    ],
    notes: ['B', 'D', 'F#', 'A'],
    intervals: ['1', 'b3', '5', 'b7'],
  },
  {
    id: 'Dm7_minor7',
    root: 'D',
    quality: 'minor7',
    name: 'D Minor 7th',
    symbol: 'Dm7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 0, 2, 1, 1],
        fingers: [0, 0, 0, 2, 1, 1],
        baseFret: 1,
        barre: 1,
        barreStrings: [1, 2],
      },
    ],
    notes: ['D', 'F', 'A', 'C'],
    intervals: ['1', 'b3', '5', 'b7'],
  },
  {
    id: 'Em7_minor7',
    root: 'E',
    quality: 'minor7',
    name: 'E Minor 7th',
    symbol: 'Em7',
    category: 'seventh',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [0, 2, 0, 0, 0, 0],
        fingers: [0, 1, 0, 0, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['E', 'G', 'B', 'D'],
    intervals: ['1', 'b3', '5', 'b7'],
  },

  // ============================================
  // SUS2 CHORDS
  // ============================================
  {
    id: 'Asus2_sus2',
    root: 'A',
    quality: 'sus2',
    name: 'A Suspended 2nd',
    symbol: 'Asus2',
    category: 'extended',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 0, 2, 2, 0, 0],
        fingers: [0, 0, 1, 2, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['A', 'B', 'E'],
    intervals: ['1', '2', '5'],
  },
  {
    id: 'Dsus2_sus2',
    root: 'D',
    quality: 'sus2',
    name: 'D Suspended 2nd',
    symbol: 'Dsus2',
    category: 'extended',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 0, 2, 3, 0],
        fingers: [0, 0, 0, 1, 2, 0],
        baseFret: 1,
      },
    ],
    notes: ['D', 'E', 'A'],
    intervals: ['1', '2', '5'],
  },
  {
    id: 'Esus2_sus2',
    root: 'E',
    quality: 'sus2',
    name: 'E Suspended 2nd',
    symbol: 'Esus2',
    category: 'extended',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [0, 2, 4, 4, 0, 0],
        fingers: [0, 1, 3, 4, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['E', 'F#', 'B'],
    intervals: ['1', '2', '5'],
  },

  // ============================================
  // SUS4 CHORDS
  // ============================================
  {
    id: 'Asus4_sus4',
    root: 'A',
    quality: 'sus4',
    name: 'A Suspended 4th',
    symbol: 'Asus4',
    category: 'extended',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 0, 2, 2, 3, 0],
        fingers: [0, 0, 1, 2, 3, 0],
        baseFret: 1,
      },
    ],
    notes: ['A', 'D', 'E'],
    intervals: ['1', '4', '5'],
  },
  {
    id: 'Dsus4_sus4',
    root: 'D',
    quality: 'sus4',
    name: 'D Suspended 4th',
    symbol: 'Dsus4',
    category: 'extended',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 0, 2, 3, 3],
        fingers: [0, 0, 0, 1, 2, 3],
        baseFret: 1,
      },
    ],
    notes: ['D', 'G', 'A'],
    intervals: ['1', '4', '5'],
  },
  {
    id: 'Esus4_sus4',
    root: 'E',
    quality: 'sus4',
    name: 'E Suspended 4th',
    symbol: 'Esus4',
    category: 'extended',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [0, 2, 2, 2, 0, 0],
        fingers: [0, 1, 2, 3, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['E', 'A', 'B'],
    intervals: ['1', '4', '5'],
  },

  // ============================================
  // DIMINISHED CHORDS
  // ============================================
  {
    id: 'Bdim_diminished',
    root: 'B',
    quality: 'diminished',
    name: 'B Diminished',
    symbol: 'Bdim',
    category: 'altered',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [-1, 2, 3, 4, 3, -1],
        fingers: [0, 1, 2, 4, 3, 0],
        baseFret: 1,
      },
    ],
    notes: ['B', 'D', 'F'],
    intervals: ['1', 'b3', 'b5'],
  },
  {
    id: 'Cdim_diminished',
    root: 'C',
    quality: 'diminished',
    name: 'C Diminished',
    symbol: 'Cdim',
    category: 'altered',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [-1, 3, 4, 5, 4, -1],
        fingers: [0, 1, 2, 4, 3, 0],
        baseFret: 1,
      },
    ],
    notes: ['C', 'Eb', 'Gb'],
    intervals: ['1', 'b3', 'b5'],
  },

  // ============================================
  // AUGMENTED CHORDS
  // ============================================
  {
    id: 'Caug_augmented',
    root: 'C',
    quality: 'augmented',
    name: 'C Augmented',
    symbol: 'C+',
    category: 'altered',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [-1, 3, 2, 1, 1, 0],
        fingers: [0, 4, 3, 1, 2, 0],
        baseFret: 1,
      },
    ],
    notes: ['C', 'E', 'G#'],
    intervals: ['1', '3', '#5'],
  },
  {
    id: 'Eaug_augmented',
    root: 'E',
    quality: 'augmented',
    name: 'E Augmented',
    symbol: 'E+',
    category: 'altered',
    difficulty: 'intermediate',
    voicings: [
      {
        frets: [0, 3, 2, 1, 1, 0],
        fingers: [0, 4, 3, 1, 2, 0],
        baseFret: 1,
      },
    ],
    notes: ['E', 'G#', 'C'],
    intervals: ['1', '3', '#5'],
  },

  // ============================================
  // ADD9 CHORDS
  // ============================================
  {
    id: 'Cadd9_add9',
    root: 'C',
    quality: 'add9',
    name: 'C Add 9',
    symbol: 'Cadd9',
    category: 'extended',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 3, 2, 0, 3, 0],
        fingers: [0, 2, 1, 0, 3, 0],
        baseFret: 1,
      },
    ],
    notes: ['C', 'E', 'G', 'D'],
    intervals: ['1', '3', '5', '9'],
  },
  {
    id: 'Gadd9_add9',
    root: 'G',
    quality: 'add9',
    name: 'G Add 9',
    symbol: 'Gadd9',
    category: 'extended',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [3, 0, 0, 0, 0, 3],
        fingers: [2, 0, 0, 0, 0, 3],
        baseFret: 1,
      },
    ],
    notes: ['G', 'B', 'D', 'A'],
    intervals: ['1', '3', '5', '9'],
  },

  // ============================================
  // POWER CHORDS
  // ============================================
  {
    id: 'E5_power',
    root: 'E',
    quality: 'power',
    name: 'E Power Chord',
    symbol: 'E5',
    category: 'power',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [0, 2, 2, -1, -1, -1],
        fingers: [0, 1, 2, 0, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['E', 'B'],
    intervals: ['1', '5'],
  },
  {
    id: 'A5_power',
    root: 'A',
    quality: 'power',
    name: 'A Power Chord',
    symbol: 'A5',
    category: 'power',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 0, 2, 2, -1, -1],
        fingers: [0, 0, 1, 2, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['A', 'E'],
    intervals: ['1', '5'],
  },
  {
    id: 'G5_power',
    root: 'G',
    quality: 'power',
    name: 'G Power Chord',
    symbol: 'G5',
    category: 'power',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [3, 5, 5, -1, -1, -1],
        fingers: [1, 3, 4, 0, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['G', 'D'],
    intervals: ['1', '5'],
  },
  {
    id: 'D5_power',
    root: 'D',
    quality: 'power',
    name: 'D Power Chord',
    symbol: 'D5',
    category: 'power',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, -1, 0, 2, 3, -1],
        fingers: [0, 0, 0, 1, 2, 0],
        baseFret: 1,
      },
    ],
    notes: ['D', 'A'],
    intervals: ['1', '5'],
  },
  {
    id: 'C5_power',
    root: 'C',
    quality: 'power',
    name: 'C Power Chord',
    symbol: 'C5',
    category: 'power',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [-1, 3, 5, 5, -1, -1],
        fingers: [0, 1, 3, 4, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['C', 'G'],
    intervals: ['1', '5'],
  },
  {
    id: 'F5_power',
    root: 'F',
    quality: 'power',
    name: 'F Power Chord',
    symbol: 'F5',
    category: 'power',
    difficulty: 'beginner',
    voicings: [
      {
        frets: [1, 3, 3, -1, -1, -1],
        fingers: [1, 3, 4, 0, 0, 0],
        baseFret: 1,
      },
    ],
    notes: ['F', 'C'],
    intervals: ['1', '5'],
  },
];
