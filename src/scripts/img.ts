import p5 from "p5";

//@ts-ignore
import IMG_PNGS from "../images/*.png";

export class Img {
    p:p5 = null;
    images = null;

    constructor(p5: p5) {
        this.p = p5;
    }

    preload() {
        // ここの結果から読み込み方を調べる
        console.log(IMG_PNGS);

        // this.images = this.p.loadImage(IMG_PNGS[Img.NINJA_STAND]);
    }

    drawImage(index:number, x:number, y:number) {
        // this.p.image(this.images,x,y);
    }



    static NINJA_CRASH:string       = 'cd1-ninja-crash.png'
    static NINJA_DOWN_1:string      = 'nd1-ninja-down1.png'
    static NINJA_DOWN_2:string      = 'nd2-ninja-down2.png'
    static NINJA_FLY_L:string       = 'nf1-ninja-fly1.png'
    static NINJA_FLY_C:string       = 'nf2-ninja-fly2.png'
    static NINJA_FLY_R:string       = 'nf3-ninja-fly3.png'
    static NINJA_JUTSU_BASE:string  = 'nj1-ninja-jutsu-base.png'
    static NINJA_JUTSU_GU:string    = 'nj2-ninja-jutsu-gu.png'
    static NINJA_JUTSU_CHOKI:string = 'nj3-ninja-jtsutu-choki.png'
    static NINJA_JUTSU_PA:string    = 'nj4-ninja-jutsu-pa.png'
    static NINJA_STAND:string       = 'ns1-ninja-stand.png'


}
