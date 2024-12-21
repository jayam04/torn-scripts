// ==UserScript==
// @name         Torn Poker
// @namespace    https://crimsontwilight.in
// @version      0.1
// @description  Calculate Win Probability for Poker in Torn
// @author       Jayam Patel
// @match        https://www.torn.com/page.php?sid=holdem*
// @run-at       document-end
// @icon         https://raw.githubusercontent.com/jayam04/torn-scripts/master/tornPoker/icon.png
// @license      Apache License 2.0
// @grant        none
// @require      https://update.greasyfork.org/scripts/501645/1416051/Torn%20UI%20Elements%20%28for%20Developers%29.js
// @require      https://update.greasyfork.org/scripts/501648/1416074/Constants%20for%20Torn%20Scripts%20%28for%20Developers%29.js
// ==/UserScript==

const numberOfHandsBasedOnRank = {
    0: 36,
    1: 624,
    3: 5112,
    4: 9180,
    5: 58656,
    6: 1221792,
    6: 1,
    7: 1,
    8: 1,
};

class Card {
    constructor(value, suit) {
        this.suit = suit;
        this.value = value;
    }
}

class Hand {
    constructor(cards) {
        this.cards = cards;
        this.rank = this.evaluate();
    }

    evaluate() {
        const cardValues = this.cards.map((card) => card.value);
        const cardSuits = this.cards.map((card) => card.suit);

        const valueCounts = {};
        cardValues.forEach((value) => {
            valueCounts[value] = (valueCounts[value] || 0) + 1;
        });

        const valueCountsArray = Object.values(valueCounts).sort(
            (a, b) => b - a
        );

        const isFlush = new Set(cardSuits).size === 1;
        const isStraight =
            Math.max(...cardValues) - Math.min(...cardValues) === 4 &&
            valueCountsArray.length == 5;
        const isHighestStraight =
            compareLists(cardValues, [1, 10, 11, 12, 13]) == 0;

        // Royal Flush
        if (isFlush && isHighestStraight) {
            return 0;
        }
        // Straight FLush
        else if (isStraight && isFlush) {
            return 1;
        }
        // Four of a Kind
        else if (valueCountsArray[0] === 4) {
            return 2;
        }
        // Full House
        else if (valueCountsArray[0] == 3 && valueCountsArray[1] == 2) {
            return 3;
        }
        // Flush
        else if (isFlush) {
            return 4;
        }
        // Straight Hand
        else if (isStraight || isHighestStraight) {
            return 5;
        }
        // Three of a Kind
        else if (valueCountsArray[0] === 3) {
            return 6;
        }
        // Two Pairs
        else if (valueCountsArray[0] === 2 && valueCountsArray[1] === 2) {
            return 7;
        }
        // One Pair
        else if (valueCountsArray[0] === 2) {
            return 8;
        }
        // High Card
        else {
            return 9;
        }
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
        let rankedHands = {};
        for (let hand of hands) {
            if (!rankedHands[hand.rank]) {
                rankedHands[hand.rank] = [];
            }
            rankedHands[hand.rank].push(hand);
        }

        for (let i = 0; i < 10; i++) {
            if (!rankedHands[i]) {
                continue;
            }
            rankedHands[i].sort((a, b) => Hand.compare(b, a));
            return rankedHands[i][0];
        }

        return null;
    }

    static compare(hand1, hand2) {
        const cardValues1 = hand1.cards.map((card) => card.value);
        const cardValues2 = hand2.cards.map((card) => card.value);

        while (cardValues1.includes(1))
            cardValues1[cardValues1.indexOf(1)] = 14;
        while (cardValues2.includes(1))
            cardValues2[cardValues2.indexOf(1)] = 14;

        cardValues1.sort((a, b) => b - a);
        cardValues2.sort((a, b) => b - a);

        for (let i = 0; i < 5; i++) {
            const diff = cardValues1[i] - cardValues2[i];
            if (diff) return diff;
        }

        return 0;
    }
}

class Table {
    constructor() {
        this.cards = [];
    }

    addNewCards(cards) {
        this.cards = this.cards.concat(cards);
    }

    resetTable() {
        this.cards = [];
    }
}

class Player {
    constructor(cards) {
        this.cards = cards;
    }

