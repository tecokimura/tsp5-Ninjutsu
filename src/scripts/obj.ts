export class Obj {
    time: number = 0

    posX: number = 0
    posY: number = 0
    spX: number = 0
    spVX: number = 0
    spY: number = 0
    spVY: number = 0
    width: number = 0
    height: number = 0

    // PosX, PosY からのxywhの位置
    // Hit OfFSett XYWH
    hitOfsX: number = 0
    hitOfsY: number = 0
    hitOfsW: number = 0
    hitOfsH: number = 0

    constructor() {
        this.init()
    }

    init() {
        this.time = 0

        this.posX = 0
        this.posY = 0
        this.spX = 0
        this.spVX = 0
        this.spY = 0
        this.spVY = 0

        this.width = 0
        this.height = 0

        this.hitOfsX = 0
        this.hitOfsY = 0
        this.hitOfsW = 0
        this.hitOfsH = 0
    }

    countTime(add: number = 1): number {
        this.time += add
        return this.time
    }

    // 座標起点が左上
    getHitLeft(): number {
        return this.posX + this.hitOfsX
    }
    getHitRight(): number {
        return this.posX + this.hitOfsX + this.hitOfsW
    }
    getHitTop(): number {
        return this.posY + this.hitOfsY
    }
    getHitBottom(): number {
        return this.posY + this.hitOfsY + this.hitOfsH
    }

    // get Hit Xxx with Camera
    // カメラの基準値が左下（横軸は同じ）
    getHitLeftC(cameraX: number): number {
        return cameraX + this.posX + this.hitOfsX
    }
    getHitRightC(cameraX: number): number {
        return cameraX + this.posX + this.hitOfsX + this.hitOfsW
    }
    getHitTopC(cameraY: number): number {
        return cameraY - this.posY + this.hitOfsY
    }
    getHitBottomC(cameraY: number): number {
        return cameraY - this.posY + this.hitOfsY + this.hitOfsH
    }

    /**
     * 当たり判定をとる
     */
    hit(othr: Obj): boolean {
        return (
            this.getHitLeft() < othr.getHitRight() &&
            othr.getHitLeft() < this.getHitRight() &&
            this.getHitTop() < othr.getHitBottom() &&
            othr.getHitTop() < this.getHitBottom()
        )
    }

    /**
     * 当たり判定をとる
     * カメラ位置考慮版
     */
    hitC(othr: Obj, cameraX: number, cameraY: number): boolean {
        return (
            this.getHitLeftC(cameraX) < othr.getHitRightC(cameraX) &&
            othr.getHitLeftC(cameraX) < this.getHitRightC(cameraX) &&
            this.getHitTopC(cameraY) < othr.getHitBottomC(cameraY) &&
            othr.getHitTopC(cameraY) < this.getHitBottomC(cameraY)
        )
    }

    getStringHit(): string {
        return (
            "hx=" +
            (this.posX + this.hitOfsX) +
            ",hy=" +
            (this.posY + this.hitOfsY) +
            ",hw=" +
            (this.posX + this.hitOfsX + this.hitOfsW) +
            ",hh=" +
            (this.posY + this.hitOfsY + this.hitOfsH)
        )
    }

    getStringHit2(): string {
        return (
            "hx=" +
            this.getHitLeft() +
            ",hy=" +
            this.getHitTop() +
            ",hw=" +
            (this.getHitRight() - this.getHitLeft()) +
            ",hh=" +
            (this.getHitBottom() - this.getHitTop())
        )
    }
}
