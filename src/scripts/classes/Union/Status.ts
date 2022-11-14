const StatusValue = {
    OVER: -1,
    NONE: +0,
    PLAY: +1,
} as const
type StatusValue = typeof StatusValue[keyof typeof StatusValue]

export class Status {
    protected value: StatusValue

    // Over = 終了状態
    // None = 初期の無の状態
    // Play = ゲームに存在する状態
    static get OVER(): StatusValue {
        return StatusValue.OVER
    }
    static get NONE(): number {
        return StatusValue.NONE
    }
    static get PLAY(): number {
        return StatusValue.PLAY
    }

    constructor() {
        this.value = StatusValue.NONE
    }

    setOver(): void {
        this.value = StatusValue.OVER
    }

    isOver(): boolean {
        return this.value == StatusValue.OVER
    }

    setNone(): void {
        this.value = StatusValue.NONE
    }

    isNone(): boolean {
        return this.value == StatusValue.NONE
    }

    setPlay(): void {
        this.value = StatusValue.PLAY
    }

    isPlay(): boolean {
        return this.value == StatusValue.PLAY
    }
}
