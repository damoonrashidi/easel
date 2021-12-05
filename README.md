# Generative artwork

These are my attempts at generative art, while building some sort of Genartive Art helper library in the process.

## Installing

```bash
yarn
```

## Running locally

Start the dev server

```bash
yarn start
```

This will serve the paintings on `localhost:4444`, each painting can be accessed by changing the hash in the url. So `localhost:4444#piet` or `localhost:4444#flow`. HMR is enabled and it will clear the canvas on each save.

## Scaffold a new painting

Paintings can be scaffolded through `yarn new painting-name` and then accessed through `localhost:4444#painting-name`. Write your code in the `paint` function.
