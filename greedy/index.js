'use strict';

const A = require('../distanse-matrix');
const P = require('../capacity');

const Q = 50;           //constant for vehicle capacity
const CUSTOMERS = 6;    //number of customers

const compare = (customer1, customer2) => {
    return customer1.cost - customer2.cost;
};

const minCost = (arr) => {
    arr.sort(compare);
    return arr[0].customer;
};

const main = () => {
    let unvisited= [];
    for(let i = 0; i <= CUSTOMERS; i++){
        unvisited[i] = i;
    }

    let path = [0];
    let i = 0;
    let j;
    let sum = 0;
    let capacity = Q;

    while(unvisited.length) {
        if(unvisited.indexOf(i) >= 0) {
            let deleted = unvisited.indexOf(i);
            unvisited.splice(deleted, 1);
        }
        let available = [];

        for(let k = 0; k < unvisited.length; k++){
            if(P[unvisited[k]] <= capacity){
                available.push({
                    customer: unvisited[k],
                    cost: A[i][unvisited[k]]
                });
            }
        }
        if(available.length === 0) {
            sum += A[i][0];
            capacity = Q;
            path.push(0);
        }else{
            let individ =
            j = minCost(available);
            sum += A[i][j];
            capacity -= P[j];
            path.push(j);
            i = j;
        }

    }
    console.log("\n----------Greedy Algorithm----------\n");
    console.log("The best found way: ", path.join('-'));
    console.log("The value of the way: ", sum);
    console.log("\n-------------------------------------\n");
};

main();