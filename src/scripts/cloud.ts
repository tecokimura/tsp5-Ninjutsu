import p5 from "p5";

import {BgObj} from "./bgobj";
import {Def} from "./def";
import {Util} from "./util";

export class Cloud extends BgObj{

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
    add(type:number=Def.TYPE_BG_ALL) {
        let isAdd = false;
        if(this.isEnable() == false) {

            // ランダムでサイズを決める
            this.init();
            this.width = Util.getRandInt(Def.DISP_W/2)+20;
            this.height= (Util.getRandInt() % Util.mathAbs(this.width/4));

            this.posY = 0 - (Util.getRandInt()%10) - this.height;
            this.posX = Util.mathAbs((Util.getRandInt() % (Def.DISP_W*2)) - (Def.DISP_W/2));

            this.status = Def.ST_PLAY;

            if(type == Def.TYPE_BG_ALL) {
                type = Util.getRandInt()%Def.TYPE_BG_ALL;
            }

            switch (type) {
              case Def.TYPE_BG_NEAR:
                  this.type = Def.TYPE_BG_NEAR;

                  // 適当に透明度と調整
                  if(3 < Util.getRandInt()%10) {
                      this.alpha = 200; // (0-255)
                  } else {
                      this.alpha = 120; // (0-255)
                  }
                  this.spX = Util.mathAbs(this.width/50);

                  this.width -= Util.getRandInt()%24;
                  this.height += Util.getRandInt()%24;
                  break;
              case Def.TYPE_BG_MID:
                  this.type = Def.TYPE_BG_MID;
                  this.alpha = 80; // (0-255)
                  this.spX = Util.mathAbs(this.width/75);
                  break;
              default:
                  this.type = Def.TYPE_BG_FAR;
                  this.alpha = 40; // (0-255)
                  this.spX = Util.mathAbs(this.width/100);
                  break;
            }

            isAdd = this.isEnable();
        }

        return isAdd;
    }

    drawBack(p5:p5) {
        if( this.isEnable() && this.type != Def.TYPE_BG_NEAR) {

            // drawCircle
            p5.angleMode(p5.DEGREES);
            // p5.fill(255,255,255, this.alpha);
            p5.fill(220,220,220, this.alpha);
            p5.arc(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height, 0, 360);
        }
    }

    drawFront(p5:p5) {
        if( this.isEnable() && this.type == Def.TYPE_BG_NEAR) {

            // drawCircle
            p5.angleMode(p5.DEGREES);
            // p5.fill(255,255,255, this.alpha);
            p5.fill(240,240,240, this.alpha);
            p5.arc(this.posX+this.width/2, this.posY+this.height/2, this.width, this.height, 0, 360);
        }
    }

}
