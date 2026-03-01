import { Fretboard } from './Fretboard';
import { useFretboardTrainer, QuizMode } from '../../hooks/useFretboardTrainer';
import { NOTES, STRING_LABELS } from '../../utils/music';

const MODE_OPTIONS: { value: QuizMode; label: string; description: string }[] = [
  {
    value: 'identify',
    label: 'Name the Note',
    description: 'A position is highlighted — tap the correct note name.',
  },
  {
    value: 'locate',
    label: 'Find the Note',
    description: 'A note is shown — tap the correct fretboard position.',
  },
];

export function FretboardTrainer() {
  const trainer = useFretboardTrainer();

  const accuracy = trainer.total > 0 ? Math.round((trainer.score / trainer.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="flex gap-3 justify-center">
        {MODE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => trainer.setMode(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              trainer.mode === opt.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-center text-gray-400 text-sm">
        {MODE_OPTIONS.find((o) => o.value === trainer.mode)?.description}
      </p>

      {/* Start / Stats bar */}
      {!trainer.isActive ? (
        <div className="text-center">
          <button
            onClick={trainer.start}
            className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-lg font-semibold transition-colors"
          >
            Start Training
          </button>
        </div>
      ) : (
        <div className="flex justify-center gap-6 text-sm">
          <Stat label="Score" value={`${trainer.score}/${trainer.total}`} />
          <Stat label="Accuracy" value={`${accuracy}%`} />
          <Stat label="Streak" value={String(trainer.streak)} highlight={trainer.streak >= 5} />
          <Stat label="Best" value={String(trainer.bestStreak)} />
        </div>
      )}

      {/* Locate mode: show target note prominently */}
      {trainer.isActive && trainer.mode === 'locate' && trainer.targetNote && (
        <div className="text-center">
          <span className="text-5xl font-bold text-primary-400">{trainer.targetNote}</span>
          <p className="text-gray-400 text-sm mt-1">Tap the fretboard to find this note</p>
        </div>
      )}

      {/* Fretboard */}
      <div className="overflow-x-auto">
        <Fretboard
          highlightPosition={trainer.mode === 'identify' ? trainer.targetPosition : null}
          feedback={trainer.feedback}
          onFretClick={trainer.mode === 'locate' ? trainer.answerPosition : undefined}
          interactive={trainer.mode === 'locate' && trainer.isActive}
        />
      </div>

      {/* Identify mode: note picker */}
      {trainer.isActive && trainer.mode === 'identify' && (
        <div className="space-y-3">
          {trainer.targetPosition && (
            <p className="text-center text-gray-400 text-sm">
              String {STRING_LABELS[trainer.targetPosition.stringIndex]}, Fret{' '}
              {trainer.targetPosition.fret}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-2">
            {NOTES.map((note) => (
              <button
                key={note}
                onClick={() => trainer.answerNote(note)}
                disabled={!!trainer.feedback}
                className={`w-12 h-12 rounded-lg font-bold text-sm transition-colors ${
                  trainer.feedback
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-primary-600 active:bg-primary-500'
                }`}
              >
                {note}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {trainer.feedback && (
        <div
          className={`text-center text-lg font-semibold ${
            trainer.feedback === 'correct' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {trainer.feedback === 'correct' ? 'Correct!' : `Wrong! ${trainer.correctAnswer ?? ''}`}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${highlight ? 'text-yellow-400' : 'text-white'}`}>
        {value}
      </div>
      <div className="text-gray-500 text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}
