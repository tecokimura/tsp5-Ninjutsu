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

    getImage(index:number) :p5.Image {
        return (this.images[index]);
    }


    drawImage(index:number, x:number, y:number,
              isFlip=false, 
              r:number=0, transX=0, transY=0,
              a:number=100) {

        // 画像サイズを図る
        let imgObj= this.getImage(index);
        let imgW = imgObj.width/2;
        let imgH = imgObj.height/2;

        this.p.push();
  
        // まず中心位置に変更する
        this.p.translate(x+imgW, y+imgH);

        // 反転描画
        if( isFlip ) {
            this.p.scale(-1, 1);
        }

        // 回転描画
        if( r != 0) {
            // 回転の中心位置を調整する
            this.p.angleMode(this.p.DEGREES);
            this.p.translate(transX, transY);
            this.p.rotate(r);
            this.p.translate(transX*-1, transY*-1);
        }

        // Blend
        if( 0 < a && a < 100) {
            this.p.blendMode(this.p.SOFT_LIGHT);
        }

        // 塗りつぶし
        // this.p.tint(0, 153, 204, 127);
        
        // 画像の真ん中を中心にする
        this.p.image(imgObj, imgW*-1, imgH*-1);

        this.p.pop();

    }

    drawImageFlipH(index:number, x:number, y:number, a:number) {
        this.drawImage(index, x, y:
                  true, 
                  0, 0, 0,
                  100);

    }


    //===========================
    // File読み込み用
    // ls -1 src/images | sed -e 's/.png$//'
    // を貼れるように並べる
    static PNG_FNAMES:string[] = [
        'e1b1-bird1',
        'e1b2-bird2',
        'e2k1-kunai1',
        'e2k2-kunai2',
        'e3s1-shuri1',
        'e3s2-shuri2',
        'e4s1-shinobi1',
        'e4s2-shinobi2',
        'e5u1-ufo1',
        'e5u2-ufo2',
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
    static ENEMY_BIRD:number        = 0; 
    static ENEMY_BIRD1:number       = 1;  
    static ENEMY_KUNAI:number       = 2;  
    static ENEMY_KUNAI1:number      = 3;  
    static ENEMY_SHURIKEN:number    = 4;  
    static ENEMY_SHURIKEN1:number   = 5;  
    static ENEMY_SHINOBI:number     = 6;  
    static ENEMY_SHINOBI1:number    = 7;  
    static ENEMY_UFO:number         = 8;  
    static ENEMY_UFO1:number        = 9;  
    static NINJA_STAND:number       = 10; 
    static NINJA_JUTSU_BASE:number  = 11; 
    static NINJA_JUTSU_GU:number    = 12; 
    static NINJA_JUTSU_CHOKI:number = 13; 
    static NINJA_JUTSU_PA:number    = 14; 
    static NINJA_FLY_L:number       = 15; 
    static NINJA_FLY_C:number       = 16; 
    static NINJA_FLY_R:number       = 17; 
    static NINJA_CRASH:number       = 18; 
    static NINJA_DOWN:number        = 19; 
    static NINJA_DOWN2:number       = 20; 
    static IMAGE_MAX:number         = 21;
    //===========================

}
