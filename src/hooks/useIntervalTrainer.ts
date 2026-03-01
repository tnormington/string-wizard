import { useState, useCallback, useRef } from 'react';
import {
  type Interval,
  type PlayDirection,
  type Difficulty,
  type QuizQuestion,
  type QuizResult,
  type SessionStats,
  getIntervalsForDifficulty,
} from '../types/intervals';
import { playInterval } from '../services/audioService';

// Root notes range: C3 (48) to C5 (72)
const MIN_ROOT = 48;
const MAX_ROOT = 72;

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateQuestion(difficulty: Difficulty, direction: PlayDirection): QuizQuestion {
  const intervals = getIntervalsForDifficulty(difficulty);
  const interval = pickRandom(intervals);
  const rootNote = randomInt(MIN_ROOT, MAX_ROOT - interval.semitones);
  return { rootNote, interval, direction };
}

export function useIntervalTrainer() {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [direction, setDirection] = useState<PlayDirection>('ascending');
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<Interval | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const questionStartTime = useRef<number>(0);

  const stats: SessionStats = {
    totalQuestions: results.length,
    correctAnswers: results.filter((r) => r.correct).length,
    streak: (() => {
      let s = 0;
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].correct) s++;
        else break;
      }
      return s;
    })(),
    bestStreak: (() => {
      let best = 0;
      let current = 0;
      for (const r of results) {
        if (r.correct) {
          current++;
          best = Math.max(best, current);
        } else {
          current = 0;
        }
      }
      return best;
    })(),
    averageTimeMs: results.length
      ? results.reduce((sum, r) => sum + r.timeMs, 0) / results.length
      : 0,
  };

  const playCurrentInterval = useCallback(() => {
    if (!currentQuestion) return;
    setIsPlaying(true);
    playInterval(
      currentQuestion.rootNote,
      currentQuestion.interval.semitones,
      currentQuestion.direction,
    );
    // Reset playing state after the interval finishes
    setTimeout(() => setIsPlaying(false), currentQuestion.direction === 'harmonic' ? 1300 : 1900);
  }, [currentQuestion]);

  const startNewQuestion = useCallback(() => {
    const question = generateQuestion(difficulty, direction);
    setCurrentQuestion(question);
    setShowAnswer(false);
    setSelectedAnswer(null);
    questionStartTime.current = Date.now();

    // Auto-play the interval
    setIsPlaying(true);
    playInterval(question.rootNote, question.interval.semitones, question.direction);
    setTimeout(() => setIsPlaying(false), question.direction === 'harmonic' ? 1300 : 1900);
  }, [difficulty, direction]);

  const submitAnswer = useCallback(
    (answer: Interval) => {
      if (!currentQuestion || showAnswer) return;
      const timeMs = Date.now() - questionStartTime.current;
      const correct = answer.semitones === currentQuestion.interval.semitones;
      setSelectedAnswer(answer);
      setShowAnswer(true);
      setResults((prev) => [
        ...prev,
        { question: currentQuestion, selectedAnswer: answer, correct, timeMs },
      ]);
    },
    [currentQuestion, showAnswer],
  );

  const resetSession = useCallback(() => {
    setResults([]);
    setCurrentQuestion(null);
    setShowAnswer(false);
    setSelectedAnswer(null);
  }, []);

  const availableIntervals = getIntervalsForDifficulty(difficulty);

  return {
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
    results,
    playCurrentInterval,
    startNewQuestion,
    submitAnswer,
    resetSession,
  };
}
