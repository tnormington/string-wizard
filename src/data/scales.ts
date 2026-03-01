export interface ScaleDefinition {
  name: string;
  category: ScaleCategory;
  intervals: number[];
  description: string;
  commonUse: string;
}

export type ScaleCategory = 'Major' | 'Minor' | 'Pentatonic' | 'Blues' | 'Modes' | 'Exotic';

export interface ScalePosition {
  name: string;
  startFret: number;
  pattern: number[][]; // [string][frets relative to startFret]
}

export const SCALE_CATEGORIES: ScaleCategory[] = [
  'Major',
  'Minor',
  'Pentatonic',
  'Blues',
  'Modes',
  'Exotic',
];

export const SCALES: Record<string, ScaleDefinition> = {
  major: {
    name: 'Major (Ionian)',
    category: 'Major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    description: 'The foundation of Western music. Bright and happy sounding.',
    commonUse: 'Pop, Rock, Country, Classical',
  },
  naturalMinor: {
    name: 'Natural Minor (Aeolian)',
    category: 'Minor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    description: 'The natural minor scale with a dark, melancholic sound.',
    commonUse: 'Rock, Metal, Classical, Folk',
  },
  harmonicMinor: {
    name: 'Harmonic Minor',
    category: 'Minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    description: 'Minor scale with a raised 7th, creating an exotic tension.',
    commonUse: 'Classical, Metal, Flamenco, Jazz',
  },
  melodicMinor: {
    name: 'Melodic Minor',
    category: 'Minor',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    description: 'Minor scale with raised 6th and 7th for smoother melodic movement.',
    commonUse: 'Jazz, Classical, Fusion',
  },
  majorPentatonic: {
    name: 'Major Pentatonic',
    category: 'Pentatonic',
    intervals: [0, 2, 4, 7, 9],
    description: 'Five-note scale with a bright, open sound. Very versatile.',
    commonUse: 'Country, Rock, Blues, Pop, Folk',
  },
  minorPentatonic: {
    name: 'Minor Pentatonic',
    category: 'Pentatonic',
    intervals: [0, 3, 5, 7, 10],
    description: 'The most common guitar scale. Bluesy and expressive.',
    commonUse: 'Blues, Rock, Pop, R&B',
  },
  blues: {
    name: 'Blues Scale',
    category: 'Blues',
    intervals: [0, 3, 5, 6, 7, 10],
    description: 'Minor pentatonic with an added blue note (b5).',
    commonUse: 'Blues, Rock, Jazz, Funk',
  },
  majorBlues: {
    name: 'Major Blues',
    category: 'Blues',
    intervals: [0, 2, 3, 4, 7, 9],
    description: 'Major pentatonic with an added blue note (#2/b3).',
    commonUse: 'Blues, Jazz, Country, Gospel',
  },
  dorian: {
    name: 'Dorian',
    category: 'Modes',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    description: 'Minor mode with a bright 6th. Jazzy and soulful.',
    commonUse: 'Jazz, Funk, Blues, Rock',
  },
  phrygian: {
    name: 'Phrygian',
    category: 'Modes',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    description: 'Dark mode with a Spanish/flamenco character.',
    commonUse: 'Flamenco, Metal, World Music',
  },
  lydian: {
    name: 'Lydian',
    category: 'Modes',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    description: 'Bright and dreamy with a raised 4th.',
    commonUse: 'Jazz, Film Scores, Progressive Rock',
  },
  mixolydian: {
    name: 'Mixolydian',
    category: 'Modes',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    description: 'Major scale with a flat 7th. Bluesy dominant feel.',
    commonUse: 'Blues, Rock, Country, Funk',
  },
  locrian: {
    name: 'Locrian',
    category: 'Modes',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    description: 'The darkest mode with a diminished quality.',
    commonUse: 'Metal, Jazz, Experimental',
  },
  wholeTone: {
    name: 'Whole Tone',
    category: 'Exotic',
    intervals: [0, 2, 4, 6, 8, 10],
    description: 'Symmetrical scale with an ambiguous, dreamy quality.',
    commonUse: 'Jazz, Impressionist, Film',
  },
  diminished: {
    name: 'Diminished (Half-Whole)',
    category: 'Exotic',
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
    description: 'Symmetrical scale alternating half and whole steps.',
    commonUse: 'Jazz, Fusion, Metal',
  },
  phrygianDominant: {
    name: 'Phrygian Dominant',
    category: 'Exotic',
    intervals: [0, 1, 4, 5, 7, 8, 10],
    description: 'Phrygian mode with a major 3rd. Middle Eastern flavor.',
    commonUse: 'Flamenco, Middle Eastern, Metal',
  },
  hungarian: {
    name: 'Hungarian Minor',
    category: 'Exotic',
    intervals: [0, 2, 3, 6, 7, 8, 11],
    description: 'Double harmonic minor with augmented intervals.',
    commonUse: 'Classical, World Music, Metal',
  },
  japanese: {
    name: 'Japanese (In Sen)',
    category: 'Exotic',
    intervals: [0, 1, 5, 7, 10],
    description: 'Japanese pentatonic scale with a haunting quality.',
    commonUse: 'World Music, Ambient, Film',
  },
};

export function getScalesByCategory(category: ScaleCategory): [string, ScaleDefinition][] {
  return Object.entries(SCALES).filter(([, scale]) => scale.category === category);
}
