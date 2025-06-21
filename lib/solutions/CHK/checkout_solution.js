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

        this.freeItemOffers = {
            'E': { 2: { 'B': 1 } },
            'F': { 2: { 'F': 1 } },
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

        total += remainingCount * price;

        return total;
    }

    getFreeItems(itemCounts) {
        const freeItems = {};

        for (const [item, count] of Object.entries(itemCounts)) {
            const freeItemOffer = this.freeItemOffers[item];

            if (freeItemOffer) {
                const offerQuantity = parseInt(Object.keys(freeItemOffer)[0]);
                const freeItemDetails = freeItemOffer[offerQuantity];
                const freeItemName = Object.keys(freeItemDetails)[0];
                const freeItemQuantity = freeItemDetails[freeItemName];

                if (itemCounts[freeItemName]) {
                    // if offer is self referencing
                    if (item === freeItemName) {
                        let remainingPaidCount = count;
                        let totalFreeCount = 0;

                        while (remainingPaidCount >= offerQuantity) {
                            const offerGroups = Math.floor(remainingPaidCount / offerQuantity);
                            const newFreeItems = offerGroups * freeItemQuantity;
                            totalFreeCount += newFreeItems;
                            remainingPaidCount  = remainingPaidCount % offerQuantity + newFreeItems;
                        }

                        freeItems[freeItemName] = (freeItems[freeItemName] || 0) + totalFreeCount;
                    } else {
                        const offerGroups = Math.floor(count / offerQuantity);
                        const totalFreeItems = offerGroups * freeItemQuantity;
                        freeItems[freeItemName] = (freeItems[freeItemName] || 0) + totalFreeItems;
                    }
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



