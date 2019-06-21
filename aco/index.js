'use strict';

const AntColony = require('./ant-colony');
const NOA = 10;
const LIMIT = 100;
const Q = 3;
const RHO = 0.8;
const EPSILON = 0.15;
const distance = require('../distanse-matrix');
const ac = new AntColony(NOA, LIMIT, Q, RHO, EPSILON, distance);

ac.solve();
console.log(ac.result());