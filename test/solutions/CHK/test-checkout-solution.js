var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const CheckoutSolution = require('../../../lib/solutions/CHK/checkout_solution');

describe('CHK challenge: checkout', function() {
	// it('should return 0 for an empty string', function() {
	// 	assert.equal(new CheckoutSolution().checkout(''), 0);
	// });

	// it('should return -1 for an invalid string', function() {
	// 	assert.equal(new CheckoutSolution().checkout('A123'), -1);
	// });

	// it('should return 50 for a single A', function() {
	// 	assert.equal(new CheckoutSolution().checkout('A'), 50);
	// });

	// it('should return 200 for five A', function() {
	// 	assert.equal(new CheckoutSolution().checkout('AAAAA'), 200);
	// });

	// it('should return 130 for three A', function() {
	// 	assert.equal(new CheckoutSolution().checkout('AAA'), 130);
    // });

    // it('should return 45 for two B', function() {
    //     assert.equal(new CheckoutSolution().checkout('BB'), 45);
    // });

    // it ('should return 80 for EEB', function() {
    //     assert.equal(new CheckoutSolution().checkout('EEB'), 80);
    // });

    // it ('should return 20 for FFF', function() {
    //     assert.equal(new CheckoutSolution().checkout('FFF'), 20);
    // });
    
    // it ('should return 30 for FFFF', function() {
    //     assert.equal(new CheckoutSolution().checkout('FFFF'), 30);
    // });

    // it ('should return 80 for EE', function() {
    //     assert.equal(new CheckoutSolution().checkout('EE'), 80);
    // });
    
    // it ('should return 20 for FF', function() {
    //     assert.equal(new CheckoutSolution().checkout('FF'), 20);
    // });

    it ('should return 45 for STX', function() {
        assert.equal(new CheckoutSolution().checkout('STX'), 45);
    });

    // it ('should return 45 for YYY', function() {
    //     assert.equal(new CheckoutSolution().checkout('YYY'), 45);
    // });

    // it ('should return 45 for ZZT', function() {
    //     assert.equal(new CheckoutSolution().checkout('ZZT'), 45);
    // });

    // it ('should return 195 for STXKK', function() {
    //     assert.equal(new CheckoutSolution().checkout('STXKK'), 195);
    // });
    
});