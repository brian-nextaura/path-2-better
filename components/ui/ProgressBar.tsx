import React from 'react';

interface ProgressBarProps {
  current: number;
  goal: number;
  showLabels?: boolean;
}

export function ProgressBar({ current, goal, showLabels = true }: ProgressBarProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full">
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={goal}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between mt-2 text-sm text-neutral-gray">
          <span className="font-semibold text-neutral-charcoal">
            ${current.toLocaleString()} raised
          </span>
          <span>of ${goal.toLocaleString()} goal</span>
        </div>
      )}
    </div>
  );
}
