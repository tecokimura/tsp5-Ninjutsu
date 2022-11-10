// TODO: テストを作る
import { Position } from "./Position"

export class Collision {
    private x: number = 0
    private y: number = 0
    private width: number = 0
    private height: number = 0

    constructor(x: number, y: number, w: number, h: number) {
        this.reset(x, y, w, h)
    }

    reset(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.resetWidth(w)
        this.resetHeight(h)
    }

    getX(): number {
        return this.x
    }
    getY(): number {
        return this.y
    }
    getWidth(): number {
        return this.width
    }
    getHeight(): number {
        return this.height
    }

    getHitLeft(): number {
        return this.x
    }
    getHitTop(): number {
        return this.y
    }
    getHitRight(): number {
        return this.x + this.width
    }
    getHitBottom(): number {
        return this.y + this.height
    }

    resetPosition(pos: Position) {
        this.x = pos.getX()
        this.y = pos.getY()
    }

    resetX(x: number) {
        this.x = x
    }

    resetY(y: number) {
        this.y = y
    }

    resetWidth(w: number) {
        if (0 <= w) this.width = w
    }

    resetHeight(h: number) {
        if (0 <= h) this.height = h
    }

    // MEMO: 各クラスで位置などを考慮したCollisionクラスを作って判定することになりそう。
    isOverlap(target: Collision): boolean {
        if (target == null) return false

        if (
            this.getHitLeft() <= target.getHitRight() &&
            target.getHitLeft() <= this.getHitRight() &&
            this.getHitTop() <= target.getHitBottom() &&
            target.getHitTop() <= this.getHitBottom()
        ) {
            return true
        }

        return false
    }
}
