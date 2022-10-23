// TODO: テストを作る
// Player.ts, Enemy.ts, BgObj.ts をみて必要そうなものを実装する
export class Position {
    private x: number = 0;
    private y: number = 0;

    constructor(x, y) {
        this.init(x, y);
    }

    init(x, y) {
        this.x = x;
        this.y = y;
    }

    // 意味がないから本を確認する
    setX(x: number) {
        this.x = x;
    }

    setY(y: number) {
        this.y = y;
    }

    move(x: number, y: number): Position {
        return new Position(x, y);
    }
}
