import { useState } from 'react'
import { ChordLibrary } from './components/ChordLibrary'
import { FretboardTrainer } from './components/FretboardTrainer'
import { ScaleLibrary } from './components/ScaleLibrary'
import { RhythmPatterns } from './components/RhythmPatterns'
import { IntervalTrainer } from './components/IntervalTrainer'

type AppView = 'chords' | 'trainer' | 'scales' | 'rhythm' | 'intervals';

const NAV_ITEMS: { key: AppView; label: string }[] = [
  { key: 'chords', label: 'Chord Library' },
  { key: 'trainer', label: 'Fretboard Trainer' },
  { key: 'scales', label: 'Scale Reference' },
  { key: 'rhythm', label: 'Rhythm Patterns' },
  { key: 'intervals', label: 'Interval Trainer' },
];

function App() {
  const [view, setView] = useState<AppView>('chords');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Guitar Chords App</h1>
          <nav className="flex gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  view === item.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4 max-w-6xl">
        {view === 'chords' && <ChordLibrary />}
        {view === 'trainer' && <FretboardTrainer />}
        {view === 'scales' && <ScaleLibrary />}
        {view === 'rhythm' && <RhythmPatterns />}
        {view === 'intervals' && <IntervalTrainer />}
      </main>
    </div>
  )
}

export default App
