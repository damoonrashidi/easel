import { Vector2D } from './';

export const isSameVector = ([x1, y1]: Vector2D, [x2, y2]: Vector2D): boolean =>
  x1 === x2 && y1 === y2;

export const distance = ([x1, y1]: Vector2D, [x2, y2]: Vector2D): number => {
  const x = Math.abs(x1 - x2);
  const y = Math.abs(y1 - y2);

  return Math.sqrt(x ** 2 + y ** 2);
};

export const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2));

export const isBetween = (target: number, min: number, max: number): boolean =>
  target >= min && target <= max;

export const average = (a: number, b: number) => (a + b) / 2;

export const map = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export function randomInt(min: number = 0, max: number = 100) {
  return Math.round(Math.random() * (max - min) + min);
}

export function randomFloat(min: number = 0, max: number = 1) {
  return Math.random() * (max - min) + min;
}
