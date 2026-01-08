import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for managing a timer
 * @param initialTime - Starting time in seconds
 * @param autoStart - Whether to start the timer automatically
 * @param onComplete - Callback when timer reaches limit
 */
export function useTimer(
  initialTime: number = 0,
  autoStart: boolean = false,
  onComplete?: () => void
) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [limit, setLimit] = useState<number | null>(null);

  // Start the timer
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Pause the timer
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Stop and reset the timer
  const stop = useCallback(() => {
    setIsRunning(false);
    setTime(initialTime);
  }, [initialTime]);

  // Reset the timer to initial value
  const reset = useCallback(() => {
    setTime(initialTime);
  }, [initialTime]);

  // Set a custom time
  const setCustomTime = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);

  // Set a time limit
  const setTimeLimit = useCallback((newLimit: number | null) => {
    setLimit(newLimit);
  }, []);

  // Toggle between running and paused
  const toggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;

          // Check if we've reached the limit
          if (limit !== null && newTime >= limit) {
            setIsRunning(false);
            if (onComplete) {
              onComplete();
            }
            return limit;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, limit, onComplete]);

  return {
    time,
    isRunning,
    start,
    pause,
    stop,
    reset,
    toggle,
    setCustomTime,
    setTimeLimit,
  };
}

/**
 * Hook for discussion timer specifically
 */
export function useDiscussionTimer(timeLimit: number = 180) {
  const timer = useTimer(0, false);

  useEffect(() => {
    timer.setTimeLimit(timeLimit);
  }, [timeLimit]);

  return timer;
}

/**
 * Hook for countdown timer
 */
export function useCountdown(
  initialTime: number,
  autoStart: boolean = false,
  onComplete?: () => void
) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    setTime(initialTime);
  }, [initialTime]);

  const reset = useCallback(() => {
    setTime(initialTime);
  }, [initialTime]);

  const toggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;

          if (newTime <= 0) {
            setIsRunning(false);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, time, onComplete]);

  return {
    time,
    isRunning,
    start,
    pause,
    stop,
    reset,
    toggle,
  };
}
