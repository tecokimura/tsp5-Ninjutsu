export class Status {
    // Over = 終了状態
    // None = 初期の無の状態
    // Play = ゲームに存在する状態
    static get OVER(): number {
        return -1
    }
    static get NONE(): number {
        return 0
    }
    static get PLAY(): number {
        return 1
    }
}
