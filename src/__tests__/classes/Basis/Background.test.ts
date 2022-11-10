import { Background } from "../../../scripts/classes/Basis/Background"

// 必要あるのか要検証
export class TestBackground extends Background {
    // テスト検証用実装
    drawBack(p5: object, cX: number, cY: number): void {
        return
    }
    drawFront(p5: object, cX: number, cY: number): void {
        return
    }
    afterAdd(): void {}
}

test("constructor", () => {
    const bg = new TestBackground()
})

test("reset", () => {
    const bg = new TestBackground()
})

test("move", () => {
    const bg = new TestBackground()
})
