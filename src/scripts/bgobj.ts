import p5 from "p5";

import {Obj} from "./obj";
import {Def} from "./def";
import {Util} from "./util";

// 背景として動くcloud, star
export class BgObj extends Obj{

    status:number = 0;
    type:number = 0;
    time:number = 0;
    alpha:number = 0;
    width:number = 0;
    height:number = 0;

    constructor() {
        super();
        this.init();
    }

    // データをリセットしたい時などの初期化
    init() {
        this.status= Def.DATA_NONE;
        this.type  = Def.DATA_NONE;
        this.time  = 0;
        this.posX  = 0;
        this.posY  = Def.DATA_NONE;
        this.spX   = 0;
        this.spY   = 0;
    }

    remove() { this.init(); }

    // 
    /**
     * 配列の空きを確認して敵を配置する
     * 戻り値（boolean）で配置できたかを返す
     */
    add() {
        let isAdd = false;
        if(this.isEnable() == false) {
            // ランダムでサイズを決める
            this.init();
            this.alpha = 30; // (0-255)
            this.width = Util.getRandInt(Def.DISP_W/2)+20;
            this.height= (Util.getRandInt() % Util.mathAbs(this.width/4));

            this.posY = 0 - (Util.getRandInt()%10) - this.height;
            this.posX = Util.mathAbs((Util.getRandInt() % (Def.DISP_W*2)) - (Def.DISP_W/2));

            this.spX = Util.mathAbs(this.width/100);

            this.spVX = 0;
            this.spVY = 0;

            this.status = Def.ST_PLAY;

            isAdd = this.isEnable();
        }

        return isAdd;
    }

    // 敵としてゲームに存在しているか？
    isEnable():boolean {
        return ( this.status != Def.DATA_NONE
              && this.posY != Def.DATA_NONE);
    }

    // 移動処理
    move() {
        if(this.isEnable()) {
            this.posX += this.spX;
            this.posY += this.spY;

            this.spX += this.spVX;
            this.spY += this.spVY;

            if( (this.posX <= (0-this.width) && this.spX < 0)
            ||  (Def.DISP_W+this.width <= this.posX && 0 < this.spX) {
                this.remove();
                Util.debug("Cloud.move.remove");
            }
        }
    }

    // 表示位置の調整と画面外にでた場合の削除処理
    // 本当は位置調整しないで描画したいがとりあえず
    adjustDispPos(pMoveY:number) {
        if( this.isEnable() ) {
            this.posY += pMoveY;
            if(Def.DISP_H < this.posY) {
                this.remove();
                Util.debug("Cloud.adjust.remove");
            }
        }
    }


    draw(p5:p5) {
        if( this.isEnable() ) {
            // drawCircle
            p5.angleMode(p5.DEGREES);
            // p5.fill(255,255,255, this.alpha);
            p5.fill(230,230,230, this.alpha);
            p5.arc(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height, 0, 360);
        }
    }

    countTime() {
        if( this.isEnable() ) {
            this.time++;
        }
    }

}
