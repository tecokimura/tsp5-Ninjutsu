import p5 from "p5";

import { Obj } from "./obj";
import { Def } from "./def";
import { Util } from "./util";
import { Camera } from "./camera";

// 背景として動くcloud, star など
export abstract class BgObj extends Obj {

    status: number = 0;
    type: number = 0;
    time: number = 0;
    alpha: number = 255;
    width: number = 0;
    height: number = 0;

    constructor() {
        super();
        this.init();
    }

    // データをリセットしたい時などの初期化
    init() {
        super.init();
        this.status = Def.DATA_NONE;
        this.type = Def.DATA_NONE;
        this.posY = Def.DATA_NONE;
        this.alpha = 255;
    }

    remove() { this.init(); }

    // 
    /**
     * 配列の空きを確認して敵を配置する
     * 戻り値（boolean）で配置できたかを返す
     */
    abstract drawBack(p5: p5, cX: number, cY: number): void;
    abstract drawFront(p5: p5, cX: number, cY: number): void;

    add(type: number, cX: number, cY: number): boolean {
        let isAdd = false;
        if (this.isEnable() == false) {
            this.init();

            // 画面内の左右のランダム、画面上より少し上に配置
            if (type == Def.TYPE_BG_ALL) {
                this.type = Util.getRandInt() % Def.TYPE_BG_ALL;
            } else {
                this.type = type;
            }
            Util.debug("set type=" + this.type);

            this.posY = cY + 40 + (Util.getRandInt() % 120); // Yが大きいほど高い（上）
            this.posX = cX + Util.getRandInt() % Def.DISP_W;

            this.status = Def.ST_PLAY;

            // 継承先に任せる
            this.afterAdd();

            isAdd = this.isEnable();

        }

        return isAdd;
    }

    abstract afterAdd(): void;

    // 敵としてゲームに存在しているか？
    isEnable(): boolean {
        return (this.status != Def.DATA_NONE
            && this.posY != Def.DATA_NONE);
    }

    // 移動処理
    move(): boolean {
        if (this.isEnable()) {
            this.posX += this.spX;
            this.posY += this.spY;

            this.spX += this.spVX;
            this.spY += this.spVY;

            if (this.posY < Camera.getInBottom()) {
                this.remove();
                // Util.debug("Cloud.move.remove");
            }
        }

        if (this.isEnable()) {
            this.afterMove();
        }

        return this.isEnable();
    }

    // 移動後の処理
    // これいる？ UFOようだったかも
    afterMove() {
    }

    // 表示位置の調整と画面外にでた場合の削除処理
    // 本当は位置調整しないで描画したいがとりあえず
    adjustDispPos(pMoveY: number) {
        if (this.isEnable()) {
            this.posY += pMoveY;
            if (Def.DISP_H < this.posY) {
                this.remove();
                // Util.debug("Cloud.adjust.remove");
            }
        }
    }
}
