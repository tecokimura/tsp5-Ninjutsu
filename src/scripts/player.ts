import p5 from "p5";

import {Obj} from "./obj";
import {Def} from "./def";
import {Img} from "./img";
import {Util} from "./util";

export class Player extends Obj{
    p:p5 = null;

    enable:boolean = false;
    status:number = 0;
    type:number = 0;
    imgNo:number= 0;
   
    // 上昇している高さ
    high:number = 0;

    constructor(p5: p5) {
        super();
        this.p = p5;
        this.init();
    }

    // データをリセットしたい時などの初期化
    init() {
        this.time = 0;
        this.type = Def.DATA_NONE;
        this.posX = Def.PLAY_INIT_POS_X;
        this.posY = Def.PLAY_INIT_POS_Y;
        this.spX  = 0;
        this.spY  = 0;
        this.imgNo= 0;

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
        Util.debug("aH="+aH);

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
    // Utilにimgを移すかはのちのち検討する
    draw(img:p5.Image, isPushKey, isPushNow, isReleaseNow) {

        // proc で決めたほうが良さそう
        let imgNo = 0;
        if( isPushKey ) {
            // アニメーション切替中か降下中か
            if( isPushNow ) {
                imgNo = Img.NINJA_DOWN;
            } else {
                imgNo = Img.NINJA_DOWN2;
            }
        } else {
            // アニメーション切替中か上昇中か
            if( isReleaseNow ) {
                imgNo = Img.NINJA_DOWN;
            } else {
                imgNo = Util.mathFloor((this.time % 20)/5) % Def.NINJA_FLY_ANIM.length;
                imgNo = Def.NINJA_FLY_ANIM[imgNo];
            }
        }

        img.drawImage(imgNo, this.posX, this.posY);


        if( Util.isDebugRect ) {
            let imgBuf = img.getImage(imgNo);
            img.p.stroke(0,127,255);
            img.p.noFill();
            img.p.rect(this.posX, this.posY, imgBuf.width, imgBuf.height);
            img.p.noStroke();
        }

        if( Util.isDebugHit ) {
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

    drawCrush(img:p5.Image) {
        img.drawImage(img.NINJA_CRASH, this.posX, this.posY);
    }

    setGameover() {
        // いて！みたいにちょっと上に飛ばす(びっくりした感じを出す)
        this.spVY *= 1.25;
    }


    moveInGameover(MAX_DISP_H:number) {
        if( this.posY < MAX_DISP_H) {
            this.spVY -= 2;
            this.posY -= Util.mathFloor(this.spVY/2);
        }
    }

}