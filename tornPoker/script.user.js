// ==UserScript==
// @name         Torn Poker
// @namespace    https://crimsontwilight.in
// @version      0.1
// @description  Calculate Win Probability for Poker in Torn
// @author       Jayam Patel
// @match        https://www.torn.com/page.php?sid=holdem*
// @run-at       document-end
// @icon         https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornPoker/icon1.png
// @license      Apache License 2.0
// @grant        none
// @require      https://update.greasyfork.org/scripts/501645/1416051/Torn%20UI%20Elements%20%28for%20Developers%29.js
// @require      https://update.greasyfork.org/scripts/501648/1416074/Constants%20for%20Torn%20Scripts%20%28for%20Developers%29.js
// ==/UserScript==

class Card {
    constructor(value, suit) {
        this.suit = suit;
        this.value = value;
    }
}

class Hand {
    constructor(cards) {
        this.cards = cards;
        this.score = this.evaluate();
    }

    evaluate() {
        const cardValues = this.cards.map((card) => card.value);
        cardValues.sort((a, b) => b - a);
        const cardSuits = this.cards.map((card) => card.suit);

        let valueCounts = {};
        let suitCounts = {};

        cardValues.forEach((value) => {
            valueCounts[value] = (valueCounts[value] || 0) + 1;
        });

        cardSuits.forEach((suit) => {
            suitCounts[suit] = (suitCounts[suit] || 0) + 1;
        });

        const isFlush = new Set(cardSuits).size === 1;
        const isStraight =
            (Math.max(...cardValues) - Math.min(...cardValues) === 4 ||
                compareLists(cardValues, [14, 2, 3, 4, 5]) == 0) &&
            Object.keys(valueCounts).length == 5;
        const isHighestStraight =
            compareLists(cardValues, [10, 11, 12, 13, 14]) == 0;

        let rank = 0;
        let score = 0;

        // Royal Flush
        if (isFlush && isHighestStraight) {
            rank = 10;
            score = rank * 10000000000;
        }
        // Straight FLush
        else if (isStraight && isFlush) {
            rank = 9;
            score = rank * 10000000000;
            score += Math.max(...cardValues);
        }
        // Four of a Kind
        else if (Object.values(valueCounts).includes(4)) {
            rank = 8;
            score = rank * 10000000000;

            let fourOfAKindValue = 0;
            let kickerValue = 0;

            for (let value in valueCounts) {
                if (valueCounts[value] == 4) {
                    fourOfAKindValue = parseInt(value);
                } else {
                    kickerValue = parseInt(value);
                }
            }

            score += fourOfAKindValue * 100;
            score += kickerValue;
        }
        // Full House
        else if (
            Object.values(valueCounts).includes(3) &&
            Object.values(valueCounts).includes(2)
        ) {
            rank = 7;
            score = rank * 10000000000;

            let threeOfAKindValue = 0;
            let pairValue = 0;

            for (let value in valueCounts) {
                if (valueCounts[value] == 3) {
                    threeOfAKindValue = parseInt(value);
                } else {
                    pairValue = parseInt(value);
                }
            }

            score += threeOfAKindValue * 100;
            score += pairValue;
        }
        // Flush
        else if (isFlush) {
            rank = 6;
            score = rank * 10000000000;

            for (let i = 0; i < 5; i++) {
                score += cardValues[i] * Math.pow(100, 4 - i);
            }
        }
        // Straight Hand
        else if (isStraight || isHighestStraight) {
            rank = 5;
            score = rank * 10000000000;
            score += Math.max(...cardValues);
        }
        // Three of a Kind
        else if (Object.values(valueCounts).includes(3)) {
            rank = 4;
            score = rank * 10000000000;

            let threeOfAKindValue = 0;
            let kickerValues = [];

            for (let value in valueCounts) {
                if (valueCounts[value] == 3) {
                    threeOfAKindValue = parseInt(value);
                } else {
                    kickerValues.push(parseInt(value));
                }
            }

            kickerValues.sort((a, b) => b - a);

            score += threeOfAKindValue * 10000;
            score += kickerValues[0] * 100;
            score += kickerValues[1];
        }
        // Two Pairs
        else if (
            Object.values(valueCounts).filter((count) => count === 2).length ===
            2
        ) {
            rank = 3;
            score = rank * 10000000000;

            let pairValues = [];
            let kickerValue = 0;

            for (let value in valueCounts) {
                if (valueCounts[value] == 2) {
                    pairValues.push(parseInt(value));
                } else {
                    kickerValue = parseInt(value);
                }
            }

            pairValues.sort((a, b) => b - a);

            score += pairValues[0] * 10000;
            score += pairValues[1] * 100;
            score += kickerValue;
        }
        // One Pair
        else if (Object.values(valueCounts).includes(2)) {
            rank = 2;
            score = rank * 10000000000;

            let pairValue = 0;
            let kickerValues = [];
            for (let value in valueCounts) {
                if (valueCounts[value] == 2) {
                    pairValue = parseInt(value);
                } else {
                    kickerValues.push(parseInt(value));
                }
            }

            kickerValues.sort((a, b) => b - a);

            score += pairValue * 1000000;
            score += kickerValues[0] * 10000;
            score += kickerValues[1] * 100;
            score += kickerValues[2];
        }
        // High Card
        else {
            rank = 1;
            score = rank * 10000000000;

            for (let i = 0; i < 5; i++) {
                score += cardValues[i] * Math.pow(100, 4 - i);
            }
        }

        return parseInt(score);
    }

