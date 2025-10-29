import { useState, useEffect, useRef } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // delay before starting
  startTyping?: boolean; // external trigger to start typing
  showCursor?: boolean; // whether to show the cursor inline
}

export function useTypewriter({
  text,
  speed = 80,
  delay = 0,
  startTyping = true,
  showCursor = true
}: UseTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cursor blinking effect - should start when startTyping is true
  useEffect(() => {
    if (!showCursor || isComplete || !startTyping) {
      setShowCursorState(false);
      return;
    }

    // Show cursor immediately when startTyping becomes true
    setShowCursorState(true);

    const cursorInterval = setInterval(() => {
      setShowCursorState(prev => !prev);
    }, 300);

    return () => clearInterval(cursorInterval);
  }, [showCursor, isComplete, startTyping]);

  useEffect(() => {
    // Clear any existing timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!startTyping || !text) {
      setDisplayText('');
      setIsComplete(false);
      return;
    }

    setDisplayText('');
    setIsComplete(false);

    timeoutRef.current = setTimeout(() => {
      let currentIndex = 0;

      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, speed);
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, delay, startTyping]);

  // Return display text with cursor inline if needed
  // Show cursor when startTyping is true (even during delay before text appears)
  const textWithCursor = showCursor && !isComplete && showCursorState && startTyping
    ? displayText + '|'
    : displayText;

  return { displayText: textWithCursor, isComplete };
}
