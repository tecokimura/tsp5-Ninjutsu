import { Speed } from "./Speed";


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

    move(sp:Speed) {
        this.x += sp.getX();
        this.y += sp.getY();
    }
}
