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

        this.singleItemOffers = [
            {
                item: 'A',
                offers: [
                    {
                        count: 3,
                        price: 130
                    },
                    {
                        count: 5,
                        price: 200
                    }
                ]
            },
            {
                item: 'B',
                offers: [
                    {
                        count: 2,
                        price: 45
                    }
                ]
            }
        ];

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

    // Sum total of remaining items
    sumRemainingItems(itemCounts) {
        let total = 0;
        for (const [item, count] of Object.entries(itemCounts)) {
            total += this.prices[item] * count;
        }
        
        return total;
    }

    // Remove items that have a count of 0
    removeZeroCountItems(itemCounts) {
        for (const [item, count] of Object.entries(itemCounts)) {
            if (count === 0) {
                delete itemCounts[item];
            }
        }
    }

    // Apply single item offers and remove them from the item counts
    applySingleItemOffers(itemCounts, total) {
        for (const itemOffer of this.singleItemOffers) {
            for (const offer of itemOffer.offers) {
                if (itemCounts[itemOffer.item]) {
                    const offerApplyCount = Math.floor(itemCounts[itemOffer.item] / offer.count);
                    if (offerApplyCount > 0) {
                        total += offerApplyCount * offer.price;
                        itemCounts[itemOffer.item] = Math.max(0, itemCounts[itemOffer.item] - offerApplyCount * offer.count);
                    }
                }
            }
        }

        this.removeZeroCountItems(itemCounts);

        return total;
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

        this.removeZeroCountItems(itemCounts);
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


