import { isBetween, distance, randomFloat } from './';
import robustPointInPolygon from 'robust-point-in-polygon';

export type Vector2D = [number, number];

/**
 * Shape
 * A shape is just a bunch of points.
 */
export type Shape = Vector2D[];

export interface Circle {
  x: number;
  y: number;
  radius: number;
}

export interface LineConfiguration {
  color: string;
  lineWidth: number;
}

export type ParticleMap = Circle[][];

/**
 * Draws a line between all points in the shape, fileld
 * @param ctx canvas rendering context
 * @param config
 */
export function drawShape(
  ctx: CanvasRenderingContext2D,
  config: {
    shape: Shape;
    color?: string | CanvasGradient;
    lineConfiguration?: LineConfiguration;
  }
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(...config.shape[0]);
  config.shape.forEach(point => ctx.lineTo(...point));
  ctx.closePath();
  if (config.lineConfiguration) {
    ctx.lineWidth = config.lineConfiguration.lineWidth;
    ctx.strokeStyle = config.lineConfiguration?.color;
    ctx.stroke();
  }
  if (config.color) {
    ctx.fillStyle = config?.color ?? 'black';
    ctx.fill('nonzero');
  }
  ctx.restore();
}

export function debugShape(ctx: CanvasRenderingContext2D, shape: Shape): void {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(...shape[0]);
  shape.forEach(point => {
    ctx.lineTo(...point);
  });
  ctx.closePath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#f00';
  ctx.stroke();
  ctx.font = '30px Arial';
  shape.forEach((point, i) => {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(point[0], point[1], 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.fillText(`${i}`, point[0] - 10, point[1] + 10);
  });
  ctx.restore();
}

/**
 *
 * @param [x,y] the origo of the shape
 * @param radius
 * @param points - number of vectors that should create the shape.
 * @returns
 */
export function createShape(
  [x, y]: Vector2D,
  radius: number,
  points: number
): Shape {
  const shape: Shape = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    shape.push([x + Math.cos(angle) * radius, y + Math.sin(angle) * radius]);
  }
  return shape;
}

/**
 * Get the middle point between two vectors
 */
export function middle([x1, y1]: number[], [x2, y2]: number[]): number[] {
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

/**
 * Get the bounding box for any given shape
 */
export function getBoundingBox(shape: Shape): [number, number, number, number] {
  return shape.reduce(
    ([minX, minY, maxX, maxY], [x, y]) => [
      Math.min(minX, x),
      Math.min(minY, y),
      Math.max(maxX, x),
      Math.max(maxY, y),
    ],
    [shape[0][0], shape[0][1], shape[0][0], shape[0][1]]
  );
}

/**
 * Draw the bounding box for a shape
 * @param ctx - Canvas rendering context
 * @param box - Bounding box from getBoundingBox
 */
export function drawBoundingBox(
  ctx: CanvasRenderingContext2D,
  box: [number, number, number, number]
): void {
  ctx.strokeStyle = '#000';
  ctx.rect(box[0], box[1], box[2] - box[0], box[3] - box[1]);
  ctx.stroke();
}

/**
 * returns a point along the line between point1 and point2 so that the new point has travelled a @param percentage of the way.
 * @param param0 point1
 * @param param1 point2
 * @param percentage
 * @returns number
 */
export function pointAlong(
  [x1, y1]: Vector2D,
  [x2, y2]: Vector2D,
  percentage: number = 0.5
): Vector2D {
  return [x1 + (x2 - x1) * percentage, y1 + (y2 - y1) * percentage];
}

/**
 * Returns the angle between two points
 * @param param0
 * @param param1
 * @returns number
 */
export function angleBetweenPoints(
  [x1, y1]: Vector2D,
  [x2, y2]: Vector2D
): number {
  return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * Takes a shape and jiggles and skews the vectors in it a bit
 * @param points
 * @param jitter
 * @param iterations
 * @returns
 */
export function distort(points: Shape, jitter = 5, iterations = 5): Shape {
  let newPoints: Shape = [];

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const next = points[i + 1] ?? points[0];

    let [x, y] = pointAlong(point, next, randomFloat(0.1, 0.9));

    const angle = angleBetweenPoints(point, next) * Math.PI;

    x += Math.cos(angle) * jitter * randomFloat(-10, 10);
    y += Math.sin(angle) * jitter * randomFloat(-10, 10);

    newPoints.push(point);
    newPoints.push([x, y]);
  }

  return iterations >= 0
    ? distort(newPoints, jitter, iterations - 1)
    : newPoints;
}

/**
 * Returns a point so that the position of the point lies somewhere randomly in the @param circle
 */
export const randomPointInCircle = (circle: Circle): Vector2D => {
  const angle = randomFloat(0, Math.PI * 2);
  const radius = randomFloat(0, circle.radius);
  return [
    circle.x + Math.cos(angle) * radius,
    circle.y + Math.sin(angle) * radius,
  ];
};

/**
 * Validates if a given point lies insides a given circle
 * @param point
 * @param circle
 * @returns
 */
export const isInsideCircle = (
  [x, y]: Vector2D,
  { x: centerX, y: centerY, radius }: Circle
) => (x - centerX) ** 2 + (y - centerY) ** 2 <= radius ** 2;

/**
 * Validates if a given point lies insides a given rectangle
 * @param param0
 * @param param1
 * @returns
 */
export const isInsideRectangle = (
  [x, y]: Vector2D,
  [x1, y1, x2, y2]: [number, number, number, number]
): boolean => isBetween(x, x1, x2) && isBetween(y, y1, y2);

/**
 * Checks if the given paritcle collides with any particle in @param list
 */
export function isInsideAnyParticle(
  particle: Circle,
  list: Circle[],
  linePadding: number
): boolean {
  for (let i = 0; i < list.length; i++) {
    const match = list[i];
    if (!match) {
      return false;
    }

    const collides =
      distance([particle.x, particle.y], [match.x, match.y]) <
      match.radius / 2 + particle.radius / 2 + linePadding;

    if (collides) {
      return true;
    }
  }

  return false;
}

export function isInsidePolygon([x, y]: Vector2D, shape: Shape): boolean {
  return robustPointInPolygon(shape, [x, y]) === -1;
}

export function buildQuadMap(divisionCount: number): ParticleMap {
  return new Array(divisionCount ** 2).fill([]);
}

export function getQuadrantIndex(
  [x, y]: Vector2D,
  maxX: number,
  maxY: number,
  quadCount: number
): number {
  const pX = Math.floor((x / maxX) * quadCount);
  const pY = Math.floor((y / maxY) * quadCount);
  return pY * quadCount + pX - 1;
}

export function nearestNeighbors(
  [x, y]: Vector2D,
  list: Vector2D[],
  n: number,
  maxDistance: number = Infinity
) {
  const neighbors: Vector2D[] = [];
  for (let i = 0; i < list.length; i++) {
    const [x2, y2] = list[i];
    if (distance([x, y], [x2, y2]) < maxDistance) {
      neighbors.push([x2, y2]);
    }
  }
  return neighbors
    .sort((a, b) => distance(a, [x, y]) - distance(b, [x, y]))
    .slice(0, n);
}
