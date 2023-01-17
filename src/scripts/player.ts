import p5 from "p5"

import { Obj } from "./obj"
import { Def } from "./def"
import { Img } from "./img"
import { Util } from "./util"
import { Camera } from "./camera"

export class Player extends Obj {
    imgNo: number = 0

    // 上昇している高さ
    high: number = 0

    constructor() {
        super()
        this.init()
    }

    // データをリセットしたい時などの初期化
    init() {
        super.init()
        this.posX = Def.PLAY_INIT_POS_X
        this.posY = Def.PLAY_INIT_POS_Y
        this.imgNo = Def.DATA_NONE

        this.high = 0

        this.hitOfsX = 6
        this.hitOfsY = 20
        this.hitOfsW = 20
        this.hitOfsH = 10
    }

    // 移動処理
    move(isKeyDown: boolean) {
        if (isKeyDown) {
            this.spY--
        } else {
            this.spY++

            // 最大速度でなければ速度をあげる
            if (Def.PLAY_MAX_SP_Y < this.spY) {
                this.spY = Def.PLAY_MAX_SP_Y
            }
        }

        // 速度分移動させる
        this.posY += Util.mathFloor(this.spY / 2)
    }

    // 上に上昇しすぎないように描画位置の調整
    // 合わせて、他のオブジェクトを調整する値を返す
    adjustHigh(MAX_POS_Y: number): number {
        return MAX_POS_Y
        /*
         * この謎実装がいらなくなるはず
         * TODO: このコメントが正しいのか確認
        let aH = MAX_POS_Y - this.posY;
        // Util.debug("aH="+aH);

        if( 0 < aH) {
            // カウンターストップ
            if(this.high+aH < 99999) {
                this.high += aH;
            } else {
                this.high = 99999;
            }
        }

        return aH;
        */
    }

    // 下を超えてないか調べる
    checkOverUnder(MIN_Y: number): boolean {
        return this.posY < MIN_Y
    }

    // 描画する画像番号を設定する
    updateImgNo(isPushKey: boolean, isPushNow: boolean, isReleaseNow: boolean) {
        // proc で決めたほうが良さそう
        if (isPushKey) {
            // アニメーション切替中か降下中か
            if (isPushNow) {
                this.imgNo = Img.NINJA_DOWN
            } else {
                this.imgNo = Img.NINJA_DOWN2
            }
        } else {
            // アニメーション切替中か上昇中か
            if (isReleaseNow) {
                this.imgNo = Img.NINJA_DOWN
            } else {
                // アニメーションでゆらゆらさせる
                this.imgNo =
                    Util.mathFloor((this.time % 20) / 4) %
                    Def.NINJA_FLY_ANIM.length
                this.imgNo = Def.NINJA_FLY_ANIM[this.imgNo]
            }
        }
    }

    // Utilにimgを移すかはのちのち検討する
    draw(img: Img) {
        if (this.imgNo != Def.DATA_NONE) {
            img.drawImage(
                this.imgNo,
                Camera.getInLeft() + this.posX,
                Camera.getInTop() - this.posY
            )

            if (Util.isDebugDispRectObj) {
                let imgBuf = img.getImage(this.imgNo)
                img.p.stroke(0, 127, 255)
                img.p.noFill()
                img.p.rect(
                    Camera.getInLeft() + this.posX,
                    Camera.getInTop() - this.posY,
                    imgBuf.width,
                    imgBuf.height
                )
                img.p.noStroke()
            }

            if (Util.isDebugDispRectHit) {
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

    // 敵に当たった後の表示
    drawCrush(img: Img) {
        img.drawImage(
            Img.NINJA_CRASH,
            Camera.getInLeft() + this.posX,
            Camera.getInTop() - this.posY
        )
    }

    // いて！みたいにちょっと上に飛ばす(びっくりした感じを出す)
    setGameover() {
        // TODO:仮当
        this.spY *= 2
        if (10 < this.spY) this.spY = 10
    }

    // ゲームオーバー中の移動
    moveInGameover(cBottom: number) {
        if (cBottom < this.posY) {
            // TODO:仮当
            // 上に飛びすぎてたので重力を重くする
            this.spY += -4
            this.posY += Util.mathFloor(this.spY / 2)
        }
    }

    // 速度を考慮したいのでOverideする
    getHitLeft(): number {
        return this.posX + this.hitOfsX - this.spX / 2
    }
    getHitRight(): number {
        return this.posX + this.hitOfsX + this.hitOfsW + this.spX / 2
    }
    getHitTop(): number {
        return this.posY + this.hitOfsY - this.spY / 2
    }
    getHitBottom(): number {
        return this.posY + this.hitOfsY + this.hitOfsH + this.spY / 2
    }

    // get Hit Xxx with Camera
    // カメラの基準値が左下（横軸は同じ）
    getHitLeftC(cameraX: number): number {
        return cameraX + this.posX + this.hitOfsX - this.spX / 2
    }
    getHitRightC(cameraX: number): number {
        return cameraX + this.posX + this.hitOfsX + this.hitOfsW + this.spX / 2
    }
    getHitTopC(cameraY: number): number {
        return cameraY - this.posY + this.hitOfsY - this.spY / 2
    }
    getHitBottomC(cameraY: number): number {
        return cameraY - this.posY + this.hitOfsY + this.hitOfsH + this.spY / 2
    }

    // 真ん中の取得 当たり判定の真ん中がだいたい真ん中だろう
    getCenterX(): number {
        return this.posX + this.hitOfsX + this.hitOfsW / 2
    }
    getCenterY(): number {
        return this.posY + this.hitOfsY + this.hitOfsH / 2
    }
}
