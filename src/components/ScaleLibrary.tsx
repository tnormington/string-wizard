import { useState } from 'react';
import { type NoteName, getScaleNotes } from '../utils/musicTheory';
import { SCALES, type ScaleCategory } from '../data/scales';
import { ScaleSelector } from './ScaleSelector';
import { ScaleInfo } from './ScaleInfo';
import { Fretboard } from './Fretboard';
import { ScalePositions } from './ScalePositions';

type ViewMode = 'full' | 'positions';

export function ScaleLibrary() {
  const [selectedRoot, setSelectedRoot] = useState<NoteName>('C');
  const [selectedScale, setSelectedScale] = useState('major');
  const [selectedCategory, setSelectedCategory] = useState<ScaleCategory | 'All'>('All');
  const [showIntervals, setShowIntervals] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('full');

  const scale = SCALES[selectedScale];
  const scaleNotes = getScaleNotes(selectedRoot, scale.intervals);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Scale Reference</h2>
        <p className="text-gray-400 mt-1">
          Explore scales, see patterns across the fretboard, and learn positions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left panel: Scale selector */}
        <div className="lg:col-span-1">
          <ScaleSelector
            selectedRoot={selectedRoot}
            selectedScale={selectedScale}
            selectedCategory={selectedCategory}
            onRootChange={setSelectedRoot}
            onScaleChange={setSelectedScale}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Right panel: Visualization */}
        <div className="lg:col-span-2 space-y-4">
          {/* Scale info */}
          <ScaleInfo scale={scale} rootNote={selectedRoot} />

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View mode toggle */}
            <div className="flex rounded-lg overflow-hidden border border-gray-600">
              <button
                onClick={() => setViewMode('full')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === 'full'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Full Neck
              </button>
              <button
                onClick={() => setViewMode('positions')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  viewMode === 'positions'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Positions
              </button>
            </div>

            {/* Interval toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showIntervals}
                  onChange={e => setShowIntervals(e.target.checked)}
                />
                <div className="w-9 h-5 bg-gray-600 peer-checked:bg-blue-600 rounded-full transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm text-gray-300">Show Intervals</span>
            </label>
          </div>

          {/* Fretboard visualization */}
          {viewMode === 'full' ? (
            <div className="overflow-x-auto">
              <Fretboard
                scaleNotes={scaleNotes}
                rootNote={selectedRoot}
                startFret={0}
                endFret={15}
                showIntervals={showIntervals}
              />
            </div>
          ) : (
            <ScalePositions
              scaleNotes={scaleNotes}
              rootNote={selectedRoot}
              showIntervals={showIntervals}
            />
          )}
        </div>
      </div>
    </div>
  );
}
