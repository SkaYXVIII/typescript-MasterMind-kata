enum Colors {
    PURPLE, BLUE, GOLD, CYAN, PINK, HONEYSUCKLE
}

enum ResponseColors {
    BLACK, WHITE
}

class MasterMind {
    private readonly code: readonly Colors[];

    constructor(code: readonly Colors[]) {
        this.code = code;
    }

    guess(colors: Colors[]): ResponseColors[] {
        this.areColorsInValidSize(colors);
        let response: ResponseColors[] = [];
        let copyOfCorrectColors: Colors[] = this.code.slice();
        let colorsCount = new Map<Colors, number>();
        this.code.forEach((color) =>
            colorsCount.set(color, (colorsCount.get(color) || 0) + 1));

        this.findBlacks(colors, response, colorsCount);
        this.findWhites(colors, response, copyOfCorrectColors, colorsCount);

        return response;
    }

    private findBlacks(colors: Colors[], response: ResponseColors[], colorsCount: Map<Colors, number>) {
        colors.filter((color, index) => color == this.code[index])
            .forEach(this.updateResponseAndColorsCounter(response, colorsCount, ResponseColors.BLACK));
    }

    private findWhites(colors: Colors[], response: ResponseColors[],
                       copyOfCorrectColors: Colors[], colorsCount: Map<Colors, number>) {
        colors.filter((color) => this.isGoodColorGuessOnWrongPlace(copyOfCorrectColors, colorsCount, color))
            .forEach(this.updateResponseAndColorsCounter(response, colorsCount, ResponseColors.WHITE));
    }

    private updateResponseAndColorsCounter(response: ResponseColors[], colorsCount: Map<Colors, number>, responseColor: ResponseColors) {
        return (color: Colors) => {
            response.push(responseColor);
            colorsCount.set(color, (colorsCount.get(color) || 0) - 1)
        };
    }

    private isGoodColorGuessOnWrongPlace(copyOfCorrectColors: Colors[], colorsCount: Map<Colors, number>,
                                         color: Colors): boolean {
        return copyOfCorrectColors.includes(color) && this.isColorCounterMoreThanZero(colorsCount, color);
    }

    private isColorCounterMoreThanZero(colorsCount: Map<Colors, number>, color: Colors): boolean {
        let numberOfColorsLeft = colorsCount.get(color);
        return numberOfColorsLeft === undefined ? false : numberOfColorsLeft > 0;
    }

    private areColorsInValidSize(colors: Colors[]) {
        if (colors.length != this.code.length) {
            throw new RangeError('You guessed ${colors.length} colors but answer include ${this.code.length} colors!');
        }
    }
}