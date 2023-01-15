import p5 from "p5"

// VSCode で開いたら赤アンダーバーばっかりなので要修正
export class Util {
    static p5 = null
    static isDebug: boolean = false
    static isDebugLog: boolean = false
    static isDebugNotHit: boolean = false
    static isDebugDispRectObj: boolean = false
    static isDebugDispRectHit: boolean = false
    static isDebugDispInfo: boolean = false
    static isDebugEnemyType: boolean = false

    constructor() {}

    static setP5(orgP5: p5) {
        this.p5 = orgP5
    }
    static isP5(): boolean {
        return Util.p5 != null
    }

    static textBold(str: string, x: number, y: number) {
        if (this.isP5()) {
            this.p5.text(str, x + 1, y)
            this.p5.text(str, x - 1, y)
            this.p5.text(str, x, y + 1)
            this.p5.text(str, x, y - 1)
        }
    }

    static getRandInt(size: number = 10000): number {
        let ret = 0
        if (Util.isP5()) {
            ret = Util.p5.abs(Util.p5.round(Util.p5.random(size)))
        }
        return ret
    }

    // 小数点を切り捨てる
    static mathFloor(num: number): number {
        return Util.p5.floor(num)
    }

    static mathAbs(num: number): number {
        return Util.p5.abs(num)
    }

    static debug(str: string) {
        if (Util.isDebugLog) {
            console.log(str)
        }
    }
}
