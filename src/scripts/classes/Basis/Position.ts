import { Speed } from "./Speed"

export class Position {
    private x: number = 0
    private y: number = 0

    constructor(x: number = 0, y: number = 0) {
        this.reset(x, y)
    }

    reset(x: number = 0, y: number = 0) {
        this.resetX(x)
        this.resetY(y)
    }

    isEnable(): boolean {
        return this.y == -99999
    }

    getX(): number {
        return this.x
    }
    getY(): number {
        return this.y
    }

    resetX(x: number) {
        this.x = x
    }

    resetY(y: number) {
        this.y = y
    }

    move(sp: Speed) {
        this.x += sp.getX()
        this.y += sp.getY()
    }
}
