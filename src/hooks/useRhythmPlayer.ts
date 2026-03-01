import { useState, useRef, useCallback } from 'react';
import type { RhythmPattern } from '../types/rhythm';
import { playPattern, type PlaybackState } from '../services/audioEngine';

export function useRhythmPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(-1);
  const [bpm, setBpm] = useState(100);
  const [withMetronome, setWithMetronome] = useState(true);
  const playbackRef = useRef<PlaybackState | null>(null);

  const play = useCallback((pattern: RhythmPattern) => {
    // Stop existing playback
    if (playbackRef.current) {
      playbackRef.current.stop();
    }

    setIsPlaying(true);
    setCurrentBeat(0);

    playbackRef.current = playPattern(
      pattern,
      bpm,
      (beatIndex) => setCurrentBeat(beatIndex),
      withMetronome,
    );
  }, [bpm, withMetronome]);

  const stop = useCallback(() => {
    if (playbackRef.current) {
      playbackRef.current.stop();
      playbackRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(-1);
  }, []);

  const toggle = useCallback((pattern: RhythmPattern) => {
    if (isPlaying) {
      stop();
    } else {
      play(pattern);
    }
  }, [isPlaying, play, stop]);

  return {
    isPlaying,
    currentBeat,
    bpm,
    setBpm,
    withMetronome,
    setWithMetronome,
    play,
    stop,
    toggle,
  };
}
