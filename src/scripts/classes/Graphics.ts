import p5 from "p5"
import { Display } from "./Display"
import { RGBa } from "./Union/RGBa"

// 画像関連のクラス
// p5js を受け取って色々やる
export class Graphics {
    p5js: p5

    constructor(p: p5) {
        this.p5js = p
    }

    // drawXxx
    drawClear(display: Display): void {
        this.p5js.fill(0, 0, 0)
        this.p5js.rect(
            display.getX(),
            display.getY(),
            display.getWidth(),
            display.getHeight()
        )
    }

    // drawXxx
    // drawXxx
    // drawXxx
    // drawXxx
}
