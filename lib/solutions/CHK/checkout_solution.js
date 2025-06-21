'use strict';

class CheckoutSolution {

    constructor() {
        this.prices = {
            'A': 50,
            'B': 30,
            'C': 20,
            'D': 15,
            'E': 40,
        };

        this.singleItemOffers = {
            'A': { 
                3: 130,
                5: 200
            },
            'B': { 2: 45 },
        };

        this.crossItemOffers = {
            'E': { 2: { 'B': 1 } },
        }
    }

    calculateItemTotal(item, count) {
        const price = this.prices[item];
        const offer = this.singleItemOffers[item];

        if (!offer) {
            return price * count;
        }

        const offerQuantities = Object.keys(offer).map(Number).sort((a, b) => b - a);

        let remainingCount = count;
        let total = 0;

        for (const offerQuantity of offerQuantities) {
            const offerPrice = offer[offerQuantity];
            const offerGroups = Math.floor(remainingCount / offerQuantity);
            total += offerGroups * offerPrice;
            remainingCount %= offerQuantity;
        }

        return total;
    }

    getFreeItems(itemCounts) {
        const freeItems = {};

        for (const [item, count] of Object.entries(itemCounts)) {
            const freeItemOffer = this.crossItemOffers[item];

            if (freeItemOffer) {
                const offerQuantity = parseInt(Object.keys(freeItemOffer)[0]);
                const freeItem = freeItemOffer[offerQuantity];

                if (itemCounts[freeItem]) {
                    const freeCount = Math.floor(itemCounts[item] / offerQuantity);
                    freeItems[freeItem] = (freeItems[freeItem] || 0) + freeCount;
                }
            }
        }

        return freeItems;
    }

    // skus is expected to be a string
    checkout(skus) {
        if (typeof skus !== 'string') {
            return -1;
        }

        if (!/^[ABCDE]*$/.test(skus)) {
            return -1;
        }

        const itemCounts = {};

        for (const item of skus) {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        }

        const freeItems = this.getFreeItems(itemCounts);

        for (const [item, count] of Object.entries(freeItems)) {
            if (!itemCounts[item]) {
                continue;
            }

            if (itemCounts[item] >= count) {
                itemCounts[item] -= count;
            } else {
                itemCounts[item] = 0;
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



