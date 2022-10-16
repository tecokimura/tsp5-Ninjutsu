// TODO: テストを作る
export class Collision {
    private x: number = 0;
    private y: number = 0;
    private width: number = 0;
    private height: number = 0;

    constructor(x, y, w, h) {
        this.init(x, y, w, h);
    }

    init(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = y;
        this.height = y;
    }

    // 意味がないから本を確認する
    setX(x: number) {
        this.x = x;
    }

    setY(y: number) {
        this.y = y;
    }

    setWidth(w: number) {
        if (0 <= w) this.width = w;
    }

    setHeight(h: number) {
        if (0 <= h) this.height = h;
    }

    // MEMO: 各クラスで位置などを考慮したCollisionクラスを作って判定することになりそう。
    overlap(target: Collision): boolean {
        if (target == null) return false;

        return false;
    }
}
