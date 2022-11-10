export class Speed {
    x: number = 0
    y: number = 0

    constructor(x: number = 0, y: number = 0) {
        this.reset(x, y)
    }

    reset(x: number = 0, y: number = 0) {
        this.resetX(x)
        this.resetY(y)
    }

    resetX(x: number) {
        this.x = x
    }

    resetY(y: number) {
        this.y = y
    }

    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }

    add(sp: Speed) {
        this.resetX(this.getX() + sp.getX())
        this.resetY(this.getY() + sp.getY())
    }
}
