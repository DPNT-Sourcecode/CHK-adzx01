'use strict';

class HelloSolution {
    hello(friendName) {
        if (typeof friendName !== 'string') {
            throw new Error("Invalid input: " + friendName + " is not a string")
        }

        return "Hello, " + friendName + "!";
    }
}

module.exports = HelloSolution;

