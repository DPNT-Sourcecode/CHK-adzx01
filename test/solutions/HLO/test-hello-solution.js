var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const HelloSolution = require('../../../lib/solutions/HLO/hello_solution');

describe('HLO challenge: hello world', function() {
    it('should return hello message with the given name', function() {
        const solution = new HelloSolution();
        assert.equal(solution.hello('World'), 'Hello, World!');
    });

    it('should handle empty string', function() {
        const solution = new HelloSolution();
        assert.equal(solution.hello(''), 'Hello, !');
    });

    it('should handle different names', function() {
        const solution = new HelloSolution();
        assert.equal(solution.hello('Alice'), 'Hello, Alice!');
        assert.equal(solution.hello('Bob'), 'Hello, Bob!');
    });

    it('should throw error for non-string input', function() {
        const solution = new HelloSolution();
        assert.throws(() => solution.hello(123), Error, 'Invalid input: friendName must be a string');
        assert.throws(() => solution.hello(null), Error, 'Invalid input: friendName must be a string');
    });
}); 