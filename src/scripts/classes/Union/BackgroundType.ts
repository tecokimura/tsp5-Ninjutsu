// クラス定数をやりたかったのだが調べた感じこれがいいのかなと実装
const BackgroundTypeValue = {
    NEAR: 0, // 近い（手前）
    FAR: 1, // 遠い（奥）
    ALL: 2,
} as const
type BackgroundTypeValue =
    typeof BackgroundTypeValue[keyof typeof BackgroundTypeValue]

export class BackgroundType {
    protected value: BackgroundTypeValue

    static get NEAR(): BackgroundTypeValue {
        return BackgroundTypeValue.NEAR
    }
    static get FAR(): number {
        return BackgroundTypeValue.FAR
    }
    static get ALL(): number {
        return BackgroundTypeValue.ALL
    }

    constructor() {
        this.value = BackgroundTypeValue.NEAR
    }

    setNear(): void {
        this.value = BackgroundTypeValue.NEAR
    }

    isNear(): boolean {
        return this.value == BackgroundType.NEAR
    }

    setFar(): void {
        this.value = BackgroundTypeValue.FAR
    }

    isFar(): boolean {
        return this.value == BackgroundType.FAR
    }
}
