import type { MouseEvent } from 'react';

export type PlanClickPosition = {
  xPercent: number;
  yPercent: number;
  left: string;
  top: string;
};

export const handlePlanClick = (e: MouseEvent<HTMLDivElement>): PlanClickPosition => {
  const rect = e.currentTarget.getBoundingClientRect();

  const xPercent = (e.clientX - rect.left) / rect.width;
  const yPercent = (e.clientY - rect.top) / rect.height;
  const position = {
    xPercent,
    yPercent,
    left: `${xPercent * 100}%`,
    top: `${yPercent * 100}%`,
  };

  console.log({
    xPercent,
    yPercent,
    css: {
      left: position.left,
      top: position.top,
    },
  });

  return position;
};