    resetCards() {
        this.cards = [];
    }

    addCards(cards) {
        this.cards = this.cards.concat(cards);
    }
}

class Game {
    static deck = Game.getFullDeck();

    constructor() {
        this.table = new Table();
        this.player = new Player();

        this.knownCards = [];
        this.playerCards = [];
    }

    resetGame() {
        this.table.resetTable();
        this.player.resetCards();

        this.knownCards = [];
        this.playerCards = [];
    }

    update() {
        this.knownCards = Game.getKnownCards();
        this.updateAllCardsOnTable(this.knownCards.slice(0, 5));
        this.playerCards = this.getPlayerCards();
        this.generateAllPossibleOpponentHands();

        this.calculateRank();

        // TODO
        PRINTED = 10;
    }

    addPlayerCards(cards) {
        this.player.addCards(cards);
    }

    addCardsOnTable(cards) {
        this.table.addNewCards(cards);
    }

    updateAllCardsOnTable(cards) {
        cards = cards.filter((e) => e);
        this.table.cards = cards;
    }

    calculateRank() {
        const bestPlayerHand = this.getBestPlayerHand();
        const possibleHands = this.generateAllPossibleOpponentHands();

        let tops = 0;
        if (!bestPlayerHand) return console.log("No best hand");
        for (let hand of possibleHands) {
            if (Hand.compare(hand, bestPlayerHand) > 0) {
                tops++;
            }
        }

        console.log("Tops", tops, " / ", possibleHands.length);
    }

    getPlayerCards() {
        let nonTableCards = this.knownCards.slice(5);
        return nonTableCards.filter((card) => card != null);
    }

    /**
     * Gets the best possible poker hand that can be made from the player's cards and table cards
     * Generates all possible 5-card combinations from player's hole cards and community cards
     * Returns the highest ranked hand from all possible combinations
     *
     * @returns {Hand} The best possible Hand object that can be made from available cards
     */
    getBestPlayerHand() {
        let allCards = this.table.cards;
        console.log("LOGX", this.table.cards, this.playerCards);
        if (this.playerCards) {
            allCards.concat(this.playerCards[0], this.playerCards[1]);
        }

        console.log(allCards);
        let hands = Hand.generateAllHands(
            this.table.cards.concat(this.playerCards[0], this.playerCards[1])
        );

        return Hand.getBestHand(hands);
    }

    /**
     * Generates all possible poker hands using the cards on the table and remaining deck
     * For each pair of unused cards from the deck:
     * - Combines them with the table cards
     * - Generates all 5-card hand combinations
     * - Finds the best hand from those combinations
     * - Adds the best hand to possible hands array
     *
     * @returns {Hand[]} Array of best possible hands that can be made
     */
    generateAllPossibleOpponentHands() {
        let possibleHands = [];
        for (let i = 0; i < Game.deck.length; i++) {
            if (
                this.table.cards.includes(Game.deck[i]) ||
                (this.playerCards != null &&
                    this.playerCards.includes(Game.deck[i]))
            ) {
                continue;
            }
            for (let j = i + 1; j < Game.deck.length; j++) {
                if (
                    this.table.cards.includes(Game.deck[j]) ||
                    (this.playerCards != null &&
                        this.playerCards.includes(Game.deck[j]))
                ) {
                    continue;
                }
                let allCardCombinations = this.table.cards.concat(
                    Game.deck[i],
                    Game.deck[j]
                );
                console.log("LOG: ", Game.deck[i], Game.deck[j]);

                let allGeneratableHands =
                    Hand.generateAllHands(allCardCombinations);
                const bestHand = Hand.getBestHand(allGeneratableHands);
                if (bestHand) possibleHands.push(bestHand);
            }
        }
        return possibleHands;
    }

    /**
     * Returns a complete deck of 52 playing cards
     * Each card is a Card object with a value (1-13) and suit (heart, diamond, club, spade)
     *
     * @returns {Card[]} Array of 52 Card objects representing a full deck
     */
    static getFullDeck() {
        const cardSuites = ["heart", "diamond", "club", "spade"];
        const cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        return cardSuites.flatMap((suite) =>
            cardValues.map((value) => new Card(value, suite))
        );
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
                .replace("-A", "-1")
                .replace("-K", "-13")
                .replace("-Q", "-12")
                .replace("-J", "-11");
            if (card == "cardSize") {
                return;
            }

            return new Card(parseInt(card.split("-")[1]), card.split("-")[0]);
        });

        console.log(knownCards);
        return knownCards;
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

