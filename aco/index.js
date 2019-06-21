'use strict';

const AntColony = require('./ant-colony');
const P = require('../capacity');
const distance = require('../distanse-matrix');

const ANTS = 1;         //number of ants
const LIMIT = 100;      //number of iterations
const Q = 3;            //influence of pheromone
const RHO = 0.8;        //Evaporation rate of pheromone(випаровування)
const EPSILON = 0.15;
const capacity = 50;
const ac = new AntColony(ANTS, LIMIT, Q, RHO, EPSILON, distance, P, capacity);

ac.solve();
console.log("\n----------Ant Colony Optimization----------\n");
console.log(ac.result());
console.log("\n-------------------------------------\n");
