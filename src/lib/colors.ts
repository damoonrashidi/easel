import { randomInt } from './';

export type HSLA = [number, number, number, number?];

export interface Palette {
  background: HSLA;
  colors: HSLA[];
}

export enum PaletteName {
  SPRING,
  WINTER,
  AUTUMN,
  BLANC,
  ANNA,
  MOUNTAIN_FOREST,
  SEASIDE,
  RANDOM,
  NOIR,
}

export const randomHue = (
  [min, max]: [number, number],
  saturation: number = 70,
  lightness: number = 60,
  alpha = 1
): HSLA => [randomInt(min, max), saturation, lightness, alpha];

export const Palettes: Record<PaletteName, Palette> = {
  [PaletteName.SPRING]: {
    background: [65, 45, 90],
    colors: [
      [190, 60, 98],
      [192, 63, 94],
      [169, 46, 86],
      [166, 45, 72],
      [160, 43, 58],
    ],
  },
  [PaletteName.NOIR]: {
    background: [0, 0, 0],
    colors: [[0, 0, 10]],
  },
  [PaletteName.WINTER]: {
    background: [65, 45, 90],
    colors: [
      [201, 52, 77],
      [204, 71, 41],
      [92, 57, 71],
      [116, 57, 40],
      [1, 92, 79],
    ],
  },
  [PaletteName.AUTUMN]: {
    background: [48, 20, 9],
    colors: [
      [0, 100, 98],
      [75, 100, 81],
      [34, 61, 91],
      [28, 82, 56],
      [0, 8, 21],
      [0, 44, 44],
    ],
  },
  [PaletteName.BLANC]: {
    background: [65, 30, 90],
    colors: [
      [0, 100, 100],
      [0, 82, 75],
      [193, 27, 76],
      [192, 100, 94],
      [44, 100, 94],
    ],
  },
  [PaletteName.ANNA]: {
    background: [17, 90, 90],
    colors: [
      [270, 70, 74],
      [250, 80, 50],
      [300, 70, 86],
      [330, 31 + 50, 96],
      [210, 9 + 50, 69],
    ],
  },
  [PaletteName.MOUNTAIN_FOREST]: {
    background: [180, 2, 88],
    colors: [
      [0, 100, 100],
      [44, 100, 94],
      [192, 100, 94],
      [193, 27, 76],
      [0, 8, 21],
      [0, 44, 44],
    ],
  },
  [PaletteName.SEASIDE]: {
    background: [120, 25, 5],
    colors: [
      [40, 52, 88],
      [48, 24, 46],
      [0, 2, 38],
      [214, 29, 41],
    ],
  },
  [PaletteName.RANDOM]: {
    background: randomHue([0, 360], 60, 95),
    colors: Array(6)
      .fill(null)
      .map(() => randomHue([0, 360], 50, randomInt(0, 100))),
  },
};

export function hsla([hue, saturation, lightness, alpha]: HSLA): string {
  if (alpha) {
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
  }
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
