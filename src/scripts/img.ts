import p5 from "p5";

//@ts-ignore
import DIST_IMG_PNGS from "../images/*.png";

export class Img {
    p:p5 = null;
    images:p5.Image[] = new Array(Img.IMAGE_MAX);

    constructor(p5: p5) {
        this.p = p5;
    }

    preload() {
        console.log(DIST_IMG_PNGS);

        // 全ての画像を読み込む
        for(let i=0;i<Img.PNG_FNAMES.length; i++) {
            this.images[i] = (this.p.loadImage(DIST_IMG_PNGS[Img.PNG_FNAMES[i]]));
        }
    }

    drawImage(index:number, x:number, y:number) {
        this.p.image(this.images[0],x,y);
    }


    // ls -1 を貼れるように並べる
    static PNG_FNAMES:string[] = [
        'n00s1-ninja-stand',
        'n10j1-ninja-jutsu-base',
        'n10j2-ninja-jutsu-gu',
        'n10j3-ninja-jtsutu-choki',
        'n10j4-ninja-jutsu-pa',
        'n20f1-ninja-fly1',
        'n20f2-ninja-fly2',
        'n20f3-ninja-fly3',
        'n30c1-ninja-crash',
        'n40d1-ninja-down1',
        'n40d2-ninja-down2'
    ]

    // 読み込み用配列にしてインデックスを別途定義する
    // ls -1の結果に合わせてインデックスを定義
    static NINJA_STAND:number       = 0;
    static NINJA_JUTSU_BASE:number  = 1;
    static NINJA_JUTSU_GU:number    = 2;
    static NINJA_JUTSU_CHOKI:number = 3;
    static NINJA_JUTSU_PA:number    = 4;
    static NINJA_FLY_L:number       = 5;
    static NINJA_FLY_C:number       = 6;
    static NINJA_FLY_R:number       = 7;
    static NINJA_CRASH:number       = 8;
    static NINJA_DOWN_1:number      = 9;
    static NINJA_DOWN_2:number      = 10;
    static IMAGE_MAX:number         = 11;


}
