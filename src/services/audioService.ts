import { midiToFrequency, type PlayDirection } from '../types/intervals';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

interface ToneOptions {
  frequency: number;
  duration: number;
  startTime: number;
  type?: OscillatorType;
  gain?: number;
}

function playTone({ frequency, duration, startTime, type = 'sine', gain = 0.3 }: ToneOptions): void {
  const ctx = getAudioContext();

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  // Envelope: quick attack, sustain, smooth release
  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.02);
  gainNode.gain.setValueAtTime(gain, startTime + duration - 0.05);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

export function playInterval(
  rootMidi: number,
  semitones: number,
  direction: PlayDirection,
): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const noteDuration = 0.8;
  const gap = 0.15;

  const rootFreq = midiToFrequency(rootMidi);
  const intervalFreq = midiToFrequency(rootMidi + semitones);

  if (direction === 'harmonic') {
    // Play both notes at the same time
    playTone({ frequency: rootFreq, duration: noteDuration * 1.5, startTime: now });
    playTone({ frequency: intervalFreq, duration: noteDuration * 1.5, startTime: now });
  } else if (direction === 'ascending') {
    playTone({ frequency: rootFreq, duration: noteDuration, startTime: now });
    playTone({ frequency: intervalFreq, duration: noteDuration, startTime: now + noteDuration + gap });
  } else {
    // descending: play higher note first
    playTone({ frequency: intervalFreq, duration: noteDuration, startTime: now });
    playTone({ frequency: rootFreq, duration: noteDuration, startTime: now + noteDuration + gap });
  }
}

export function playNote(midi: number): void {
  const ctx = getAudioContext();
  playTone({
    frequency: midiToFrequency(midi),
    duration: 0.6,
    startTime: ctx.currentTime,
  });
}
