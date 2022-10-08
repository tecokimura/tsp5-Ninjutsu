import { Def } from "./def";
import { Util } from "./util";

// X は左を0として右に行くにつれて数値が増える
// Y は一番下を0として上に上がるにつれて増えるように調整している
// TODO: あとで図解する
export class Camera {
    static centerX = 0;
    static centerY = 0;

    // 徐々に移動させたい場合は+の値を入れる
    static spX = 0;
    static spY = 5;
    static width = 0;
    static height = 0;
    static isStop = false;

    /**
     * @constructor
     */
    constructor() {}

    // データをクリアする
    static init(cs: number, cy: number, w: number, h: number) {
        Camera.centerX = cs;
        Camera.centerY = cy;
        Camera.spX = Def.CAMERA_SP_X;
        Camera.spY = Def.CAMERA_SP_Y;
        Camera.width = w;
        Camera.height = h;
    }

    // 中心位置を揃えるX,Y
    static move(targetCX: number, targetCY: number) {
        // 横
        // sp<0は張り付き
        // sp=0は何もしない（動かない）
        // 0<spは速度分移動させる
        if (Camera.spX != 0) {
            if (Camera.spX < 0) {
                Camera.centerX = targetCX;
            } else {
                let move = targetCX - Camera.centerX;
                if (move < 0) {
                    if (move < Camera.spX * -1) {
                        move = Camera.spX * -1;
                    }
                } else {
                    if (Camera.spX < move) {
                        move = Camera.spX;
                    }
                }

                Camera.centerX += move;
            }
        }

        // 縦位置
        if (Camera.spY != 0) {
            if (Camera.spY < 0) {
                Camera.centerY = targetCY;
            } else {
                let move = targetCY - Camera.centerY;
                if (move < 0) {
                    if (move < Camera.spY * -1) {
                        move = Camera.spY * -1;
                    }
                    //カメラはゲームの仕様上、降りない
                    move = 0;
                } else {
                    if (Camera.spY < move) {
                        move = Camera.spY;
                    }
                }

                Camera.centerY += move;
            }
        }
    }

    static getWidth(): number {
        return Camera.width;
    }
    static getWidthHalf(): number {
        return Util.mathFloor(Camera.width / 2);
    }
    static getHeight(): number {
        return Camera.height;
    }
    static getHeightHalf(): number {
        return Util.mathFloor(Camera.height / 2);
    }

    // 映る範囲の一番下
    static getInLeft(): number {
        return Camera.centerX - Camera.getWidthHalf();
    }
    static getInTop(): number {
        return Camera.centerY + Camera.getHeightHalf();
    }
    static getInRight(): number {
        return Camera.getInLeft() + Camera.getWidth();
    }
    static getInBottom(): number {
        return Camera.getInTop() - Camera.getHeight();
    }

    static getHigh(): number {
        return Camera.getInBottom();
    }
}
