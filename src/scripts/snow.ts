import p5 from "p5"

import { BgObj } from "./bgobj"
import { Def } from "./def"
import { Util } from "./util"

export class Snow extends BgObj {
  constructor() {
    super()
    this.init()
  }

  // データをリセットしたい時などの初期化
  init() {
    super.init()
    this.status = Def.DATA_NONE
    this.type = Def.DATA_NONE
    this.posY = Def.DATA_NONE
  }

  afterAdd(): void {
    this.spX = 0
    this.spY = ((Util.getRandInt() % 3) + 1) * -1

    // ランダムでサイズを決める
    this.width = Util.getRandInt(10) + 2
    this.height = this.width
    this.alpha = 160
  }

  drawBack(p5: p5, cX: number, cY: number) {
    // drawCircle
    if (this.isEnable() && this.type != Def.TYPE_BG_NEAR) {
      p5.angleMode(p5.DEGREES)
      p5.fill(255, 255, 255, 120)
      p5.arc(
        cX + this.posX + this.width / 2,
        cY - (this.posY + this.height / 2),
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
      p5.fill(255, 255, 255, 200)
      p5.arc(
        cX + (this.posX + this.width / 2),
        cY - (this.posY + this.height / 2),
        this.width,
        this.height,
        0,
        360
      )
    }
  }
}
