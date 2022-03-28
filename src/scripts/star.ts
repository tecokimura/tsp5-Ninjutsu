import p5 from "p5";

import {BgObj} from "./bgobj";
import {Def} from "./def";
import {Util} from "./util";

export class Star extends BgObj{

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

            // ランダムでサイズを決める
            this.width = Util.getRandInt(4)+2;
            this.height= this.width;

            this.status = Def.ST_PLAY;

            isAdd = this.isEnable();

        }

        return isAdd;
    }

    drawBack(p5:p5) {
        // 黄色の違和感がすごい
        // snow
        p5.angleMode(p5.DEGREES);
        p5.fill(250,250,0, this.alpha);
        p5.arc(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height, 0, 360);
        
        // rain
        // p5.fill(0,0,255,100);
        // p5.rect(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height );
    }

    drawFront(p5:p5) {
    }

}
