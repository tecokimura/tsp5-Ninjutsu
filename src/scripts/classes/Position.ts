// TODO: テストを作る
// Player.ts, Enemy.ts, BgObj.ts をみて必要そうなものを実装する
export class Position {
    private x: number = 0;
    private y: number = 0;

    constructor(x: number, y :number) {
        this.init(x, y);
    }

    init(x :number, y :number) {
        this.resetX(x);
        this.resetY(y);
    }

    getX() :number { return this.x; }
    getY() :number { return this.y; }

    resetX(x: number) {
        this.x = x;
    }

    resetY(y: number) {
        this.y = y;
    }

    move(x: number, y: number): Position {
        return new Position(x, y);
    }
}