    static generateAllHands(cards) {
        const allHands = [];
        cards = cards.filter((card) => card != null);
        if (cards.length < 5) {
            return allHands;
        }
        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                for (let k = j + 1; k < cards.length; k++) {
                    for (let l = k + 1; l < cards.length; l++) {
                        for (let m = l + 1; m < cards.length; m++) {
                            const hand = new Hand([
                                cards[i],
                                cards[j],
                                cards[k],
                                cards[l],
                                cards[m],
                            ]);
                            allHands.push(hand);
                        }
                    }
                }
            }
        }
        return allHands;
    }

    static getBestHand(hands) {
        if (!hands) {
            return null;
        }

        let bestHand = hands[0];
        for (let i = 1; i < hands.length; i++) {
            if (hands[i].score > bestHand.score) {
                bestHand = hands[i];
            }
        }
        return bestHand;
    }
}

function compareLists(list1, list2) {
    if (list1.length !== list2.length) {
        return false;
    }
    list1 = list1.sort((a, b) => b - a);
    list2 = list2.sort((a, b) => b - a);
    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) {
            return list1[i] - list2[i];
        }
    }

    return 0;
}

class Game {
    static deck = Game.getFullDeck();

    constructor() {
        this.reset();
    }

    reset() {
        this.playerCards = [];
        this.cardsOnTable = [];
        this.allCards = [];

        this.winProbability = 0;
        this.futureWinProbabilities = {
            "95+": 0,
            "90+": 0,
            "80+": 0,
            "65+": 0,
            "40+": 0,
        };
    }

    update() {
        this.updateCardsFromPage();
        this.winProbability = this.calculateWinProbabilty();

        // TODO: remove
        this.printStats();
    }

    updateCardsFromPage() {
        let knownCards = Game.getKnownCards();
        this.cardsOnTable = knownCards.slice(0, 5).filter((card) => card != null);

        let nonTableCards = knownCards.slice(5);
        this.playerCards = nonTableCards.filter((card) => card != null);
    }

    addCardOnTable(card) {
        this.cardsOnTable.push(card);
    }

    addPlayerCard(card) {
        if (this.playerCards.length < 2) {
            this.playerCards.push(card);
        }
    }

    calculateWinProbabilty() {
        const allCards = this.cardsOnTable.concat(
            this.playerCards[0],
            this.playerCards[1]
        );

        if (allCards.length < 5) {
            return 0;
        }
        const possiblePlayerHands = Hand.generateAllHands(allCards);
        const bestPlayerHand = Hand.getBestHand(possiblePlayerHands);

        // TODO: remove
        console.log("All Cards: ", allCards);
        console.log("Best Player Hand: ", bestPlayerHand);

        const remainingCards = [];
        for (let card of Game.deck) {
            for (let usedCard of allCards) {
                if (
                    usedCard.value == card.value &&
                    usedCard.suit == card.suit
                ) {
                    card = null;
                    break;
                }
            }
            if (card != null) {
                remainingCards.push(card);
            }
        }

        // TODO: remove
        // console.log("Remaining Cards: ", remainingCards);

        let totalPossibleOpponentHands = 0;
        let betterOpponentHands = 0;
        for (let i = 0; i < remainingCards.length; i++) {
            for (let j = i + 1; j < remainingCards.length; j++) {
                const allOpponentCards = this.cardsOnTable.concat(
                    remainingCards[i],
                    remainingCards[j]
                );
                const possibleOpponentHands =
                    Hand.generateAllHands(allOpponentCards);
                const bestOpponentHand = Hand.getBestHand(
                    possibleOpponentHands
                );

                // TODO: remove
                // console.log("Best Opponent Hand: ", bestOpponentHand);

                if (bestOpponentHand.score > bestPlayerHand.score) {
                    // TODO: remove
                    // console.log("Better Hand: ", bestOpponentHand);
                    betterOpponentHands += 1;
                }
                totalPossibleOpponentHands += 1;
            }
        }

        const winProbability =
            100 - (betterOpponentHands / totalPossibleOpponentHands) * 100;

        return Math.round(winProbability * 100) / 100;
    }

