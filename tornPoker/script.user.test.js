describe('Card Class', () => {
    test('should create a card with correct value and suit', () => {
        const card = new Card(14, 'heart');
        expect(card.value).toBe(14);
        expect(card.suit).toBe('heart');
    });
});

describe('Hand Class', () => {
    test('should correctly identify Three of a Kind', () => {
        const hand = new Hand([
            new Card(2, 'diamond'),
            new Card(2, 'heart'),
            new Card(2, 'club'),
            new Card(5, 'spade'),
            new Card(7, 'heart')
        ]);
        expect(hand.score).toBe(40000050007);
    });

    test('should correctly identify Two Pairs', () => {
        const hand = new Hand([
            new Card(2, 'diamond'),
            new Card(2, 'heart'),
            new Card(5, 'club'),
            new Card(5, 'spade'),
            new Card(7, 'heart')
        ]);
        expect(hand.score).toBe(30000050207);
    });

    test('should correctly identify One Pair', () => {
        const hand = new Hand([
            new Card(2, 'diamond'),
            new Card(2, 'heart'),
            new Card(5, 'club'),
            new Card(7, 'spade'),
            new Card(8, 'heart')
        ]);
        expect(hand.score).toBe(20002000807);
    });
});

describe('Game Class', () => {
    let game;

    beforeEach(() => {
        game = new Game();
    });

    test('should initialize with empty cards', () => {
        expect(game.playerCards).toHaveLength(0);
        expect(game.cardsOnTable).toHaveLength(0);
    });

    test('should add player cards correctly', () => {
        game.addPlayerCard(new Card(14, 'heart'));
        game.addPlayerCard(new Card(13, 'spade'));
        expect(game.playerCards).toHaveLength(2);
    });

    test('should not add more than 2 player cards', () => {
        game.addPlayerCard(new Card(14, 'heart'));
        game.addPlayerCard(new Card(13, 'spade'));
        game.addPlayerCard(new Card(12, 'diamond'));
        expect(game.playerCards).toHaveLength(2);
    });

    test('should calculate win probability with 5 or more cards', () => {
        game.addPlayerCard(new Card(14, 'diamond'));
        game.addPlayerCard(new Card(13, 'diamond'));
        game.addCardOnTable(new Card(12, 'diamond'));
        game.addCardOnTable(new Card(11, 'diamond'));
        game.addCardOnTable(new Card(10, 'diamond'));
        
        game.update();
        expect(game.winProbability).toBeGreaterThan(0);
    });

    test('should return 0 win probability with less than 5 cards', () => {
        game.addPlayerCard(new Card(14, 'diamond'));
        game.addPlayerCard(new Card(13, 'diamond'));
        game.addCardOnTable(new Card(12, 'diamond'));
        
        game.update();
        expect(game.winProbability).toBe(0);
    });
});

describe('Helper Functions', () => {
    test('compareLists should correctly compare sorted lists', () => {
        expect(compareLists([3,2,1], [3,2,1])).toBe(0);
        expect(compareLists([3,2,1], [4,2,1])).toBeLessThan(0);
        expect(compareLists([4,2,1], [3,2,1])).toBeGreaterThan(0);
    });
});
