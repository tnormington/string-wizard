import { NOTES, type NoteName } from '../utils/musicTheory';
import { SCALES, SCALE_CATEGORIES, getScalesByCategory, type ScaleCategory } from '../data/scales';

interface ScaleSelectorProps {
  selectedRoot: NoteName;
  selectedScale: string;
  selectedCategory: ScaleCategory | 'All';
  onRootChange: (root: NoteName) => void;
  onScaleChange: (scaleKey: string) => void;
  onCategoryChange: (category: ScaleCategory | 'All') => void;
}

export function ScaleSelector({
  selectedRoot,
  selectedScale,
  selectedCategory,
  onRootChange,
  onScaleChange,
  onCategoryChange,
}: ScaleSelectorProps) {
  const filteredScales = selectedCategory === 'All'
    ? Object.entries(SCALES)
    : getScalesByCategory(selectedCategory);

  return (
    <div className="space-y-4" role="group" aria-label="Scale selection">
      {/* Root note selector */}
      <div>
        <span id="root-note-label" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Root Note</span>
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-1.5" role="radiogroup" aria-labelledby="root-note-label">
          {NOTES.map(note => (
            <button
              key={note}
              onClick={() => onRootChange(note)}
              role="radio"
              aria-checked={selectedRoot === note}
              className={`px-3 py-2 sm:py-1.5 rounded text-sm font-medium transition-colors ${
                selectedRoot === note
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div>
        <span id="category-label" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Category</span>
        <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-labelledby="category-label">
          <button
            onClick={() => onCategoryChange('All')}
            role="radio"
            aria-checked={selectedCategory === 'All'}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {SCALE_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              role="radio"
              aria-checked={selectedCategory === category}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Scale list */}
      <div>
        <span id="scale-list-label" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Scale</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 sm:max-h-64 overflow-y-auto pr-1 -webkit-overflow-scrolling-touch" role="listbox" aria-labelledby="scale-list-label">
          {filteredScales.map(([key, scale]) => (
            <button
              key={key}
              onClick={() => onScaleChange(key)}
              role="option"
              aria-selected={selectedScale === key}
              className={`text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedScale === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="font-medium">{scale.name}</span>
              <span className="block text-xs mt-0.5 opacity-70">{scale.category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
