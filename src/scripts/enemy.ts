import p5 from "p5"

import { Obj } from "./obj"
import { Def } from "./def"
import { Img } from "./img"
import { Util } from "./util"
import { Camera } from "./camera"

// TODO: 背景として動くcloud, starもあるので一個superclassがあったほうがいいかも
export class Enemy extends Obj {
  status: number = 0
  type: number = 0
  time: number = 0
  imgNo: number = 0

  animations = new Array()

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
    this.imgNo = 0
    this.animations = new Array()
  }

  remove() {
    Util.debug("remove enemy")
    this.init()
  }

  //
  /**
   * 配列の空きを確認して敵を配置する
   * 戻り値（boolean）で配置できたかを返す
   */
  add(type: number, x: number, y: number) {
    let isAdd = false

    // Debugように色んな種類を出す
    if (type == -1) {
      type = Util.getRandInt() % Def.TYPE_ENEMY_ALL
    }

    if (this.isEnable() == false) {
      this.init()

      // 少し上に位置させてパッと出ないようにする
      this.posY = y + 100
      this.posX = x + (Util.getRandInt() % Def.DISP_W)

      // type 毎にも変わるかもしれないがとりあえずデフォルト値
      this.hitOfsX = 14
      this.hitOfsY = 7
      this.hitOfsW = 20
      this.hitOfsH = 10

      switch (type) {
        case Def.TYPE_ENEMY_UFO:
          this.initTypeUfo()
          break
        case Def.TYPE_ENEMY_SHINOBI:
          this.initTypeShinobi()
          break
        case Def.TYPE_ENEMY_DRONE:
          this.initTypeDrone()
          break
        case Def.TYPE_ENEMY_SHURI:
          this.initTypeShuri()
          break
        default:
          this.initTypeBird()
          break
      }

      this.status = Def.ST_PLAY
      isAdd = this.isEnable()
    }

    return isAdd
  }

  // 敵としてゲームに存在しているか？
  isEnable(): boolean {
    return this.type != Def.DATA_NONE && this.posY != Def.DATA_NONE
  }

  // 移動処理
  move() {
    if (this.isEnable()) {
      this.posX += this.spX
      if (
        (this.posX <= Camera.getInLeft() - 48 && this.spX < 0) ||
        (Camera.getInRight() <= this.posX && 0 < this.spX)
      ) {
        this.spX *= -1
      }

      this.posY += this.spY

      // UFO っぽい動きをさせる
      if (this.type == Def.TYPE_ENEMY_UFO && this.time % 15 == 0) {
        let n = Util.getRandInt()
        if (n % 15 < 5) this.spX *= -1
        if (n % 15 < 2) this.spY *= -1
      }

      if (this.posY < Camera.getInBottom()) {
        this.remove()
      }
    }
  }

  // 表示位置の調整と画面外にでた場合の削除処理
  // 本当は位置調整しないで描画したいがとりあえず
  adjustDispPos(pMoveY: number) {
    // if( this.isEnable() ) {
    //     this.posY += pMoveY;
    //     if(Def.DISP_H+20 < this.posY) {
    //         this.remove();
    //     }
    // }
  }

  // 表示する画像を更新する
  updateImgNo() {
    if (this.isEnable()) {
      if (0 < this.animations.length) {
        let i = this.time % this.animations.length
        this.imgNo = this.animations[i]
      }
    }
  }

  // Utilにimgを移すかはのちのち検討する
  draw(img: Img) {
    if (this.isEnable()) {
      let r = 0
      // 回転させる場合
      // r = (this.time*30) $ 360;

      if (this.spX < 0) {
        img.drawImage(
          this.imgNo,
          Camera.getInLeft() + this.posX,
          Camera.getInTop() - this.posY,
          false,
          r
        )
      } else {
        img.drawImage(
          this.imgNo,
          Camera.getInLeft() + this.posX,
          Camera.getInTop() - this.posY,
          true,
          r * -1
        )
      }

      if (Util.isDebugRectObj) {
        let imgBuf = img.getImage(this.imgNo)
        img.p.stroke(0, 255, 0, 100)
        img.p.noFill()
        img.p.rect(
          Camera.getInLeft() + this.posX,
          Camera.getInTop() - this.posY,
          imgBuf.width,
          imgBuf.height
        )
        img.p.noStroke()
      }

      if (Util.isDebugRectHit) {
        img.p.stroke(255, 0, 0, 255)
        img.p.noFill()
        img.p.rect(
          this.getHitLeftC(Camera.getInLeft()),
          this.getHitTopC(Camera.getInTop()),
          this.getHitRight() - this.getHitLeft(),
          this.getHitBottom() - this.getHitTop()
        )
        img.p.noStroke()
      }
    }
  }

  initTypeUfo() {
    this.type = Def.TYPE_ENEMY_UFO
    this.imgNo = Img.ENEMY_UFO
    this.spX = (Util.getRandInt() % 10) + 1
    this.spY = (Util.getRandInt() % 8) - 4
    this.animations = [
      Img.ENEMY_UFO,
      Img.ENEMY_UFO,
      Img.ENEMY_UFO,
      Img.ENEMY_UFO1,
      Img.ENEMY_UFO1,
      Img.ENEMY_UFO1,
      Img.ENEMY_UFO,
      Img.ENEMY_UFO,
      Img.ENEMY_UFO,
      Img.ENEMY_UFO1,
      Img.ENEMY_UFO1,
      Img.ENEMY_UFO1,
      Img.ENEMY_UFO,
      Img.ENEMY_UFO1,
      Img.ENEMY_UFO,
      Img.ENEMY_UFO1,
    ]

    if (Util.getRandInt() % 2 == 0) this.spX *= -1
  }

  initTypeShinobi() {
    this.type = Def.TYPE_ENEMY_SHINOBI
    this.imgNo = Img.ENEMY_SHINOBI
    this.spX = (Util.getRandInt() % 8) + 1
    this.spY = (Util.getRandInt() % 3) + 3
    this.animations = [
      Img.ENEMY_SHINOBI,
      Img.ENEMY_SHINOBI,
      Img.ENEMY_SHINOBI,
      Img.ENEMY_SHINOBI,
      Img.ENEMY_SHINOBI,
      Img.ENEMY_SHINOBI,
      Img.ENEMY_SHINOBI1,
      Img.ENEMY_SHINOBI1,
      Img.ENEMY_SHINOBI1,
      Img.ENEMY_SHINOBI1,
      Img.ENEMY_SHINOBI1,
      Img.ENEMY_SHINOBI1,
      Img.ENEMY_SHINOBI1,
      Img.ENEMY_SHINOBI1,
      Img.ENEMY_SHINOBI1,
    ]

    if (Util.getRandInt() % 2 == 0) this.spX *= -1
  }

  initTypeShuri() {
    this.type = Def.TYPE_ENEMY_SHURI
    this.imgNo = Img.ENEMY_SHURIKEN
    this.spX = (Util.getRandInt() % 4) + 1
    this.animations = [Img.ENEMY_SHURIKEN, Img.ENEMY_SHURIKEN1]

    if (Util.getRandInt() % 2 == 0) this.spX *= -1
  }

  initTypeDrone() {
    this.type = Def.TYPE_ENEMY_DRONE
    this.imgNo = Img.ENEMY_DRONE
    this.spX = ((Util.getRandInt() % 3) + 1) * 2
    this.spY = (Util.getRandInt() % 2) + 1
    this.animations = [Img.ENEMY_DRONE, Img.ENEMY_DRONE1]

    if (Util.getRandInt() % 2 == 0) this.spX *= -1
  }

  initTypeBird() {
    this.type = Def.TYPE_ENEMY_BIRD
    this.imgNo = Img.ENEMY_BIRD
    this.spX = (Util.getRandInt() % 2) + 1
    this.animations = [
      Img.ENEMY_BIRD,
      Img.ENEMY_BIRD,
      Img.ENEMY_BIRD,
      Img.ENEMY_BIRD1,
      Img.ENEMY_BIRD1,
      Img.ENEMY_BIRD1,
      Img.ENEMY_BIRD1,
      Img.ENEMY_BIRD1,
      Img.ENEMY_BIRD1,
    ]

    if (Util.getRandInt() % 2 == 0) {
      this.spX *= -1
    }

    // これが入ると一気に難しくなる・・・
    // this.spY = 2;
  }
}
