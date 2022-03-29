import p5 from "p5";

import {BgObj} from "./bgobj";
import {Def} from "./def";
import {Util} from "./util";

export class Snow extends BgObj{

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
            this.init();
            this.posY = -40-(Util.getRandInt()%120);
            this.posX = Util.getRandInt()%Def.DISP_W;
            this.spX = 0;
            this.spY = Util.getRandInt()%5+2;

            if(type == Def.TYPE_ALL) {
                type = Util.getRandInt()%Def.TYPE_ALL;
            }

            // ランダムでサイズを決める
            this.width = Util.getRandInt(10)+2;
            this.height= this.width;
            this.alpha = 160;

            this.status = Def.ST_PLAY;

            isAdd = this.isEnable();
        }

        return isAdd;
    }

    drawBack(p5:p5) {
        // drawCircle
        if( this.isEnable() && this.type != Def.TYPE_NEAR) {
            p5.angleMode(p5.DEGREES);
            p5.fill(250,250,250, 220);
            p5.arc(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height, 0, 360);
        }
    }

    drawFront(p5:p5) {
        if( this.isEnable() && this.type == Def.TYPE_NEAR) {
            p5.angleMode(p5.DEGREES);
            p5.fill(255,255,255, 255);
            p5.arc(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height, 0, 360);
        }
    }

}
