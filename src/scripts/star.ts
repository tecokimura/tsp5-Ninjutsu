import p5 from "p5"

import { BgObj } from "./bgobj"
import { Def } from "./def"
import { Util } from "./util"

// いずれ弓矢とか雷のほうが面白いかも
export class Star extends BgObj {
    constructor() {
        super()
        this.init()
    }

    afterAdd() {
        // ランダムでサイズを決める
        this.width = Util.getRandInt(4) + 2
        this.height = this.width

        this.type = Def.TYPE_BG_NEAR
    }

    drawBack(p5: p5, cX: number, cY: number) {
        if (this.isEnable() && this.type != Def.TYPE_BG_NEAR) {
            p5.angleMode(p5.DEGREES)
            p5.fill(250, 250, 0, this.alpha)
            p5.arc(
                cX + this.posX + this.width / 2,
                cY - this.posY - this.height / 2,
                this.width,
                this.height,
                0,
                360
            )
        }
    }

    drawFront(p5: p5, cX: number, cY: number) {
        if (this.isEnable() && this.type == Def.TYPE_BG_NEAR) {
            p5.angleMode(p5.DEGREES)
            p5.fill(250, 250, 0, this.alpha)
            p5.arc(
                cX + this.posX + this.width / 2,
                cY - this.posY - this.height / 2,
                this.width,
                this.height,
                0,
                360
            )
        }
    }
}
