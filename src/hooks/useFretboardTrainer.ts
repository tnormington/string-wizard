import { useState, useCallback } from 'react';
import {
  NoteName,
  NOTES,
  getNoteAtPosition,
  getRandomPosition,
  getRandomNote,
  findNotePositions,
} from '../utils/music';

export type QuizMode = 'identify' | 'locate';

interface TrainerState {
  mode: QuizMode;
  score: number;
  total: number;
  streak: number;
  bestStreak: number;
  // "identify" mode: given a position, name the note
  targetPosition: { stringIndex: number; fret: number } | null;
  // "locate" mode: given a note, find it on the fretboard
  targetNote: NoteName | null;
  feedback: 'correct' | 'wrong' | null;
  correctAnswer: string | null;
  isActive: boolean;
}

const INITIAL_STATE: TrainerState = {
  mode: 'identify',
  score: 0,
  total: 0,
  streak: 0,
  bestStreak: 0,
  targetPosition: null,
  targetNote: null,
  feedback: null,
  correctAnswer: null,
  isActive: false,
};

export function useFretboardTrainer() {
  const [state, setState] = useState<TrainerState>(INITIAL_STATE);

  const setMode = useCallback((mode: QuizMode) => {
    setState({ ...INITIAL_STATE, mode, isActive: false });
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.mode === 'identify') {
        return {
          ...prev,
          targetPosition: getRandomPosition(),
          targetNote: null,
          feedback: null,
          correctAnswer: null,
          isActive: true,
        };
      } else {
        return {
          ...prev,
          targetNote: getRandomNote(),
          targetPosition: null,
          feedback: null,
          correctAnswer: null,
          isActive: true,
        };
      }
    });
  }, []);

  const start = useCallback(() => {
    setState((prev) => {
      const newState = { ...INITIAL_STATE, mode: prev.mode, isActive: true };
      if (newState.mode === 'identify') {
        newState.targetPosition = getRandomPosition();
      } else {
        newState.targetNote = getRandomNote();
      }
      return newState;
    });
  }, []);

  const answerNote = useCallback(
    (note: NoteName) => {
      if (state.mode !== 'identify' || !state.targetPosition || state.feedback) return;

      const correct = getNoteAtPosition(state.targetPosition.stringIndex, state.targetPosition.fret);
      const isCorrect = note === correct;

      setState((prev) => {
        const newStreak = isCorrect ? prev.streak + 1 : 0;
        return {
          ...prev,
          score: prev.score + (isCorrect ? 1 : 0),
          total: prev.total + 1,
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          feedback: isCorrect ? 'correct' : 'wrong',
          correctAnswer: isCorrect ? null : correct,
        };
      });

      setTimeout(nextQuestion, isCorrect ? 600 : 1500);
    },
    [state.mode, state.targetPosition, state.feedback, nextQuestion],
  );

  const answerPosition = useCallback(
    (stringIndex: number, fret: number) => {
      if (state.mode !== 'locate' || !state.targetNote || state.feedback) return;

      const noteAtPosition = getNoteAtPosition(stringIndex, fret);
      const isCorrect = noteAtPosition === state.targetNote;

      setState((prev) => {
        const newStreak = isCorrect ? prev.streak + 1 : 0;
        return {
          ...prev,
          score: prev.score + (isCorrect ? 1 : 0),
          total: prev.total + 1,
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
          feedback: isCorrect ? 'correct' : 'wrong',
          correctAnswer: isCorrect ? null : `That was ${noteAtPosition}`,
        };
      });

      setTimeout(nextQuestion, isCorrect ? 600 : 1500);
    },
    [state.mode, state.targetNote, state.feedback, nextQuestion],
  );

  const validPositions =
    state.mode === 'locate' && state.targetNote
      ? findNotePositions(state.targetNote)
      : [];

  return {
    ...state,
    validPositions,
    notes: NOTES,
    setMode,
    start,
    answerNote,
    answerPosition,
  };
}
