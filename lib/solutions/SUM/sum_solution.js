'use strict';

const validateNum = (num) => {
    if (!Number.isInteger(num) || num < 0 || num > 100) {
        throw new Error("Invalid input: " + num + " is not an integer between 0 and 100")
    }
}

class SumSolution {
    compute(x, y) {
        validateNum(x);
        validateNum(y);
        return x + y;
    }
}

module.exports = SumSolution;