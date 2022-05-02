import p5 from "p5";

import {Obj} from "./obj";
import {Def} from "./def";
import {Img} from "./img";
import {Util} from "./util";
import {Camera} from "./camera";

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
            this.spY --;
        } else {

            this.spY++;

            // 最大速度でなければ速度をあげる
            if(Def.PLAY_MAX_SP_Y < this.spY) {
                this.spY = Def.PLAY_MAX_SP_Y
            }
        }

        // 速度分移動させる
        this.posY -= Util.mathFloor(this.spY/2);

    }

    // 上に上昇しすぎないように描画位置の調整
    // 合わせて、他のオブジェクトを調整する値を返す
    adjustHigh(MAX_POS_Y:number) :number {
       return MAX_POS_Y;
        /*
         * この謎実装がいらなくなるはず
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
        */
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

            img.drawImage(
                this.imgNo,
                this.posX - Camera.getInLeft() ,
                this.posY - Camera.getInTop());

            if( Util.isDebugRectObj ) {
                let imgBuf = img.getImage(this.imgNo);
                img.p.stroke(0, 127, 255);
                img.p.noFill();
                img.p.rect(
                    this.posX - Camera.getInLeft(),
                    this.posY - Camera.getInTop(),
                    imgBuf.width, imgBuf.height);
                img.p.noStroke();
            }

            if( Util.isDebugRectHit ) {
                img.p.stroke(170,225,250);
                img.p.noFill();
                img.p.rect(
                    this.getHitLeft() - Camera.getInLeft(),
                    this.getHitTop() - Camera.getInTop(),
                    this.getHitRight() - this.getHitLeft(),
                    this.getHitBottom()- this.getHitTop()
                );
                img.p.noStroke();
            }
        }
    }

    // 敵に当たった後の表示
    drawCrush(img:Img) {
        img.drawImage(Img.NINJA_CRASH,
            this.posX - Camera.getInLeft(),
            this.posY - Camera.getInRight());
    }

    // いて！みたいにちょっと上に飛ばす(びっくりした感じを出す)
    setGameover() {
        this.spY *= 1.25;
    }

    // ゲームオーバー中の移動
    moveInGameover(MAX_DISP_H:number) {
        if( this.posY < MAX_DISP_H) {
            // 上に飛びすぎてたので重力を重くする
            this.spY  -= 2*2;
            this.posY -= Util.mathFloor(this.spY/2);
        }
    }

    // 速度を考慮したいのでOverideする
    getHitLeft() :number { return this.posX + this.hitOfsX - (this.spX/2); }
    getHitRight():number { return this.posX + this.hitOfsX + this.hitOfsW + (this.spX/2); }
    getHitTop()   :number { return this.posY + this.hitOfsY - (this.spY/2); }
    getHitBottom() :number { return this.posY + this.hitOfsY + this.hitOfsH + (this.spY/2); }

    // 真ん中の取得 当たり判定の真ん中がだいたい真ん中だろう
    getCenterX() :number { return this.posX + this.hitOfsX + (this.hitOfsW/2)}
    getCenterY() :number { return this.posY + this.hitOfsY + (this.hitOfsH/2)}

}
