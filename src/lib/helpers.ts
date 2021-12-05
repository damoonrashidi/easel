import { randomInt, randomFloat, map } from './';

/**
 * Pick a random item from a list
 * @param palette
 */
export const fromPalette = <T>(palette: T[]): T => {
  const i = randomInt(0, palette.length - 1);
  return palette[i];
};

/**
 * Pick an item from a list biased towards the first items
 * @param palette
 * @returns
 */
export const biasedFromPalette = <T>(palette: T[]): T => {
  const a = randomFloat();
  const b = randomFloat();
  const n = Math.max(0, b - a);
  const i = map(n, 0, 1, 0, palette.length);

  return palette[Math.floor(i)];
};

export enum CanvasGlobalCompositionOperation {
  SOURCE_IN = 'source-in',
  SOURCE_OUT = 'source-out',
  SOURCE_ATOP = 'source-atop',
  DESTINATION_OVER = 'destination-over',
  DESTINATION_IN = 'destination-in',
  DESTINATION_OUT = 'destination-out',
  DESTINATION_ATOP = 'destination-atop',
  LIGHTER = 'lighter',
  COPY = 'COPY',
  XOR = 'xor',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color-dodge',
  COLOR_BURN = 'color-burn',
  HARD_LIGHT = 'hard-light',
  SOFT_LIGHT = 'soft-light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
}

/**
 * Paint a grid over the canvas with coordinates
 * makes it easy to get coordinates for shapes
 * @param ctx
 * @param width
 * @param height
 * @param param3
 */
export function paintGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  { showNumbers }: { showNumbers: boolean }
): void {
  const stepsX = width / 10;
  const stepsY = height / 20;
  ctx.font = `20px sans-serif`;

  for (let y = 0; y < height; y += stepsY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
    ctx.closePath();

    for (let x = 0; x < width; x += stepsX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = '#ddd';
      ctx.stroke();
      ctx.closePath();

      if (showNumbers) {
        ctx.fillStyle = '#f00';
        ctx.fillText(`${Math.round(x)} : ${Math.round(y)}`, x, y);
      }
    }
  }
}

/**
 * Init a canvas
 */

export function init(
  width: number,
  height: number,
  clear = true,
  id = 'canvas'
): CanvasRenderingContext2D {
  if (clear) {
    document.body.innerHTML = '';
  }
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.setAttribute('id', id);
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  return ctx;
}
