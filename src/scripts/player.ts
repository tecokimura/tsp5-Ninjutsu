import p5 from "p5";

import {Obj} from "./obj";
import {Def} from "./def";
import {Img} from "./img";
import {Util} from "./util";

export class Player extends Obj{
    p:p5 = null;

    enable:boolean = false;
    status:number = 0;
    type:number = 0;
    imgNo:number= 0;
   
    // 上昇している高さ
    high:number = 0;

    constructor(p5: p5) {
        super();
        this.p = p5;
        this.init();
    }

    // データをリセットしたい時などの初期化
    init() {
        this.time = 0;
        this.type = Def.DATA_NONE;
        this.posX = 0;
        this.posY = Def.PLAY_INIT_POS_Y;
        this.spX  = 0;
        this.spY  = 0;
        this.imgNo= 0;
    }

    // 移動処理
    move(isKeyDown:boolean) {

        if( isKeyDown ) {
            this.spVY--;
        } else {
            // 最大速度でなければ速度をあげる
            if(this.spVY < Def.PLAY_MAX_VY) {
                this.spVY++;
            }
        }

        // 画面の上に見切れないように対応
        // 一番上まで行ってたらそれ以上は移動させない
        if( this.high < 100 ) {
            this.posY += -4;
            this.spVY  = 8;
        } else {
            // 速度分移動させる
            this.posY -= Util.mathFloor(this.spVY/2);
        }

        // 画面に映らなくなるので一番上の位置以上行かないように調整
        if( playY < Def.PLAY_MAX_DRAW_POS_Y) {
            playY=Def.PLAY_MAX_DRAW_POS_Y;
        }
    }

    draw() {
    }

    // Utilにimgを移すかはのちのち検討する
    draw(img:p5.Image) {
    }

    setGameover() {
        // いて！みたいにちょっと上に飛ばす(びっくりした感じを出す)
        this.spVY *= 1.25;
    }

    // 上に上昇しすぎないように描画位置の調整
    // 合わせて、他のオブジェクトを調整する値を返す
    adjustHigh(MAX_POS_Y:number) :number {
        let aH = MAX_POS_Y - this.posY;

        if( 0 < aH) {
            // カウンターストップ
            this.high += aH;
            if( 99999 < this.high + aH < 99999) {
                this.high = 99999;
            }
        }

        return aH;
    }

    // 下を超えてないか調べる
    checkOverUnder(MAX_DISP_Y:number):boolean {
        return (MAX_DISP_Y <= this.posY);
    }

}
