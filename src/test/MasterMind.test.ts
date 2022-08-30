import {MasterMind} from "../main/MasterMind";
import {Colors, ResponseColors} from "../main/enums";

const masterMind = new MasterMind([Colors.HONEYSUCKLE, Colors.PURPLE, Colors.PURPLE, Colors.PINK]);

test('shouldReturnEmptyListForWrongGuess', async () => {
    expect(masterMind.guess([Colors.GOLD, Colors.GOLD, Colors.GOLD, Colors.GOLD])).toStrictEqual([]);
});

test('shouldReturnListOfOneWhiteForGoodColorInWrongPlace', async () => {
    expect(masterMind.guess([Colors.GOLD, Colors.GOLD, Colors.GOLD, Colors.HONEYSUCKLE]))
        .toStrictEqual([ResponseColors.WHITE]);
});

test('shouldReturnListOfOneBlackForGoodColorInGoodPlace', async () => {
    expect(masterMind.guess([Colors.HONEYSUCKLE, Colors.GOLD, Colors.GOLD, Colors.GOLD]))
        .toStrictEqual([ResponseColors.BLACK]);
});

test('shouldReturnListOfOneBlackForGoodColorInGoodPlaceAndIgnoreSameColorGuessOnWrongPlace', async () => {
    expect(masterMind.guess([Colors.HONEYSUCKLE, Colors.HONEYSUCKLE, Colors.HONEYSUCKLE, Colors.HONEYSUCKLE]))
        .toStrictEqual([ResponseColors.BLACK]);
});

test('shouldNotDuplicateWhiteColorsForMultipleGoodColorGuess', async () => {
    expect(masterMind.guess([Colors.PURPLE, Colors.HONEYSUCKLE, Colors.HONEYSUCKLE, Colors.HONEYSUCKLE]))
        .toStrictEqual([ResponseColors.WHITE, ResponseColors.WHITE]);
});

test('shouldReturnTwoWhiteAndOneBlackWhenTwoGoodColorGuessOnBadPositionAndOneGoodGuess', async () => {
    expect(masterMind.guess([Colors.PURPLE, Colors.PURPLE, Colors.HONEYSUCKLE, Colors.GOLD]))
        .toStrictEqual([ResponseColors.BLACK, ResponseColors.WHITE, ResponseColors.WHITE]);
});

test('shouldReturnTwoWhiteWhenTwoGoodColorGuessOnBadPosition', async () => {
    expect(masterMind.guess([Colors.PURPLE, Colors.GOLD, Colors.GOLD, Colors.PURPLE]))
        .toStrictEqual([ResponseColors.WHITE, ResponseColors.WHITE]);
});

test('shouldReturnTwoBlackWhenTwoGoodGuess', async () => {
    expect(masterMind.guess([Colors.PURPLE, Colors.PURPLE, Colors.PURPLE, Colors.PURPLE]))
        .toStrictEqual([ResponseColors.BLACK, ResponseColors.BLACK]);
});

test('shouldReturnFourBlackWhenGoodGuess', async () => {
    expect(masterMind.guess([Colors.HONEYSUCKLE, Colors.PURPLE, Colors.PURPLE, Colors.PINK]))
        .toStrictEqual([ResponseColors.BLACK, ResponseColors.BLACK, ResponseColors.BLACK, ResponseColors.BLACK]);
});

test('shouldReturnFourWhiteWhenGoodColorsOnBadPositions', async () => {
    expect(masterMind.guess([Colors.PURPLE, Colors.HONEYSUCKLE, Colors.PINK, Colors.PURPLE]))
        .toStrictEqual([ResponseColors.WHITE, ResponseColors.WHITE, ResponseColors.WHITE, ResponseColors.WHITE]);
});

test('shouldReturnErrorWhenTooManyColorsOnGuess', async () => {
    const t = () => {
        masterMind.guess([Colors.PURPLE, Colors.HONEYSUCKLE, Colors.PINK, Colors.PURPLE, Colors.PURPLE])
    };
    expect(t).toThrow(RangeError);
});

test('shouldReturnExceptionWhenTooLittleColorsOnGuess', async () => {
    const t = () => {
        masterMind.guess([Colors.PURPLE, Colors.PURPLE])
    };
    expect(t).toThrow(RangeError);
});
