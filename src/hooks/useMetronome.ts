import { useState, useRef, useCallback, useEffect } from 'react';
import { scheduleClick, getCurrentTime, type ClickType } from '../utils/metronomeAudio';

export interface TimeSignature {
  beats: number;
  subdivision: number;
}

export const TIME_SIGNATURES: TimeSignature[] = [
  { beats: 2, subdivision: 4 },
  { beats: 3, subdivision: 4 },
  { beats: 4, subdivision: 4 },
  { beats: 5, subdivision: 4 },
  { beats: 6, subdivision: 8 },
  { beats: 7, subdivision: 8 },
];

const MIN_BPM = 20;
const MAX_BPM = 300;
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

export interface MetronomeState {
  bpm: number;
  isPlaying: boolean;
  currentBeat: number;
  timeSignature: TimeSignature;
  accentPattern: boolean[];
  volume: number;
  audioEnabled: boolean;
}

export interface MetronomeActions {
  setBpm: (bpm: number) => void;
  togglePlay: () => void;
  start: () => void;
  stop: () => void;
  setTimeSignature: (ts: TimeSignature) => void;
  setAccentPattern: (pattern: boolean[]) => void;
  toggleAccent: (beatIndex: number) => void;
  setVolume: (volume: number) => void;
  setAudioEnabled: (enabled: boolean) => void;
}

export function useMetronome(): MetronomeState & MetronomeActions {
  const [bpm, setBpmState] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [timeSignature, setTimeSignatureState] = useState<TimeSignature>({ beats: 4, subdivision: 4 });
  const [accentPattern, setAccentPatternState] = useState<boolean[]>([true, false, false, false]);
  const [volume, setVolumeState] = useState(0.8);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const bpmRef = useRef(bpm);
  const timeSignatureRef = useRef(timeSignature);
  const accentPatternRef = useRef(accentPattern);
  const volumeRef = useRef(volume);
  const audioEnabledRef = useRef(audioEnabled);

  // Keep refs in sync
  useEffect(() => { bpmRef.current = bpm; }, [bpm]);
  useEffect(() => { timeSignatureRef.current = timeSignature; }, [timeSignature]);
  useEffect(() => { accentPatternRef.current = accentPattern; }, [accentPattern]);
  useEffect(() => { volumeRef.current = volume; }, [volume]);
  useEffect(() => { audioEnabledRef.current = audioEnabled; }, [audioEnabled]);

  const getClickType = useCallback((beatIndex: number): ClickType => {
    if (accentPatternRef.current[beatIndex]) return 'accent';
    return 'normal';
  }, []);

  const scheduleNote = useCallback(() => {
    const beatIndex = currentBeatRef.current;
    const clickType = getClickType(beatIndex);

    if (audioEnabledRef.current) {
      scheduleClick(clickType, nextNoteTimeRef.current, volumeRef.current);
    }

    setCurrentBeat(beatIndex);

    const secondsPerBeat = 60.0 / bpmRef.current;
    nextNoteTimeRef.current += secondsPerBeat;
    currentBeatRef.current = (beatIndex + 1) % timeSignatureRef.current.beats;
  }, [getClickType]);

  const scheduler = useCallback(() => {
    while (nextNoteTimeRef.current < getCurrentTime() + SCHEDULE_AHEAD_S) {
      scheduleNote();
    }
  }, [scheduleNote]);

  const start = useCallback(() => {
    if (timerRef.current) return;
    currentBeatRef.current = 0;
    nextNoteTimeRef.current = getCurrentTime();
    timerRef.current = setInterval(scheduler, LOOKAHEAD_MS);
    setIsPlaying(true);
  }, [scheduler]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(0);
    currentBeatRef.current = 0;
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  }, [isPlaying, start, stop]);

  const setBpm = useCallback((value: number) => {
    setBpmState(Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(value))));
  }, []);

  const setTimeSignature = useCallback((ts: TimeSignature) => {
    setTimeSignatureState(ts);
    const newPattern = Array.from({ length: ts.beats }, (_, i) => i === 0);
    setAccentPatternState(newPattern);
    if (isPlaying) {
      stop();
      // Restart with new time signature on next tick
      setTimeout(() => start(), 50);
    }
  }, [isPlaying, stop, start]);

  const setAccentPattern = useCallback((pattern: boolean[]) => {
    setAccentPatternState(pattern);
  }, []);

  const toggleAccent = useCallback((beatIndex: number) => {
    setAccentPatternState(prev => {
      const next = [...prev];
      next[beatIndex] = !next[beatIndex];
      return next;
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(Math.min(1, Math.max(0, v)));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    bpm,
    isPlaying,
    currentBeat,
    timeSignature,
    accentPattern,
    volume,
    audioEnabled,
    setBpm,
    togglePlay,
    start,
    stop,
    setTimeSignature,
    setAccentPattern,
    toggleAccent,
    setVolume,
    setAudioEnabled,
  };
}
