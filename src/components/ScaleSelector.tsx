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
    <div className="space-y-4">
      {/* Root note selector */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Root Note</label>
        <div className="flex flex-wrap gap-1.5">
          {NOTES.map(note => (
            <button
              key={note}
              onClick={() => onRootChange(note)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                selectedRoot === note
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {note}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          {SCALE_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Scale list */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Scale</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
          {filteredScales.map(([key, scale]) => (
            <button
              key={key}
              onClick={() => onScaleChange(key)}
              className={`text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedScale === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600'
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