    printStats() {
        console.log("Player Cards: ", this.playerCards);
        console.log("Cards on Table: ", this.cardsOnTable);
        console.log("Win Probability: ", this.winProbability);
        console.log("Future Win Probabilities: ", this.futureWinProbabilities);
    }

    static getFullDeck() {
        let deck = [];
        for (let i = 2; i <= 14; i++) {
            deck.push(new Card(i, "diamond"));
            deck.push(new Card(i, "club"));
            deck.push(new Card(i, "heart"));
            deck.push(new Card(i, "spade"));
        }
        return deck;
    }

    /**
     * Retrieves and processes cards that are currently visible in the DOM
     * Looks for elements with specific class names that represent cards
     * Converts card representations from DOM elements into Card objects
     * Handles special cases for face cards (A, K, Q, J)
     *
     * Taken from Torn Community Script. Thanks everyone there.
     *
     * @returns {Card[]} Array of Card objects representing the currently visible cards
     */
    static getKnownCards() {
        let knownCards = Array.from(
            document.querySelectorAll(
                "[class*='flipper___'] > div[class*='front___'] > div"
            )
        ).map((e) => {
            // <div class="fourColors___ihYdi clubs-10___SmzgY cardSize___BbTMe"></div>
            // Desire: "hearts-4", "clubs-14"
            var card = (e.classList[1] || "null-0")
                .split("_")[0]
                .replace("-A", "-14")
                .replace("-K", "-13")
                .replace("-Q", "-12")
                .replace("-J", "-11");
            if (card == "cardSize") {
                return;
            }

            return new Card(parseInt(card.split("-")[1]), card.split("-")[0]);
        });

        // TODO: remove
        console.log(knownCards);
        return knownCards;
    }
}

const pokerGame = new Game();
setInterval(() => pokerGame.update(), 1000);

const testmode = false;
if (testmode) {
    // Testcases
    let hand = new Hand([
        new Card(2, "diamond"),
        new Card(3, "diamond"),
        new Card(4, "diamond"),
        new Card(2, "club"),
        new Card(2, "spade"),
    ]);

    const game = new Game();
    // First Test
    game.addPlayerCard(new Card(2, "heart"));
    game.addPlayerCard(new Card(3, "heart"));

    game.addCardOnTable(new Card(2, "diamond"));
    game.addCardOnTable(new Card(12, "diamond"));
    game.addCardOnTable(new Card(4, "diamond"));
    game.addCardOnTable(new Card(5, "club"));
    game.addCardOnTable(new Card(6, "club"));

    game.update();
    game.printStats();

    // Different Test
    game.reset();
    game.addPlayerCard(new Card(7, "spade"));
    game.addPlayerCard(new Card(8, "club"));

    game.addCardOnTable(new Card(4, "heart"));
    game.addCardOnTable(new Card(2, "club"));
    game.addCardOnTable(new Card(7, "club"));
    game.addCardOnTable(new Card(11, "diamond"));
    game.addCardOnTable(new Card(3, "spade"));

    game.update();
    game.printStats();

    // Different Test
    game.reset();
    game.addPlayerCard(new Card(11, "diamond"));
    game.addPlayerCard(new Card(14, "diamond"));

    game.addCardOnTable(new Card(10, "heart"));
    // game.addCardOnTable(new Card(2, "club"));
    game.addCardOnTable(new Card(7, "heart"));
    // game.addCardOnTable(new Card(11, "diamond"));
    game.addCardOnTable(new Card(11, "spade"));

    game.update();
    game.printStats();
}
