import * as lib from '../lib';
import * as h from './helpers';

function paint(ctx: CanvasRenderingContext2D, config: h.exampleConfig) {
  const shape = lib.createShape(
    [config.dimensions.width / 2, config.dimensions.height / 2],
    config.dimensions.width / 4,
    5
  );

  ctx.globalCompositeOperation = lib.CanvasGlobalCompositionOperation.DARKEN;

  lib.drawShape(ctx, {
    shape: lib.distort(shape, 0.5, 3),
    color: lib.hsla([50, 30, 10]),
  });
}

setTimeout(() => {
  console.clear();
  const config: h.exampleConfig = {
    dimensions: {
      width: 800,
      height: 800,
    },
    edgePadding: {
      x: 800 * 0.1,
      y: 800 * 0.1,
    },
  };
  const ctx = lib.init(config.dimensions.width, config.dimensions.height);
  ctx.fillStyle = lib.hsla([45, 60, 95]);
  ctx.fillRect(0, 0, config.dimensions.width, config.dimensions.height);
  paint(ctx, config);
});
