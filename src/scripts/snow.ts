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
    add(type:number=Def.TYPE_BG_ALL, cX:number, cY:number) {
        let isAdd = false;
        if(this.isEnable() == false) {
            this.init();
            this.type = type;
            this.posY = cY + 40+(Util.getRandInt()%120);
            this.posX = cX + Util.getRandInt()%Def.DISP_W;
            this.spX = 0;
            this.spY = (Util.getRandInt()%3+1) * -1;

            if(this.type == Def.TYPE_BG_ALL) {
                this.type = Util.getRandInt()%Def.TYPE_BG_ALL;
            }

            // ランダムでサイズを決める
            this.width = Util.getRandInt(10)+2;
            this.height= this.width;
            this.alpha = 160;

            this.status = Def.ST_PLAY;

            isAdd = this.isEnable();
            // Util.debug("snow type="+this.type);
        }

        return isAdd;
    }

    drawBack(p5:p5, cX:number, cY:number) {
        // drawCircle
        if( this.isEnable() && this.type != Def.TYPE_BG_NEAR) {
            p5.angleMode(p5.DEGREES);
            p5.fill(255,255,255, 120);
            p5.arc(
                cX + this.posX+this.width/2,
                cY - (this.posY+this.height/2),
                this.width, this.height, 0, 360);
        }
    }

    drawFront(p5:p5, cX:number, cY:number) {
        if( this.isEnable() && this.type == Def.TYPE_BG_NEAR) {
            p5.angleMode(p5.DEGREES);
            p5.fill(255,255,255, 200);
            p5.arc(
                cX + (this.posX+this.width/2),
                cY - (this.posY+this.height/2),
                this.width, this.height, 0, 360);
        }
    }

}
