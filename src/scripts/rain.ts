import p5 from "p5";

import {BgObj} from "./bgobj";
import {Def} from "./def";
import {Util} from "./util";

export class Rain extends BgObj{

    constructor() {
        super();
        this.init();
    }

    afterAdd() :void {
        // ランダムでサイズを決める
        this.width = 1;
        this.height= Util.getRandInt(40)+10;

        this.alpha = Util.getRandInt(100)+30;
        this.spY -= (Util.getRandInt()%20)+10;
    }

    drawBack(p5:p5, cX:number, cY:number) {
        if( this.isEnable() && this.type != Def.TYPE_NEAR) {
            p5.fill(0,98,160, this.alpha);
            p5.rect(
                cX + this.posX+this.width/2,
                cY - this.posY+this.height/2,
                this.width, this.height );
        }
    }

    drawFront(p5:p5, cX:number, cY:number) {
        if( this.isEnable() && this.type == Def.TYPE_NEAR) {
            p5.fill(51,153,204, this.alpha);
            p5.rect(
                cX + this.posX+this.width/2,
                cY - this.posY+this.height/2,
                this.width, this.height );
        }
    }

}
