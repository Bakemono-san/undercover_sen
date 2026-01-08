import React from "react";
import { formatTime } from "../../utils/gameHelpers";
import { Clock, Pause, Play, RotateCcw } from "lucide-react";

interface TimerProps {
  time: number;
  isRunning?: boolean;
  showControls?: boolean;
  onToggle?: () => void;
  onReset?: () => void;
  size?: "sm" | "md" | "lg";
  label?: string;
  variant?: "default" | "warning" | "danger";
  className?: string;
}

const sizeStyles = {
  sm: {
    container: "text-2xl md:text-3xl",
    label: "text-xs",
    icon: "w-4 h-4",
  },
  md: {
    container: "text-4xl md:text-5xl",
    label: "text-sm",
    icon: "w-5 h-5",
  },
  lg: {
    container: "text-6xl md:text-7xl",
    label: "text-base md:text-lg",
    icon: "w-6 h-6",
  },
};

const variantStyles = {
  default: "text-white",
  warning: "text-yellow-400",
  danger: "text-red-400",
};

export const Timer: React.FC<TimerProps> = ({
  time,
  isRunning = false,
  showControls = false,
  onToggle,
  onReset,
  size = "md",
  label,
  variant = "default",
  className = "",
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center gap-3 mb-2">
        <Clock className={`${sizeStyles[size].icon} ${variantStyles[variant]}`} />
        <div className={`font-black ${sizeStyles[size].container} ${variantStyles[variant]} tabular-nums`}>
          {formatTime(time)}
        </div>
      </div>

      {label && (
        <div className={`${sizeStyles[size].label} text-gray-300 font-semibold uppercase tracking-wide`}>
          {label}
        </div>
      )}

      {showControls && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label={isRunning ? "Pause" : "Start"}
            >
              {isRunning ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
          )}
          {onReset && (
            <button
              onClick={onReset}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Reset"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface CountdownTimerProps {
  time: number;
  totalTime: number;
  isRunning?: boolean;
  size?: "sm" | "md" | "lg";
  showProgress?: boolean;
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  time,
  totalTime,
  isRunning = false,
  size = "md",
  showProgress = true,
  className = "",
}) => {
  const percentage = totalTime > 0 ? (time / totalTime) * 100 : 0;
  const isWarning = percentage <= 50 && percentage > 25;
  const isDanger = percentage <= 25;

  const variant = isDanger ? "danger" : isWarning ? "warning" : "default";

  return (
    <div className={className}>
      <Timer
        time={time}
        isRunning={isRunning}
        size={size}
        variant={variant}
        label={time > 0 ? "Temps restant" : "Temps écoulé"}
      />

      {showProgress && (
        <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ${
              isDanger
                ? "bg-red-500"
                : isWarning
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Timer;
