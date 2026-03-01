import type { Beat, RhythmPattern, StrokeType } from '../types/rhythm';

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

interface StrokeSound {
  frequency: number;
  gain: number;
  type: OscillatorType;
  duration: number;
  /** Additional harmonics for richer sound */
  harmonics?: { freq: number; gain: number }[];
}

const STROKE_SOUNDS: Record<StrokeType, StrokeSound> = {
  'down': {
    frequency: 196, // G3
    gain: 0.3,
    type: 'triangle',
    duration: 0.15,
    harmonics: [{ freq: 294, gain: 0.15 }, { freq: 392, gain: 0.1 }],
  },
  'up': {
    frequency: 330, // E4
    gain: 0.25,
    type: 'triangle',
    duration: 0.12,
    harmonics: [{ freq: 494, gain: 0.12 }, { freq: 659, gain: 0.08 }],
  },
  'mute': {
    frequency: 100,
    gain: 0.2,
    type: 'square',
    duration: 0.04,
  },
  'rest': {
    frequency: 0,
    gain: 0,
    type: 'sine',
    duration: 0,
  },
  'accent-down': {
    frequency: 196,
    gain: 0.45,
    type: 'triangle',
    duration: 0.18,
    harmonics: [{ freq: 294, gain: 0.22 }, { freq: 392, gain: 0.15 }, { freq: 588, gain: 0.08 }],
  },
  'accent-up': {
    frequency: 330,
    gain: 0.4,
    type: 'triangle',
    duration: 0.15,
    harmonics: [{ freq: 494, gain: 0.18 }, { freq: 659, gain: 0.12 }],
  },
};

function playStroke(ctx: AudioContext, stroke: StrokeType, time: number) {
  const sound = STROKE_SOUNDS[stroke];
  if (sound.gain === 0) return;

  const playTone = (freq: number, gainValue: number, oscType: OscillatorType, dur: number) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = oscType;
    osc.frequency.setValueAtTime(freq, time);
    gainNode.gain.setValueAtTime(gainValue, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + dur);
  };

  playTone(sound.frequency, sound.gain, sound.type, sound.duration);

  if (sound.harmonics) {
    for (const h of sound.harmonics) {
      playTone(h.freq, h.gain, sound.type, sound.duration);
    }
  }
}

function playClick(ctx: AudioContext, time: number, isAccent: boolean) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(isAccent ? 1000 : 800, time);
  gainNode.gain.setValueAtTime(isAccent ? 0.15 : 0.08, time);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + 0.03);
}

export interface PlaybackState {
  isPlaying: boolean;
  currentBeat: number;
  stop: () => void;
}

export function playPattern(
  pattern: RhythmPattern,
  bpm: number,
  onBeatChange: (beatIndex: number) => void,
  withMetronome: boolean = true,
): PlaybackState {
  const ctx = getAudioContext();
  const secondsPerBeat = 60 / bpm;
  let isPlaying = true;
  let timeoutIds: number[] = [];

  const scheduleLoop = (startTime: number, loopIndex: number) => {
    if (!isPlaying) return;

    let currentTime = startTime;
    let beatIndex = 0;

    // Schedule metronome clicks for each beat position
    if (withMetronome) {
      const beatsPerMeasure = parseInt(pattern.timeSignature.split('/')[0]);
      const totalDuration = pattern.beats.reduce((sum, b) => sum + b.duration, 0);
      const numWholeBeats = Math.ceil(totalDuration);

      for (let i = 0; i < numWholeBeats; i++) {
        const clickTime = startTime + i * secondsPerBeat;
        playClick(ctx, clickTime, i % beatsPerMeasure === 0);
      }
    }

    // Schedule each beat's sound
    for (const beat of pattern.beats) {
      const beatTime = currentTime;
      const currentBeatIndex = beatIndex;

      playStroke(ctx, beat.stroke, beatTime);

      // Schedule UI update
      const delayMs = (beatTime - ctx.currentTime) * 1000;
      if (delayMs >= 0) {
        const id = window.setTimeout(() => {
          if (isPlaying) {
            onBeatChange(currentBeatIndex);
          }
        }, delayMs);
        timeoutIds.push(id);
      }

      currentTime += beat.duration * secondsPerBeat;
      beatIndex++;
    }

    // Schedule next loop
    const loopDuration = currentTime - startTime;
    const nextStartTime = startTime + loopDuration;
    const delayToNextLoop = (nextStartTime - ctx.currentTime) * 1000;

    if (delayToNextLoop > 0 && isPlaying) {
      const id = window.setTimeout(() => {
        scheduleLoop(nextStartTime, loopIndex + 1);
      }, Math.max(0, delayToNextLoop - 50)); // schedule slightly early
      timeoutIds.push(id);
    }
  };

  scheduleLoop(ctx.currentTime + 0.1, 0);

  const state: PlaybackState = {
    isPlaying: true,
    currentBeat: 0,
    stop() {
      isPlaying = false;
      state.isPlaying = false;
      for (const id of timeoutIds) {
        window.clearTimeout(id);
      }
      timeoutIds = [];
    },
  };

  return state;
}

/** Play a single stroke for preview */
export function previewStroke(stroke: StrokeType) {
  const ctx = getAudioContext();
  playStroke(ctx, stroke, ctx.currentTime);
}
