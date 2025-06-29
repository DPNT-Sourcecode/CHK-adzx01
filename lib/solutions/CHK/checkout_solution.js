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
            'G': 20,
            'H': 10,
            'I': 35,
            'J': 60,
            'K': 70,
            'L': 90,
            'M': 15,
            'N': 40,
            'O': 10,
            'P': 50,
            'Q': 30,
            'R': 50,
            'S': 20,
            'T': 20,
            'U': 40,
            'V': 50,
            'W': 20,
            'X': 17,
            'Y': 20,
            'Z': 21,
        };

        this.singleItemOffers = [
            {
                item: 'A',
                offers: [
                    {
                        count: 5,
                        price: 200
                    },
                    {
                        count: 3,
                        price: 130
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
            },
            {
                item: 'H',
                offers:[
                    {
                        count: 10,
                        price: 80
                    },
                    {
                        count: 5,
                        price: 45
                    }
                ]
            },
            {
                item: 'K',
                offers: [
                    {
                        count: 2,
                        price: 150
                    }
                ]
            },
            {
                item: 'P',
                offers: [
                    {
                        count: 5,
                        price: 200
                    }
                ]
            },
            {
                item: 'Q',
                offers: [
                    {
                        count: 3,
                        price: 80
                    }
                ]
            },
            {
                item: 'V',
                offers: [
                    {
                        count: 3,
                        price: 130
                    },
                    {
                        count: 2,
                        price: 90
                    }
                ]
            }
        ];

        this.freeItemOffers = [
            {
                item: 'E',
                count: 2,
                freeItem: 'B'
            },
            {
                item: 'F',
                count: 2,
                freeItem: 'F'
            },
            {
                item: 'N',
                count: 3,
                freeItem: 'M'
            },
            {
                item: 'R',
                count: 3,
                freeItem: 'Q'
            },
            {
                item: 'U',
                count: 3,
                freeItem: 'U'
            },
        ]

        this.groupOffers = [
            {
                items: ['S', 'T', 'X', 'Y', 'Z'],
                count: 3,
                price: 45
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
                    let canApply = Math.floor(itemCounts[itemOffer.item] / offer.count) > 0;

                    while (canApply) {
                        total += offer.price;

                        itemCounts[itemOffer.item] = Math.max(0, itemCounts[itemOffer.item] - offer.count);

                        canApply = Math.floor(itemCounts[itemOffer.item] / offer.count) > 0;
                    }
                }
            }
        }

        this.removeZeroCountItems(itemCounts);

        return total;
    }

    // Apply group offers and remove them from the item counts
    applyGroupOffers(itemCounts, total) {
        for (const offer of this.groupOffers) {
            const items = offer.items;
            const count = offer.count;

            let canApply = items.reduce((acc, item) => acc + (itemCounts[item] || 0), 0) >= count;

            while (canApply) { 
                let currentCount = count;

                for (const item of items) {
                    if (itemCounts[item]) {
                        const available = Math.min(currentCount, itemCounts[item]);

                        currentCount -= available;

                        itemCounts[item] = Math.max(0, itemCounts[item] - available);
                    }

                    if (currentCount === 0) {
                        break;
                    }
                }

                total += offer.price;

                canApply = items.reduce((acc, item) => acc + (itemCounts[item] || 0), 0) >= count;
            }
        }

        return total;
    }

    // Remove free items from the item counts
    removeFreeItems(itemCounts) {
        const processedItems = {};

        for (const offer of this.freeItemOffers) {
            if (itemCounts[offer.item]) {
                let canApply = Math.floor(itemCounts[offer.item] / offer.count) > 0;

                while (canApply) {
                    processedItems[offer.item] = (processedItems[offer.item] || 0) + offer.count;
                    itemCounts[offer.item] = Math.max(0, (itemCounts[offer.item] || 0) - offer.count);

                    itemCounts[offer.freeItem] = Math.max(0, (itemCounts[offer.freeItem] || 0) - 1);

                    canApply = Math.floor(itemCounts[offer.item] / offer.count) > 0;
                }
            }
        }

        // add processed items back to the item counts once free items have been removed
        for (const [item, count] of Object.entries(processedItems)) {
            itemCounts[item] += count;
        }

        this.removeZeroCountItems(itemCounts);
    }

    checkout(skus) {
        if (typeof skus !== 'string') {
            return -1;
        }

        // check each character has a defined price
        if (skus.split('').some(item => !this.prices[item])) {
            return -1;
        }

        const itemCounts = {};

        for (const item of skus) {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        }

        this.removeFreeItems(itemCounts);

        let total = 0;

        total += this.applyGroupOffers(itemCounts, total);

        total += this.applySingleItemOffers(itemCounts, total);

        total += this.sumRemainingItems(itemCounts);

        return total;
    }
}

module.exports = CheckoutSolution;
