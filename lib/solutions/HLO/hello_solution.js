'use strict';

class HelloSolution {
    hello(friendName) {
        // Basic validation
        if (typeof friendName !== 'string') {
            throw new Error("Invalid input: friendName must be a string");
        }
        
        // Simple hello message - this is a starting point
        // You may need to adjust based on feedback from deployment
        return `Hello, ${friendName}!`;
    }
}

module.exports = HelloSolution;
