import { Size } from "./Basis/Size"
import { Position } from "./Basis/Position"

// 画面サイズとかを管理
export class Display {
    private offset: Position
    private size: Size

    constructor(w: number, h: number) {
        this.offset = new Position()
        this.size = new Size()
    }

    getX(): number {
        return this.offset.getX()
    }

    getY(): number {
        return this.offset.getY()
    }

    getWidth(): number {
        return this.offset.getWidth()
    }

    getHeight(): number {
        return this.size.getHeight()
    }
}
