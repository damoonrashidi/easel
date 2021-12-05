const painting = process.env.P || 'piet';

console.log(painting);

module.exports = {
  root: `./src/`,
  mount: {
    src: {
      url: '/',
    },
  },
  buildOptions: {
    out: './dist/',
  },
  plugins: ['@snowpack/plugin-typescript'],
  devOptions: {
    output: 'dashboard',
    port: 4444,
  },
};
