import p5 from "p5"

import { BgObj } from "./bgobj"
import { Def } from "./def"
import { Util } from "./util"

export class Cloud extends BgObj {
    constructor() {
        super()
        this.init()
    }

    // 画面に追加して位置などの設定
    afterAdd(): void {
        this.width = Util.getRandInt(Def.DISP_W/5*4) + 20
        // this.height = 2 + Util.mathAbs((Util.getRandInt() % (this.width/4)))
        this.height = 2 + Util.mathAbs((Util.getRandInt() % (this.width/4)))

        switch (this.type) {
            case Def.TYPE_BG_NEAR:
                // 適当に透明度と調整(alpha=0-255)
                if (3 < Util.getRandInt() % 10) {
                    this.alpha = 200
                } else {
                    this.alpha = 120
                }
                this.spX = Util.mathAbs(this.width / 50)

                break
            case Def.TYPE_BG_FAR:
            default: // (0-255)
                this.alpha = 60
                this.spX = Util.mathAbs(this.width / 85)
                break
        }

        if (Util.getRandInt() % 2 == 0) this.spX *= -1

    }

    drawBack(p5: p5, cX: number, cY: number) {
        if (this.isEnable() && this.type != Def.TYPE_BG_NEAR) {
            // drawCircle
            p5.angleMode(p5.DEGREES)
            p5.fill(220, 220, 220, this.alpha)
            p5.arc(
                cX + this.posX + this.width / 2,
                cY - this.posY + this.height / 2,
                this.width,
                this.height,
                0,
                360
            )
        }
    }

    drawFront(p5: p5, cX: number, cY: number) {
        if (this.isEnable() && this.type == Def.TYPE_BG_NEAR) {
            // drawCircle
            p5.angleMode(p5.DEGREES)
            p5.fill(240, 240, 240, this.alpha)
            p5.arc(
                cX + this.posX + this.width / 2,
                cY - this.posY + this.height / 2,
                this.width,
                this.height,
                0,
                360
            )
        }
    }
}
