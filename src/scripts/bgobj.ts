import p5 from "p5";

import {Obj} from "./obj";
import {Def} from "./def";

// 背景として動くcloud, star
export abstract class BgObj extends Obj{

    status:number = 0;
    type:number = 0;
    time:number = 0;
    alpha:number = 255;
    width:number = 0;
    height:number = 0;

    constructor() {
        super();
        this.init();
    }

    // データをリセットしたい時などの初期化
    init() {
        super.init();
        this.status= Def.DATA_NONE;
        this.type  = Def.DATA_NONE;
        this.posY  = Def.DATA_NONE;
        this.alpha = 255;
    }

    remove() { this.init(); }

    // 
    /**
     * 配列の空きを確認して敵を配置する
     * 戻り値（boolean）で配置できたかを返す
     */
    abstract add(type:number):boolean;
    abstract drawBack(p5:p5) :void;
    abstract drawFront(p5:p5):void;

    // 敵としてゲームに存在しているか？
    isEnable():boolean {
        return ( this.status != Def.DATA_NONE
              && this.posY != Def.DATA_NONE);
    }

    // 移動処理
    move():boolean {
        if(this.isEnable()) {
            this.posX += this.spX;
            this.posY += this.spY;

            this.spX += this.spVX;
            this.spY += this.spVY;

            if( (this.posX <= (0-this.width) && this.spX < 0)
            ||  (Def.DISP_W+this.width <= this.posX && 0 < this.spX) ) {
                this.remove();
                // Util.debug("Cloud.move.remove");
            }
        }

        return this.isEnable();
    }

    // 表示位置の調整と画面外にでた場合の削除処理
    // 本当は位置調整しないで描画したいがとりあえず
    adjustDispPos(pMoveY:number) {
        if( this.isEnable() ) {
            this.posY += pMoveY;
            if(Def.DISP_H < this.posY) {
                this.remove();
                // Util.debug("Cloud.adjust.remove");
            }
        }
    }

}
