import {Colors, ResponseColors} from "./enums";

export class MasterMind {
    private readonly code: readonly Colors[];

    constructor(code: readonly Colors[]) {
        this.code = code;
    }

    guess(colors: Colors[]): ResponseColors[] {
        this.areColorsInValidSize(colors);
        let response: ResponseColors[] = [];
        let colorsCount = new Map<Colors, number>();
        this.code.forEach((color) =>
            colorsCount.set(color, (colorsCount.get(color) || 0) + 1));

        this.findBlacks(colors, response, colorsCount);
        this.findWhites(colors, response, colorsCount);

        return response;
    }

    private findBlacks(colors: Colors[], response: ResponseColors[], colorsCount: Map<Colors, number>) {
        colors.filter((color, index) => color == this.code[index])
            .forEach(this.updateResponseAndColorsCounter(response, colorsCount, ResponseColors.BLACK));
    }

    private findWhites(colors: Colors[], response: ResponseColors[],
                       colorsCount: Map<Colors, number>) {
        colors.forEach(this.updateResponseAndColorsCounter(response, colorsCount, ResponseColors.WHITE));
    }

    private updateResponseAndColorsCounter(response: ResponseColors[], colorsCount: Map<Colors, number>, responseColor: ResponseColors) {
        return (color: Colors) => {
            if (this.isGoodColorGuessOnWrongPlace(colorsCount, color)) {
                response.push(responseColor);
                colorsCount.set(color, (colorsCount.get(color) ?? 0) - 1);
            }
        };
    }

    private isGoodColorGuessOnWrongPlace(colorsCount: Map<Colors, number>,
                                         color: Colors): boolean {
        return this.code.includes(color) && this.isColorCounterMoreThanZero(colorsCount, color);
    }

    private isColorCounterMoreThanZero(colorsCount: Map<Colors, number>, color: Colors): boolean {
        let numberOfColorsLeft = colorsCount.get(color);
        return numberOfColorsLeft === undefined ? false : numberOfColorsLeft > 0;
    }

    private areColorsInValidSize(colors: Colors[]) {
        if (colors.length != this.code.length) {
            throw new RangeError(`You guessed ${colors.length} colors but answer include ${this.code.length} colors!`);
        }
    }
}