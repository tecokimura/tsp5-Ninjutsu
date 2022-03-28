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
            this.spY = Util.getRandInt()%3+1;

            // ランダムでサイズを決める
            this.width = Util.getRandInt(10)+2;
            this.height= this.width;
            this.alpha = 100;

            this.status = Def.ST_PLAY;

            isAdd = this.isEnable();
        }

        return isAdd;
    }

    drawBack(p5:p5) {
        // drawCircle
        p5.angleMode(p5.DEGREES);
        p5.fill(255,255,255, this.alpha);
        p5.arc(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height, 0, 360);
    }

    drawFront(p5:p5) {
    }

}
