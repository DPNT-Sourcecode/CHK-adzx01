'use strict';

class CheckoutSolution {

    constructor() {
        this.prices = {
            'A': 50,
            'B': 30,
            'C': 20,
            'D': 15,
            'E': 40,
            'F': 10,
        };

        this.singleItemOffers = {
            'A': { 
                3: 130,
                5: 200
            },
            'B': { 2: 45 },
        };

        this.freeItemOffers = [
            {
                item: 'E',
                count: '2',
                freeItem: 'B'
            },
            {
                item: 'F',
                count: '2',
                freeItem: 'F'
            }
        ]
    }

    // Remove free items from the item counts
    removeFreeItems(itemCounts) {
        for (const offer of this.freeItemOffers) {
            if (itemCounts[offer.item]) {
                offerApplyCount = Math.floor(itemCounts[offer.item] / offer.count);
                if (offerApplyCount > 0) {
                    itemCounts[offer.freeItem] = Math.max(0, itemCounts[offer.freeItem] - offerApplyCount);
                }
            }
        }

        // remove items that have a count of 0
        for (const [item, count] of Object.entries(itemCounts)) {
            if (count === 0) {
                delete itemCounts[item];
            }
        }
    }

    // skus is expected to be a string
    checkout(skus) {
        if (typeof skus !== 'string') {
            return -1;
        }

        if (!/^[ABCDEF]*$/.test(skus)) {
            return -1;
        }

        const itemCounts = {};

        for (const item of skus) {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        }

        const freeItems = this.getFreeItems(itemCounts);

        for (const [item, freeCount] of Object.entries(freeItems)) {
            if (itemCounts[item]) {
                itemCounts[item] = Math.max(0, itemCounts[item] - freeCount);
            }
        }

        let total = 0;

        for (const [item, count] of Object.entries(itemCounts)) {
            total += this.calculateItemTotal(item, count);
        }

        return total;
    }
}

module.exports = CheckoutSolution;

