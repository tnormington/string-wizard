import type { Chord, ChordCategory, ChordQuality, Difficulty, NoteName } from '../types/chord';
import { chords } from '../data/chords';

/** Get all chords */
export function getAllChords(): Chord[] {
  return chords;
}

/** Get a chord by its unique ID */
export function getChordById(id: string): Chord | undefined {
  return chords.find((c) => c.id === id);
}

/** Get chords by root note */
export function getChordsByRoot(root: NoteName): Chord[] {
  return chords.filter((c) => c.root === root);
}

/** Get chords by quality (major, minor, etc.) */
export function getChordsByQuality(quality: ChordQuality): Chord[] {
  return chords.filter((c) => c.quality === quality);
}

/** Get chords by category */
export function getChordsByCategory(category: ChordCategory): Chord[] {
  return chords.filter((c) => c.category === category);
}

/** Get chords by difficulty */
export function getChordsByDifficulty(difficulty: Difficulty): Chord[] {
  return chords.filter((c) => c.difficulty === difficulty);
}

/** Search chords by name or symbol (case-insensitive) */
export function searchChords(query: string): Chord[] {
  const q = query.toLowerCase().trim();
  if (!q) return chords;
  return chords.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.symbol.toLowerCase().includes(q) ||
      c.root.toLowerCase().includes(q)
  );
}

/** Filter chords by multiple criteria */
export function filterChords(filters: {
  root?: NoteName;
  quality?: ChordQuality;
  category?: ChordCategory;
  difficulty?: Difficulty;
  search?: string;
}): Chord[] {
  let result = chords;

  if (filters.root) {
    result = result.filter((c) => c.root === filters.root);
  }
  if (filters.quality) {
    result = result.filter((c) => c.quality === filters.quality);
  }
  if (filters.category) {
    result = result.filter((c) => c.category === filters.category);
  }
  if (filters.difficulty) {
    result = result.filter((c) => c.difficulty === filters.difficulty);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }

  return result;
}

/** Get all unique root notes present in the database */
export function getAvailableRoots(): NoteName[] {
  return [...new Set(chords.map((c) => c.root))];
}

/** Get all unique qualities present in the database */
export function getAvailableQualities(): ChordQuality[] {
  return [...new Set(chords.map((c) => c.quality))];
}

/** Get all unique categories present in the database */
export function getAvailableCategories(): ChordCategory[] {
  return [...new Set(chords.map((c) => c.category))];
}

/** Human-readable label for chord quality */
export function getQualityLabel(quality: ChordQuality): string {
  const labels: Record<ChordQuality, string> = {
    major: 'Major',
    minor: 'Minor',
    dominant7: '7th',
    major7: 'Major 7th',
    minor7: 'Minor 7th',
    diminished: 'Diminished',
    augmented: 'Augmented',
    sus2: 'Sus2',
    sus4: 'Sus4',
    add9: 'Add9',
    power: 'Power',
  };
  return labels[quality];
}

/** Human-readable label for chord category */
export function getCategoryLabel(category: ChordCategory): string {
  const labels: Record<ChordCategory, string> = {
    basic: 'Basic Open',
    barre: 'Barre',
    seventh: '7th Chords',
    extended: 'Extended',
    altered: 'Altered',
    power: 'Power',
  };
  return labels[category];
}
