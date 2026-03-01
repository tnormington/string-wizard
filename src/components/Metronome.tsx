import { useMetronome, TIME_SIGNATURES } from '../hooks/useMetronome';
import { BeatVisualizer } from './BeatVisualizer';

export function Metronome() {
  const {
    bpm,
    isPlaying,
    currentBeat,
    timeSignature,
    accentPattern,
    volume,
    audioEnabled,
    setBpm,
    togglePlay,
    setTimeSignature,
    toggleAccent,
    setVolume,
    setAudioEnabled,
  } = useMetronome();

  const tsLabel = `${timeSignature.beats}/${timeSignature.subdivision}`;

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
      <h2 className="text-lg font-semibold text-center text-gray-300 mb-4">Metronome</h2>

      {/* BPM Display & Controls */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="text-6xl font-bold tabular-nums text-white">{bpm}</div>
        <div className="text-sm text-gray-400">BPM</div>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={() => setBpm(bpm - 1)}
            className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold flex items-center justify-center"
          >
            -
          </button>
          <input
            type="range"
            min={20}
            max={300}
            value={bpm}
            onChange={e => setBpm(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <button
            type="button"
            onClick={() => setBpm(bpm + 1)}
            className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xl font-bold flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Quick BPM presets */}
        <div className="flex gap-2">
          {[60, 80, 100, 120, 140, 160].map(preset => (
            <button
              key={preset}
              type="button"
              onClick={() => setBpm(preset)}
              className={`px-2 py-1 text-xs rounded ${
                bpm === preset
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Beat Visualizer */}
      <BeatVisualizer
        beats={timeSignature.beats}
        currentBeat={currentBeat}
        accentPattern={accentPattern}
        isPlaying={isPlaying}
        onToggleAccent={toggleAccent}
      />

      {/* Play/Stop Button */}
      <div className="flex justify-center my-4">
        <button
          type="button"
          onClick={togglePlay}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl transition-all ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/30'
              : 'bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/30'
          }`}
          aria-label={isPlaying ? 'Stop metronome' : 'Start metronome'}
        >
          {isPlaying ? '■' : '▶'}
        </button>
      </div>

      {/* Time Signature */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">
          Time Signature: <span className="text-white font-medium">{tsLabel}</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {TIME_SIGNATURES.map(ts => {
            const label = `${ts.beats}/${ts.subdivision}`;
            const isSelected = ts.beats === timeSignature.beats && ts.subdivision === timeSignature.subdivision;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setTimeSignature(ts)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Volume & Audio Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-400 mb-1">Volume</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
        </div>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              audioEnabled
                ? 'bg-sky-600 text-white'
                : 'bg-gray-700 text-gray-400'
            }`}
            title={audioEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {audioEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      {/* Accent pattern hint */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Click beat circles to toggle accent pattern
      </p>
    </div>
  );
}
