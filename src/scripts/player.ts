import p5 from "p5";

import {Obj} from "./obj";
import {Def} from "./def";
import {Img} from "./img";
import {Util} from "./util";

export class Player extends Obj{

    imgNo:number= 0;
   
    // 上昇している高さ
    high:number = 0;

    constructor() {
        super();
        this.init();
    }

    // データをリセットしたい時などの初期化
    init() {
        super.init();
        this.posX = Def.PLAY_INIT_POS_X;
        this.posY = Def.PLAY_INIT_POS_Y;
        this.imgNo= Def.DATA_NONE;

        this.high = 0;

        this.hitOfsX = 2;
        this.hitOfsY = 15;
        this.hitOfsW = 28;
        this.hitOfsH = 10;
    }

    // 移動処理
    move(isKeyDown:boolean) {

        if( isKeyDown ) {
            this.spVY--;
        } else {
            // 最大速度でなければ速度をあげる
            if(this.spVY < Def.PLAY_MAX_VY) {
                this.spVY++;
            }
        }

        // 画面の上に見切れないように対応
        // 一番上まで行ってたらそれ以上は移動させない
        if( this.high < 100 ) {
            this.posY += -4;
            this.spVY  = 8;
        } else {
            // 速度分移動させる
            this.posY -= Util.mathFloor(this.spVY/2);
        }

    }

    // 上に上昇しすぎないように描画位置の調整
    // 合わせて、他のオブジェクトを調整する値を返す
    adjustHigh(MAX_POS_Y:number) :number {
        let aH = MAX_POS_Y - this.posY;
        // Util.debug("aH="+aH);

        if( 0 < aH) {
            // カウンターストップ
            if(this.high+aH < 99999) {
                this.high += aH;
            } else {
                this.high = 99999;
            }
        }

        return aH;
    }

    // 下を超えてないか調べる
    checkOverUnder(MAX_DISP_Y:number):boolean {
        return (MAX_DISP_Y <= this.posY);
    }

    // 描画する画像番号を設定する
    updateImgNo(isPushKey:boolean, isPushNow:boolean, isReleaseNow:boolean) {
        // proc で決めたほうが良さそう
        if( isPushKey ) {
            // アニメーション切替中か降下中か
            if( isPushNow ) {
                this.imgNo = Img.NINJA_DOWN;
            } else {
                this.imgNo = Img.NINJA_DOWN2;
            }
        } else {
            // アニメーション切替中か上昇中か
            if( isReleaseNow ) {
                this.imgNo = Img.NINJA_DOWN;
            } else {
                // アニメーションでゆらゆらさせる
                this.imgNo = Util.mathFloor((this.time % 20)/5) % Def.NINJA_FLY_ANIM.length;
                this.imgNo = Def.NINJA_FLY_ANIM[this.imgNo];
            }
        }
    }


    // Utilにimgを移すかはのちのち検討する
    draw(img:Img) {
        if (this.imgNo != Def.DATA_NONE) {
            img.drawImage(this.imgNo, this.posX, this.posY);


            if( Util.isDebugRectObj ) {
                let imgBuf = img.getImage(this.imgNo);
                img.p.stroke(0,127,255);
                img.p.noFill();
                img.p.rect(this.posX, this.posY, imgBuf.width, imgBuf.height);
                img.p.noStroke();
            }

            if( Util.isDebugRectHit ) {
                img.p.stroke(170,225,250);
                img.p.noFill();
                img.p.rect(
                    this.posX+this.hitOfsX,
                    this.posY+this.hitOfsY,
                    this.hitOfsW,
                    this.hitOfsH
                );
                img.p.noStroke();
            }
        }
    }

    drawCrush(img:Img) {
        img.drawImage(Img.NINJA_CRASH, this.posX, this.posY);
    }

    setGameover() {
        // いて！みたいにちょっと上に飛ばす(びっくりした感じを出す)
        this.spVY *= 1.25;
    }


    moveInGameover(MAX_DISP_H:number) {
        if( this.posY < MAX_DISP_H) {
            // 上に飛びすぎてたので重力を重くする
            this.spVY -= 2*2;
            this.posY -= Util.mathFloor(this.spVY/2);
        }
    }

}
