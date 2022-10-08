import p5 from "p5";

import { BgObj } from "./bgobj";
import { Def } from "./def";
import { Util } from "./util";

export class Cloud extends BgObj {

    constructor() {
        super();
        this.init();
    }

    // 画面に追加して位置などの設定
    afterAdd(): void {
        this.width = Util.getRandInt(Def.DISP_W / 2) + 20;
        this.height = 2 + Util.mathAbs((Util.getRandInt() % this.width / 4));

        switch (this.type) {
            case Def.TYPE_BG_NEAR:
                // 適当に透明度と調整
                if (3 < Util.getRandInt() % 10) {
                    this.alpha = 200; // (0-255)
                } else {
                    this.alpha = 120; // (0-255)
                }
                this.spX = Util.mathAbs(this.width / 50);

                this.width -= Util.getRandInt() % 24;
                this.height += Util.getRandInt() % 24;
                break;
            case Def.TYPE_BG_FAR:
            default:
                this.alpha = 60; // (0-255)
                this.spX = Util.mathAbs(this.width / 85);
                break;
        }
    }


    drawBack(p5: p5, cX: number, cY: number) {
        if (this.isEnable() && this.type != Def.TYPE_BG_NEAR) {

            // drawCircle
            p5.angleMode(p5.DEGREES);
            // p5.fill(255,255,255, this.alpha);
            p5.fill(220, 220, 220, this.alpha);
            p5.arc(
                cX + this.posX + this.width / 2,
                cY - this.posY + this.height / 2,
                this.width, this.height, 0, 360);
        }
    }

    drawFront(p5: p5, cX: number, cY: number) {
        if (this.isEnable() && this.type == Def.TYPE_BG_NEAR) {

            // drawCircle
            p5.angleMode(p5.DEGREES);
            // p5.fill(255,255,255, this.alpha);
            p5.fill(240, 240, 240, this.alpha);
            p5.arc(
                cX + this.posX + this.width / 2,
                cY - this.posY + this.height / 2,
                this.width, this.height, 0, 360);
        }
    }
}
