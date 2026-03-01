export type ClickType = 'accent' | 'normal' | 'silent';

const ACCENT_FREQ = 1000;
const NORMAL_FREQ = 800;
const CLICK_DURATION = 0.03;

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

export function playClick(type: ClickType, volume: number): void {
  if (type === 'silent') return;

  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = type === 'accent' ? ACCENT_FREQ : NORMAL_FREQ;

  gainNode.gain.setValueAtTime(volume, now);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + CLICK_DURATION);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + CLICK_DURATION);
}

export function scheduleClick(
  type: ClickType,
  time: number,
  volume: number,
): void {
  if (type === 'silent') return;

  const ctx = getAudioContext();

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = type === 'accent' ? ACCENT_FREQ : NORMAL_FREQ;

  gainNode.gain.setValueAtTime(volume, time);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + CLICK_DURATION);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(time);
  oscillator.stop(time + CLICK_DURATION);
}

export function getCurrentTime(): number {
  return getAudioContext().currentTime;
}
