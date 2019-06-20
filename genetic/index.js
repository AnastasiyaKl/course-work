'use strict';

const A = require('../distanse-matrix');
const P = require('../capacity');
const routesList = require('./individual-static');

const Q = 50;           //constant for vehicle capacity
const D = 15;           //population size
const CUSTOMERS = 6;    //number of customers
const ITERATIONS = 10;   //number of iterations

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const compare = (individ1, individ2) => {
    return individ1.val - individ2.val;
};

//function for generating random route
// const createRoute = () => {
//     const route = [];
//     return route;   //return route array
// };

const newIndivid = (path) => {
    const cost = routeCost(path);
    return {
        val: cost,
        path: path
    };
};

const createPopulation = () => {
    let population = [];
    for(let i = 0; i < D; i++){
        const route = createRoute();
        const individ = newIndivid(route);
        population.push(individ);
    }
    population.sort(compare);
};

//route - array
const routeCost = (route) => {
    let sum = 0;
    let capacity = Q;
    let path = '';
    sum += A[0][route[0]];

    for(let i = 0; i < route.length; i++){
        capacity -= P[route[i]];
        if(capacity >= P[route[i+1]]){
            path += route[i];
            sum += A[route[i]][route[i+1]];
        }
        else{
            path += route[i];
            path += '0';
            sum += A[route[i]][0];
            if(i !== route.length - 1) {
                sum += A[0][route[i + 1]];
            }
            capacity = 50;
        }
    }
    return sum;
};

const crossover = (path1, path2) => {
    let child = [];
    for(let i = 0; i < path1.length; i++){
        child[path1[i]-1] = path2[i];
    }
    return child;
};

const mutation = (path, k) => {
    let arr1 = path.slice(0, k);
    let arr2 = path.slice(k, path.length);
    arr1 = arr1.reverse();
    return [...arr1, ...arr2];
};

const selection = (population) => {
    population.sort(compare);
    while(population.length > D){
        population.pop();
    }
    return population;
};

const iteration = (population) => {
    const k1 = random(0,population.length);
    const k2 = random(0,population.length);
    const k3 = random(0, population.length);
    const k4 = random(3, population.length);
    const k5 = random(2, CUSTOMERS);

    const parent1 = population[k1].path;
    const parent2 = population[k2].path;
    const child = crossover(parent1, parent2);
    const crossoverChild = newIndivid(child);
    population.push(crossoverChild);

    for(let i = 0; i < population.length; i++)
    {
        if(i % k4 === 0){
            const mutable = population[k3].path;
            const child = mutation(mutable, k5);
            const mutationChild = newIndivid(child);
            population.push(mutationChild);
        }
    }

    return selection(population);
};

const finalPath = (route) => {
    let capacity = Q;
    let finalPath = [0];

    for(let i = 0; i < route.length; i++) {
        capacity -= P[route[i]];
        if (capacity >= P[route[i + 1]]) {
            finalPath.push(route[i]);
        } else {
            finalPath.push(route[i]);
            finalPath.push(0);
            capacity = 50;
        }
    }
    return finalPath.join('-');
};

const main = () => {
    // let population = createPopulation();
    let population = routesList;
    for(let i = 0; i < ITERATIONS; i++){
        population = iteration(population);
    }
    const bestPath = finalPath(population[0].path);
    console.log("\n----------Genetic Algorithm----------\n");
    console.log("The best found way: ", bestPath);
    console.log("The value of way: ", population[0].val);
    console.log("\n-------------------------------------\n");
};

main();

