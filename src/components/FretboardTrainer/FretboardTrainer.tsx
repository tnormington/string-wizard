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
    <section aria-label="Fretboard Trainer" className="space-y-4 sm:space-y-6">
      {/* Mode selector */}
      <div className="flex gap-2 sm:gap-3 justify-center" role="radiogroup" aria-label="Quiz mode">
        {MODE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => trainer.setMode(opt.value)}
            role="radio"
            aria-checked={trainer.mode === opt.value}
            className={`px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-colors ${
              trainer.mode === opt.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-center text-gray-500 dark:text-gray-400 text-sm px-4">
        {MODE_OPTIONS.find((o) => o.value === trainer.mode)?.description}
      </p>

      {/* Start / Stats bar */}
      {!trainer.isActive ? (
        <div className="text-center">
          <button
            onClick={trainer.start}
            className="px-8 py-3.5 sm:py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-lg font-semibold transition-colors"
          >
            Start Training
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:flex sm:justify-center sm:gap-6 text-sm">
          <Stat label="Score" value={`${trainer.score}/${trainer.total}`} />
          <Stat label="Accuracy" value={`${accuracy}%`} />
          <Stat label="Streak" value={String(trainer.streak)} highlight={trainer.streak >= 5} />
          <Stat label="Best" value={String(trainer.bestStreak)} />
        </div>
      )}

      {/* Locate mode: show target note prominently */}
      {trainer.isActive && trainer.mode === 'locate' && trainer.targetNote && (
        <div className="text-center" role="status" aria-label={`Find the note ${trainer.targetNote} on the fretboard`}>
          <span className="text-4xl sm:text-5xl font-bold text-primary-400">{trainer.targetNote}</span>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Tap the fretboard to find this note</p>
        </div>
      )}

      {/* Fretboard */}
      <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0 touch-pan-x">
        <Fretboard
          highlightPosition={trainer.mode === 'identify' ? trainer.targetPosition : null}
          feedback={trainer.feedback}
          onFretClick={trainer.mode === 'locate' ? trainer.answerPosition : undefined}
          interactive={trainer.mode === 'locate' && trainer.isActive}
        />
      </div>

      {/* Identify mode: note picker */}
      {trainer.isActive && trainer.mode === 'identify' && (
        <div className="space-y-3" role="group" aria-label="Note selection">
          {trainer.targetPosition && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
              String {STRING_LABELS[trainer.targetPosition.stringIndex]}, Fret{' '}
              {trainer.targetPosition.fret}
            </p>
          )}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2 max-w-sm sm:max-w-md mx-auto">
            {NOTES.map((note) => (
              <button
                key={note}
                onClick={() => trainer.answerNote(note)}
                disabled={!!trainer.feedback}
                aria-label={`Note ${note}`}
                className={`h-12 sm:h-12 rounded-lg font-bold text-sm transition-colors ${
                  trainer.feedback
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-primary-600 hover:text-white active:bg-primary-500'
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
          role="alert"
          className={`text-center text-lg font-semibold ${
            trainer.feedback === 'correct' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {trainer.feedback === 'correct' ? 'Correct!' : `Wrong! ${trainer.correctAnswer ?? ''}`}
        </div>
      )}
    </section>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-base sm:text-lg font-bold ${highlight ? 'text-yellow-400' : 'text-gray-900 dark:text-white'}`}>
        {value}
      </div>
      <div className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}