function findBestHand(hands) {
    const handRanks = hands.map((hand) => hand.rank);
    const bestHandIndex = handRanks.indexOf(Math.min(...handRanks));
    return hands[bestHandIndex];
}

function rankHands(hands) {
    let rankedHands = {};

    for (let hand of hands) {
        if (!rankedHands[hand.rank]) {
            rankedHands[hand.rank] = [];
        }
        rankedHands[hand.rank].push(hand);
    }

    return rankedHands;
}

function createPossibleHands(cards) {
    const allHands = [];
    for (let i = 0; i < allCards.length; i++) {
        if (cards.length === 4) {
            allHands.push(new Hand([...cards, allCards[i]]));
            continue;
        }
        for (let j = i + 1; j < allCards.length; j++) {
            if (cards.length === 3) {
                allHands.push(new Hand([...cards, allCards[i], allCards[j]]));
                continue;
            }
        }
    }
}

class Test {
    static run() {}
}

class TestGame {
    static testAll() {
        TestGame.testRanking();
    }

    static testRanking() {
        const game = new Game();

        game.addCardsOnTable([
            new Card(3, "diamond"),
            new Card(4, "heart"),
            new Card(7, "spade"),
        ]);

        game.playerCards = [new Card(13, "club"), new Card(6, "spade")];

        game.calculateRank();
    }
}

class TestHand {
    static testAll() {
        TestHand.testCompareHands();
        TestHand.testGetBestHand();
    }
    static testGenerateAllHands() {
        let cards = [
            new Card(1, "heart"),
            new Card(2, "heart"),
            new Card(3, "heart"),
            new Card(4, "heart"),
            new Card(5, "heart"),
            new Card(6, "heart"),
        ];

        let generatedHands = Hand.generateAllHands(cards);
        console.log(generatedHands);
    }

    static testGetBestHand() {
        let cards = [
            new Card(
                Math.floor(Math.random() * 13) + 1,
                ["heart", "diamond", "club", "spade"][
                    Math.floor(Math.random() * 4)
                ]
            ),
            new Card(
                Math.floor(Math.random() * 13) + 1,
                ["heart", "diamond", "club", "spade"][
                    Math.floor(Math.random() * 4)
                ]
            ),
            new Card(
                Math.floor(Math.random() * 13) + 1,
                ["heart", "diamond", "club", "spade"][
                    Math.floor(Math.random() * 4)
                ]
            ),
            new Card(
                Math.floor(Math.random() * 13) + 1,
                ["heart", "diamond", "club", "spade"][
                    Math.floor(Math.random() * 4)
                ]
            ),
            new Card(
                Math.floor(Math.random() * 13) + 1,
                ["heart", "diamond", "club", "spade"][
                    Math.floor(Math.random() * 4)
                ]
            ),
            new Card(
                Math.floor(Math.random() * 13) + 1,
                ["heart", "diamond", "club", "spade"][
                    Math.floor(Math.random() * 4)
                ]
            ),
            new Card(
                Math.floor(Math.random() * 13) + 1,
                ["heart", "diamond", "club", "spade"][
                    Math.floor(Math.random() * 4)
                ]
            ),
        ];

        console.log(cards);
        let generatedHands = Hand.generateAllHands(cards);
        let bestHand = Hand.getBestHand(generatedHands);
        console.log(bestHand);
    }

    static testCompareHands() {
        let cards = [
            new Card(1, "heart"),
            new Card(2, "heart"),
            new Card(3, "heart"),
            new Card(4, "heart"),
            new Card(5, "heart"),
            new Card(9, "heart"),
        ];

        let hand1 = new Hand(cards.slice(0, 5));
        let hand2 = new Hand(cards.slice(1, 6));
        console.log(Hand.compare(hand1, hand2));
    }
}

const MODE = "test";

if (MODE == "test") {
    TestGame.testAll();
} else {
    const pokerGame = new Game();
    setInterval(() => pokerGame.update(), 1000);
}

// Temp
let PRINTED = 10;
