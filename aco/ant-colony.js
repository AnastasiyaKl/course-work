'use strict';

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

class AntColony {
    constructor(number, limit, q, rho, epsilon, distance, P, capacity) {
        this._number = number;
        this._limit = limit;
        this._q = q;
        this._rho = rho;
        this._epsilon = epsilon;
        this._distance = distance;
        this._step = distance[0].length - 1;
        this._pheromone = this._initPheromone(distance);
        this._mstep = this._initMStep(number, this._step);
        this._P = P;
        this._capacity = capacity;
    }

    solve() {
        for (let i = 0; i < this._limit; i++) {
            this._walk(this._epsilon);
            this._update();
        }
    }

    result() {
        this._walk(0);
        this._update();
        // return {
        //     minRoute: this._mstep[0],
        //     averageDistance: this._average
        // }
        this._finalPath(this._mstep[0]);
    }

    _finalPath(route){
        let capacity = this._capacity;
        let P = this._P;
        let finalPath = [0];
        let A = this._distance;

        let sum = 0;
        let path = [0];
        sum += A[0][route[0]];

        for(let i = 0; i < route.length; i++){
            capacity -= P[route[i]];
            if(capacity >= P[route[i+1]]){
                path.push(route[i]);
                sum += A[route[i]][route[i+1]];
            }
            else{
                path.push(route[i]);
                path.push(0);
                sum += A[route[i]][0];
                if(i !== route.length - 1) {
                    sum += A[0][route[i + 1]];
                }
                capacity = 50;
            }
        }
        console.log("The best found way: ", path.join('-'));
        console.log("The value of the way: ", sum);
    };

    _walk(epsilon) {
        for (let m = 0; m < this._number; m++) {
            this._mstep[m] = []; // clear
            for (let s = 0; s < this._step; s++) {
                const current = s > 0 ? this._mstep[m][s - 1] : 0;
                const rand = random(0,1)/100;
                if (rand < epsilon || this._calcMaxDiffPheromons(current, this._mstep[m]) < 1e-9) {
                    this._mstep[m][s] = this._nextRandomStep(this._mstep[m]);
                } else {
                    this._mstep[m][s] = this._nextMaxStep(current, this._mstep[m]);
                }
            }
        }
    }

    _update() {
        let sum = 0,
            min = 100,
            minAnt = -1;

        for (let i = 0; i < this._pheromone.length; i++) {
            for (let j = 0; j < this._pheromone[i].length; j++) {
                this._pheromone[i][j] *= this._rho;
            }
        }

        for (let m = 0; m < this._number; m++) {
            let d = this._distance[0][this._mstep[m][0]];
            for (let i = 1; i < this._step; i++) {
                d += this._distance[this._mstep[m][i - 1]][this._mstep[m][i]];
            }
            if (min > d) {
                min = d;
                minAnt = m;
            }

            sum += d;
        }

        this._pheromone[0][this._mstep[minAnt][0]] += this._q * (1 / min);
        for (let i = 1; i < this._step; i++) {
            this._pheromone[this._mstep[minAnt][i - 1]][this._mstep[minAnt][i]] += this._q * (1 / min);
        }

        // console.log('Average distance: ' + sum / NOA);
        this._average = sum;
    }

    _initPheromone(distance) {
        const pheromone = [];
        for (let i = 0; i < distance.length; i++) {
            const ary = [];
            for (let j = 0; j < distance[0].length; j++) {
                ary.push(0.0);
            }
            pheromone.push(ary);
        }
        return pheromone;
    }

    _initMStep(number, step) {
        const mstep = [];
        for (let i = 0; i < number; i++) {
            const ary = [];
            for (let j = 0; j < step; j++) {
                ary.push(0);
            }
            mstep.push(ary);
        }
        return mstep;
    }

    _calcMaxDiffPheromons(current, step) {
        const leftPointPheromons = this._getLeftPointPheromons(current, step);
        const max = Math.max.apply({}, leftPointPheromons);
        const min = Math.min.apply({}, leftPointPheromons);
        return Math.abs(max - min);
    }

    _nextRandomStep(step) {
        const leftPoints = this._getLeftPoints(step);
        const next = random(0, leftPoints.length - 1);
        return leftPoints[next];
    }

    _nextMaxStep(current, step) {
        const leftPoints = this._getLeftPoints(step);
        const leftPointPheromons = this._getLeftPointPheromons(current, step);
        let max = 0;

        for (let i = 1; i < leftPointPheromons.length; i++) {
            if (leftPointPheromons[i] > leftPointPheromons[max])
                max = i;
        }
        return leftPoints[max];
    }

    _getLeftPointPheromons(current, step) {
        const leftPoints = this._getLeftPoints(step);
        const leftPointPheromons = [];

        for (let i = 0; i < leftPoints.length; i++) {
            leftPointPheromons.push(this._pheromone[current][leftPoints[i]]);
        }
        return leftPointPheromons;
    }

    _getLeftPoints(step) {
        let leftPoints = [];
        for (let i = 1; i <= this._step; i++) {
            if (step.indexOf(i) === -1)
                leftPoints.push(i);
        }
        return leftPoints;
    }
}

module.exports = AntColony;