import { makeNoise2D } from 'open-simplex-noise';
import { map } from './';

export class Noise {
  static swirl(x: number, y: number, width: number, height: number): number {
    const centerX = width / 2;
    const centerY = height / 2;
    const distanceX = Math.abs(centerX - x);
    const distanceY = Math.abs(centerY - y);
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    return distance;
  }

  static toCenter(x: number, y: number, width: number, height: number): number {
    const centerX = width / 2;
    const centerY = height / 2;

    const angle = Math.atan2(Math.abs(x - centerX), Math.abs(y - centerY));

    return angle * Math.PI;
  }

  static rain(x: number, y: number, frequency: number): number {
    const diff = (x % frequency) + y;
    return map(diff, 0, frequency, -1, 1);
  }

  static simplex(x: number, y: number, seed: number = 100) {
    const noise = makeNoise2D(seed);
    return noise(x, y);
  }
}
