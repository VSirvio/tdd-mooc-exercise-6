# tdd-mooc-exercise-6

My solution to exercise 6 in the Test-Driven Development [MOOC course](https://tdd.mooc.fi). It is a command line application that implements [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

## Prerequisites

You'll need a recent [Node.js](https://nodejs.org/) version. Then download this project's dependencies with:

    npm install

## Usage

Run the command

    node src/index.mjs test/testdata/gosperglidergun.rle 1

and substitute `test/testdata/gosperglidergun.rle` with the name of the file that contains your initial pattern in [RLE format](https://www.conwaylife.com/wiki/Run_Length_Encoded), and `1` with any positive integer, which is the number of generations to simulate.

## Developing

Run tests once

    npm run test

Run tests continuously

    npm run autotest

Run E2E tests

    node end-to-end-test.mjs

Code reformat

    npm run format
