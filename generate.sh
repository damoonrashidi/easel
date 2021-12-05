#!/bin/bash

echo "Scaffoling painting $1";

mkdir "src/$1";
touch "src/$1/$1.ts";
touch "src/$1/helpers.ts";


echo """import * as lib from '../lib';
import * as h from './helpers';

function paint(ctx: CanvasRenderingContext2D, config: h.${1}Config) {
}

setTimeout(() => {
  console.clear();
  const config: h.${1}Config = {
    dimensions: {
      width: 2e3,
      height: 2e3
    },
    edgePadding: {
      x: 2e3 * 0.1,
      y: 2e3 * 0.1
    }
  };
  const ctx = lib.init(config.dimensions.width, config.dimensions.height);
  ctx.fillStyle = lib.hsla([45, 60, 95]);
  ctx.fillRect(0, 0, config.dimensions.width, config.dimensions.height);
  paint(ctx, config);
});

""" > "src/$1/$1.ts";

echo """export interface ${1}Config {
  dimensions: {
    width: number;
    height: number;
  };
  edgePadding: {
    x: number;
    y: number;
  };
}
""" > "src/$1/helpers.ts";

echo "Done!";
