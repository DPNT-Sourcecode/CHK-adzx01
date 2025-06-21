'use strict';

class CheckoutSolution {

    constructor() {
        this.prices = {
            'A': 50,
            'B': 30,
            'C': 20,
            'D': 15,
        };

        this.offers = {
            'A': { 3: 130 },
            'B': { 2: 45 },
        };
    }

    calculateItemTotal(item, count) {
        const price = this.prices[item];
        const offer = this.offers[item];

        if (!offer) {
            return price * count;
        }

        const offerQuantity = parseInt(Object.keys(offer)[0]);
        const offerPrice = offer[offerQuantity];

        const offerGroups = Math.floor(count / offerQuantity);
        const offerTotal = offerGroups * offerPrice;
        const remaining = count % offerQuantity;

        return offerTotal + (remaining * price);
    }

    // skus is expected to be a string
    checkout(skus) {
        if (typeof skus !== 'string') {
            return -1;
        }

        if (!/^[ABCD]*$/.test(skus)) {
            return -1;
        }

        const itemCounts = {};

        for (const item of skus) {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        }

        let total = 0;

        for (const [item, count] of Object.entries(itemCounts)) {
            total += this.calculateItemTotal(item, count);
        }

        return total;
    }
}

module.exports = CheckoutSolution;
