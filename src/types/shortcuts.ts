/** Modifier keys that can be combined with a key */
export type Modifier = 'ctrl' | 'shift' | 'alt' | 'meta';

/** A keyboard shortcut binding */
export interface ShortcutBinding {
  key: string; // e.g. '1', 'ArrowLeft', ' ' (space)
  modifiers?: Modifier[];
}

/** A registered shortcut command */
export interface ShortcutCommand {
  id: string;
  label: string;
  description: string;
  category: ShortcutCategory;
  binding: ShortcutBinding;
}

export type ShortcutCategory = 'navigation' | 'playback' | 'general';

/** Format a binding for display (e.g. "Ctrl+Shift+?" ) */
export function formatBinding(binding: ShortcutBinding): string {
  const parts: string[] = [];
  if (binding.modifiers?.includes('ctrl')) parts.push('Ctrl');
  if (binding.modifiers?.includes('alt')) parts.push('Alt');
  if (binding.modifiers?.includes('shift')) parts.push('Shift');
  if (binding.modifiers?.includes('meta')) parts.push('Cmd');

  const keyLabel = KEY_DISPLAY_NAMES[binding.key] ?? binding.key.toUpperCase();
  parts.push(keyLabel);
  return parts.join('+');
}

const KEY_DISPLAY_NAMES: Record<string, string> = {
  ' ': 'Space',
  ArrowLeft: '\u2190',
  ArrowRight: '\u2192',
  ArrowUp: '\u2191',
  ArrowDown: '\u2193',
  Escape: 'Esc',
  '?': '?',
};

/** Check whether a keyboard event matches a binding */
export function eventMatchesBinding(e: KeyboardEvent, binding: ShortcutBinding): boolean {
  if (e.key !== binding.key) return false;
  const mods = binding.modifiers ?? [];
  if (mods.includes('ctrl') !== (e.ctrlKey || e.metaKey)) return false;
  if (mods.includes('shift') !== e.shiftKey) return false;
  if (mods.includes('alt') !== e.altKey) return false;
  return true;
}
