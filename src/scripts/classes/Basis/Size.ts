export class Size {
    private width: number = 0
    private height: number = 0

    constructor(w: number = 0, h: number = 0) {
        this.reset(w, h)
    }

    reset(w: number = 0, h: number = 0) {
        this.resetWidth(w)
        this.resetHeight(h)
    }

    getWidth(): number {
        return this.width
    }
    getHeight(): number {
        return this.height
    }

    resetWidth(w: number) {
        if (0 <= w) this.width = w
    }

    resetHeight(h: number) {
        if (0 <= h) this.height = h
    }
}
