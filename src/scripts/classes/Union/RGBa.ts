const RGBaValue = {
    MIN: 0,
    MIDDLE: 127,
    MAX: 255,
} as const
type RGBaValue = typeof RGBaValue[keyof typeof RGBaValue]

// Red Green Blue Alpha
// using Basic colors
export class RGBa {
    private red: number = 0
    private blue: number = 0
    private green: number = 0
    private alpha: number = RGBaValue.MAX

    static colorRed(): RGBa {
        return new RGBa(RGBaValue.MAX, RGBaValue.MIN, RGBaValue.MIN)
    }

    static colorBlack(): RGBa {
        return new RGBa(RGBaValue.MAX, RGBaValue.MAX, RGBaValue.MAX)
    }

    static colorClear(): RGBa {
        return RGBa.colorBlack()
    }

    constructor(r = 0, g = 0, b = 0, a = RGBaValue.MAX) {}

    getR() {
        return this.red
    }

    resetR(r: number) {
        if (RGBaValue.MIN <= r && r <= RGBaValue.MAX) {
            this.red = r
        }
    }

    getG() {
        return this.green
    }

    resetG(g: number) {
        if (RGBaValue.MIN <= g && g <= RGBaValue.MAX) {
            this.green = g
        }
    }

    getB() {
        return this.blue
    }

    resetB(b: number) {
        if (RGBaValue.MIN <= b && b <= RGBaValue.MAX) {
            this.blue = b
        }
    }
}
