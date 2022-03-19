
export class Obj {

    time :number = 0;

    posX :number = 0;
    posY :number = 0;
    spX  :number = 0;
    spVX :number = 0;
    spY  :number = 0;
    spVY :number = 0;
    width :number= 0;
    height:number= 0;

    // PosX, PosY からのxywhの位置
    // Hit OfFSett XYWH
    hitOfsX :number = 0;
    hitOfsY :number = 0;
    hitOfsW :number = 0;
    hitOfsH :number = 0;

    constructor() {
        // 変数定義で0初期化しているからここでする必要ない気がした
        // for Debug
        this.hitOfsX = 14;
        this.hitOfsY = 10;
        this.hitOfsW = 20;
        this.hitOfsH = 8;
    }

    countTime(add:number=1):number {
        this.time += add;
        return this.time;
    }

    /**
     * 当たり判定をとる
     */
    hit(othr:Obj) :boolean {
        return (
           this.posX + this.hitOfsX < othr.posX + othr.hitOfsX + othr.hitOfsW
        && othr.posX + othr.hitOfsX < this.posX + this.hitOfsX + this.hitOfsW
        && this.posY + this.hitOfsY < othr.posY + othr.hitOfsY + othr.hitOfsH 
        && othr.posY + othr.hitOfsY < this.posY + this.hitOfsY + this.hitOfsH)
    }


    getStringHit() :string {
        return "hx="+(this.posX + this.hitOfsX)
             +",hy="+(this.posY + this.hitOfsY)
             +",hw="+(this.posX + this.hitOfsX + this.hitOfsW)
             +",hh="+(this.posY + this.hitOfsY + this.hitOfsH);
    }
}
