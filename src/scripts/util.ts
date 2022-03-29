import p5 from "p5";

export class Util {
    static p5 = null;
    static isDebug :boolean = false;
    static isDebugLog :boolean = false;
    static isDebugHit :boolean = false;
    static isDebugRectObj :boolean = false;
    static isDebugRectHit :boolean = false;
    static isDebugInfo :boolean = false;
    static isDebugEnemyType :boolean = false;

    constructor() {
    }

    static setP5(orgP5:p5) { Util.p5 = orgP5; }
    static isP5():boolean { return (Util.p5 != null); }

    static getRandInt(size:number=10000) :number {
        let ret = 0;
        if( Util.isP5() ) {
            ret = Util.p5.abs(Util.p5.round(Util.p5.random(size)));
        }
        return ret;
    }

    // 小数点を切り捨てる
    static mathFloor(num:number) :number {
        return Util.p5.floor(num);
    }

    
    static mathAbs(num:number) :number {
        return Util.p5.abs(num);
    }

    static debug(str:string) {
        if( Util.isDebugLog ) {
            console.log(str);
        }
    }
}
