import { useState } from 'react'
import { FretboardTrainer } from './components/FretboardTrainer'
import { ScaleLibrary } from './components/ScaleLibrary'

type AppView = 'trainer' | 'scales';

const NAV_ITEMS: { key: AppView; label: string }[] = [
  { key: 'trainer', label: 'Fretboard Trainer' },
  { key: 'scales', label: 'Scale Reference' },
];

function App() {
  const [view, setView] = useState<AppView>('scales');

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
        {view === 'trainer' && <FretboardTrainer />}
        {view === 'scales' && <ScaleLibrary />}
      </main>
    </div>
  )
}

export default App
