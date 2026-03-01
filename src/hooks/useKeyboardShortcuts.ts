import { useEffect, useCallback, useRef } from 'react';
import { type ShortcutBinding, eventMatchesBinding } from '../types/shortcuts';

type ShortcutHandler = (e: KeyboardEvent) => void;

interface RegisteredShortcut {
  binding: ShortcutBinding;
  handler: ShortcutHandler;
}

/**
 * Hook that registers keyboard shortcut handlers and dispatches matching events.
 *
 * Returns a `register` function — call it with a binding + handler to get an
 * unregister callback. Typically used inside a useEffect:
 *
 * ```ts
 * const register = useKeyboardShortcuts();
 * useEffect(() => register({ key: '?' }, () => setShowHelp(true)), [register]);
 * ```
 */
export function useKeyboardShortcuts() {
  const shortcuts = useRef<Map<string, RegisteredShortcut>>(new Map());
  const idCounter = useRef(0);

  // Single global keydown listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Skip when user is typing in an input/textarea/select
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      for (const entry of shortcuts.current.values()) {
        if (eventMatchesBinding(e, entry.binding)) {
          e.preventDefault();
          entry.handler(e);
          return; // first match wins
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /** Register a shortcut. Returns an unregister function. */
  const register = useCallback(
    (binding: ShortcutBinding, handler: ShortcutHandler): (() => void) => {
      const id = String(++idCounter.current);
      shortcuts.current.set(id, { binding, handler });
      return () => {
        shortcuts.current.delete(id);
      };
    },
    [],
  );

  return register;
}
