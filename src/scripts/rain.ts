import p5 from "p5";

import {BgObj} from "./bgobj";
import {Def} from "./def";
import {Util} from "./util";

export class Rain extends BgObj{

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
    }

    // 
    /**
     * 配列の空きを確認して敵を配置する
     * 戻り値（boolean）で配置できたかを返す
     */
    add(type:number=Def.TYPE_ALL) {
        let isAdd = false;
        if(this.isEnable() == false) {

            if(type == Def.TYPE_ALL) {
                type = Util.getRandInt()%Def.TYPE_ALL;
            }

            this.init();
            this.posY = -40-(Util.getRandInt()%120);
            this.posX = Util.getRandInt()%Def.DISP_W;

            // ランダムでサイズを決める
            this.width = 2;
            this.height= Util.getRandInt(80)+10;

            this.status = Def.ST_PLAY;

            this.alpha = Util.getRandInt(100)+30;
            this.spY = Util.getRandInt()%20+10;

            isAdd = this.isEnable();

        }

        return isAdd;
    }

    drawBack(p5:p5) {
        if( this.isEnable() && this.type != Def.TYPE_NEAR) {
            p5.fill(0,98,160, this.alpha);
            p5.rect(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height );
        }
    }

    drawFront(p5:p5) {
        if( this.isEnable() && this.type == Def.TYPE_NEAR) {
            p5.fill(51,153,204, this.alpha);
            p5.rect(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height );
        }
    }

}
