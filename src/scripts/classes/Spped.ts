// TODO: テストを作る
// 仮実装 先にPositionをやる
export class Speed {
    x: number = 0;
    y: number = 0;

    constructor(x, y) {
        this.init(x, y);
    }

    init(x, y) {
        this.x = x;
        this.y = y;
    }

    move(x: number, y: number): Speed {
        return new Speed(x, y);
    }
}
