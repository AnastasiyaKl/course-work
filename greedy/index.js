'use strict';

const A = require('../distanse-matrix');
const P = require('../capacity');

const Q = 50;           //constant for vehicle capacity
const CUSTOMERS = 6;    //number of customers

const compare = (customer1, customer2) => {
    return customer1 - customer2;
};

const minCost = (arr) => {
    arr.sort(compare);
    return arr[0];
};

const main = () => {
    let customersList = [];
    for(let i = 0; i < CUSTOMERS; i++){
        customersList[i] = i;
    }

    let path = [];

    while(customersList.length){
        let i = 0;
        const capacity = Q;
        for(let j of customersList){
            let cheapestRoute = [];
            if(P[j] <= capacity){
                cheapestRoute.push(j);
            }
        }

    }
};

main();