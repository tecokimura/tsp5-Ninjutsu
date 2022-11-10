import { Position } from "./Position"
import { Speed } from "./Speed"
import { Size } from "./Size"
import { Time } from "./Time"
import { Status } from "../Union/Status"
import { BackgroundType } from "../Union/BackgroundType"

// status, type, alpha time のクラス化検討する
export abstract class Background {
    protected alpha: number = 255

    protected position: Position = new Position()
    protected speed: Speed = new Speed()
    protected size: Size = new Size()
    protected status: Status = new Status()
    protected type: BackgroundType = new BackgroundType()
    protected time: Time = new Time()

    constructor() {
        this.init()
    }

    init() {
        this.position = new Position()
        this.speed = new Speed()
        this.size = new Size()
        this.status = new Status()
        this.type = new BackgroundType()
        this.time = new Time()
    }

    // 初期化で削除している。
    remove() {
        this.init()
    }

    // const
    // 画面の縦サイズ
    static get DISP_H(): number {
        return 240
    }

    // abstract
    abstract drawBack(p5: object, cX: number, cY: number): void
    abstract drawFront(p5: object, cX: number, cY: number): void
    abstract afterAdd(): void

    // TODO:
    isEnable(): boolean {
        return this.status.isPlay() && this.position.isEnable()
    }

    // TODO:
    add(): boolean {
        return false
    }

    // TODO:
    move(): boolean {
        return false
    }

    // TODO: 必要？
    afterMove() {}

    // display は外側から渡す。
    adjustDispPos(pMoveY: number, display: Size) {
        if (this.isEnable()) {
            this.position.move(new Speed(0, pMoveY))
            if (display.getHeight() < this.position.getY()) {
                this.remove()
            }
        }
    }
}
