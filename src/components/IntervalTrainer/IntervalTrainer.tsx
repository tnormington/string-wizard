import { useCallback, useEffect } from 'react';
import { useIntervalTrainer } from '../../hooks/useIntervalTrainer';
import { type Difficulty, type Interval, type PlayDirection, midiToNoteName } from '../../types/intervals';

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const DIRECTION_OPTIONS: { value: PlayDirection; label: string }[] = [
  { value: 'ascending', label: 'Ascending' },
  { value: 'descending', label: 'Descending' },
  { value: 'harmonic', label: 'Harmonic' },
];

export function IntervalTrainer() {
  const {
    difficulty,
    setDifficulty,
    direction,
    setDirection,
    currentQuestion,
    availableIntervals,
    showAnswer,
    selectedAnswer,
    isPlaying,
    stats,
    playCurrentInterval,
    startNewQuestion,
    submitAnswer,
    resetSession,
  } = useIntervalTrainer();

  // Keyboard shortcuts — uses capture phase so quiz-specific keys
  // (Space, number keys) are handled before global shortcuts.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Skip when user is typing in an input/textarea/select
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!currentQuestion) {
          startNewQuestion();
        } else if (showAnswer) {
          startNewQuestion();
        } else {
          playCurrentInterval();
        }
        return;
      }
      // Number keys for answer selection (only during active quiz)
      if (currentQuestion && !showAnswer) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= availableIntervals.length) {
          e.preventDefault();
          e.stopImmediatePropagation();
          submitAnswer(availableIntervals[num - 1]);
        }
      }
    },
    [currentQuestion, showAnswer, availableIntervals, startNewQuestion, playCurrentInterval, submitAnswer],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, true); // capture phase
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [handleKeyDown]);

  const accuracy = stats.totalQuestions > 0
    ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
    : 0;

  return (
    <section aria-label="Interval Trainer" className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Interval Trainer</h2>
        <p className="text-gray-400">Train your ear to recognize musical intervals</p>
      </div>

      {/* Settings */}
      <div className="bg-gray-800 rounded-lg p-4 space-y-4" role="group" aria-label="Training settings">
        <div className="flex flex-wrap gap-4">
          {/* Difficulty selector */}
          <div className="flex-1 min-w-[200px]">
            <span id="difficulty-label" className="block text-sm font-medium text-gray-300 mb-2">Difficulty</span>
            <div className="flex gap-2" role="radiogroup" aria-labelledby="difficulty-label">
              {DIFFICULTY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setDifficulty(opt.value); resetSession(); }}
                  role="radio"
                  aria-checked={difficulty === opt.value}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    difficulty === opt.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direction selector */}
          <div className="flex-1 min-w-[200px]">
            <span id="direction-label" className="block text-sm font-medium text-gray-300 mb-2">Direction</span>
            <div className="flex gap-2" role="radiogroup" aria-labelledby="direction-label">
              {DIRECTION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDirection(opt.value)}
                  role="radio"
                  aria-checked={direction === opt.value}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    direction === opt.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      {stats.totalQuestions > 0 && (
        <div className="bg-gray-800 rounded-lg p-4" role="region" aria-label="Training statistics">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{stats.correctAnswers}/{stats.totalQuestions}</div>
              <div className="text-xs text-gray-400">Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
              <div className="text-xs text-gray-400">Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.streak}</div>
              <div className="text-xs text-gray-400">Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.bestStreak}</div>
              <div className="text-xs text-gray-400">Best Streak</div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz area */}
      {!currentQuestion ? (
        <div className="text-center py-12">
          <button
            onClick={startNewQuestion}
            className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg text-lg transition-colors"
          >
            Start Training
          </button>
          <p className="text-gray-500 mt-3 text-sm">Press <kbd className="px-2 py-1 bg-gray-700 rounded text-gray-300">Space</kbd> to start</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Play button and note info */}
          <div className="bg-gray-800 rounded-lg p-6 text-center space-y-4">
            <div className="text-gray-400 text-sm">
              Root note: <span className="text-white font-medium">{midiToNoteName(currentQuestion.rootNote)}</span>
              {' '}&middot;{' '}
              <span className="capitalize">{currentQuestion.direction}</span>
            </div>
            <button
              onClick={playCurrentInterval}
              disabled={isPlaying}
              aria-label={isPlaying ? 'Playing interval audio' : 'Replay interval audio'}
              className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all ${
                isPlaying
                  ? 'bg-primary-800 text-primary-300 cursor-not-allowed animate-pulse'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {isPlaying ? 'Playing...' : 'Replay Interval'}
            </button>
            <p className="text-gray-500 text-xs">
              Press <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Space</kbd> to replay
            </p>
          </div>

          {/* Answer choices */}
          <div role="group" aria-label="Answer choices">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              {showAnswer ? 'Result' : 'What interval is this?'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableIntervals.map((interval, index) => (
                <AnswerButton
                  key={interval.semitones}
                  interval={interval}
                  index={index}
                  showAnswer={showAnswer}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={currentQuestion.interval}
                  onClick={() => submitAnswer(interval)}
                />
              ))}
            </div>
          </div>

          {/* Show answer feedback and next button */}
          {showAnswer && (
            <div className="text-center space-y-4" role="alert">
              <div
                className={`text-xl font-bold ${
                  selectedAnswer?.semitones === currentQuestion.interval.semitones
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {selectedAnswer?.semitones === currentQuestion.interval.semitones
                  ? 'Correct!'
                  : `Incorrect — it was ${currentQuestion.interval.name}`}
              </div>
              <button
                onClick={startNewQuestion}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                Next Question
              </button>
              <p className="text-gray-500 text-xs">
                Press <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-gray-300">Space</kbd> for next
              </p>
            </div>
          )}
        </div>
      )}

      {/* Reset button */}
      {stats.totalQuestions > 0 && (
        <div className="text-center">
          <button
            onClick={resetSession}
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            Reset Session
          </button>
        </div>
      )}
    </section>
  );
}

function AnswerButton({
  interval,
  index,
  showAnswer,
  selectedAnswer,
  correctAnswer,
  onClick,
}: {
  interval: Interval;
  index: number;
  showAnswer: boolean;
  selectedAnswer: Interval | null;
  correctAnswer: Interval;
  onClick: () => void;
}) {
  const isSelected = selectedAnswer?.semitones === interval.semitones;
  const isCorrect = interval.semitones === correctAnswer.semitones;

  let bgClass = 'bg-gray-700 hover:bg-gray-600 text-white';
  if (showAnswer) {
    if (isCorrect) {
      bgClass = 'bg-green-700 text-white ring-2 ring-green-400';
    } else if (isSelected && !isCorrect) {
      bgClass = 'bg-red-700 text-white ring-2 ring-red-400';
    } else {
      bgClass = 'bg-gray-800 text-gray-500';
    }
  }

  const ariaLabel = showAnswer
    ? `${interval.name}${isCorrect ? ' (correct answer)' : ''}${isSelected && !isCorrect ? ' (your incorrect answer)' : ''}`
    : `Option ${index + 1}: ${interval.name}`;

  return (
    <button
      onClick={onClick}
      disabled={showAnswer}
      aria-label={ariaLabel}
      className={`p-3 rounded-lg font-medium transition-all ${bgClass} ${
        showAnswer ? 'cursor-default' : ''
      }`}
    >
      <span className="text-xs text-gray-400 mr-1" aria-hidden="true">{index + 1}.</span>
      {interval.name}
      <span className="block text-xs opacity-60">{interval.shortName}</span>
    </button>
  );
}
