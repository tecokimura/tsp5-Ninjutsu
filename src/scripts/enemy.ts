import p5 from "p5";

import {Obj} from "./obj";
import {Def} from "./def";
import {Img} from "./img";
import {Util} from "./util";

// TODO: 背景として動くcloud, starもあるので一個superclassがあったほうがいいかも
export class Enemy extends Obj{

    // status:number = 0;
    enable:boolean = false;
    type:number = 0;
    // time:number = 0;
    // posX:number = 0;
    // posY:number = 0;
    // spX:number  = 0;
    imgNo:number= 0;
   

    constructor() {
        super();
        this.init();
    }

    preload() {
    }
    

    // データをリセットしたい時などの初期化
    init() {
        this.time = 0;
        this.type = Def.DATA_NONE;
        this.posX = 0;
        this.posY = Def.DATA_NONE;
        this.spX  = 0;
        this.spY  = 0;
        this.imgNo= 0;
    }

    remove() { this.init(); }

    // 
    /**
     * 配列の空きを確認して敵を配置する
     * 戻り値（boolean）で配置できたかを返す
     */
    add(type:number) {
        if(this.isEnable() == false) {
            this.init();

            switch (type) {
              case Def.TYPE_UFO:
                this.type = Def.TYPE_UFO;
                this.imgNo= Img.ENEMY_UFO;
                this.spX   = (Util.getRandInt() % 10 )+1;
                break;
              case Def.TYPE_SHINOBI:
                this.type = Def.TYPE_SHINOBI;
                this.imgNo= Img.ENEMY_SHINOBI;
                this.spX   = (Util.getRandInt() % 8 )+1;
                break;
              case Def.TYPE_SHURI:
                this.type = Def.TYPE_SHURI;
                this.imgNo= Img.ENEMY_SHURIKEN;
                this.spX   = (Util.getRandInt() % 6 )+1;
                break;
              case Def.TYPE_KUNAI:
                this.type = Def.TYPE_KUNAI;
                this.imgNo= Img.ENEMY_KUNAI;
                this.spX   = (Util.getRandInt() % 4 )+1;
                break;
              default:
                this.type = Def.TYPE_BIRD;;
                this.imgNo= Img.ENEMY_BIRD;
                this.spX   = (Util.getRandInt() % 2 )+1;
                break;
            }


            // 画面に映らないちょっと上に出す
            this.posY = -40-(Util.getRandInt()%10);
            this.posX = Util.getRandInt() % Def.DISP_W;

            if( Util.getRandInt()%2 == 0 )
                this.spX *= -1;

        }

        return this.isEnable();
    }

    // 敵としてゲームに存在しているか？
    isEnable():boolean {
        this.enable =
            (this.type != Def.DATA_NONE
          && this.posY != Def.DATA_NONE);
        return this.enable;
    }

    // 移動処理
    move() {
        if(this.isEnable()) {
            this.posX += this.spX;
            if( (this.posX <= (0-48) && this.spX < 0)
            ||  (240 <= this.posX && 0 < this.spX) {
                this.spX *= -1;
            }

            this.posY += this.spY;
        }
    }

    // 表示位置の調整と画面外にでた場合の削除処理
    // 本当は位置調整しないで描画したいがとりあえず
    adjustDispPos(pMoveY:number) {
        if( this.isEnable() ) {
            this.posY += pMoveY;
            if(Def.DISP_H+20 < this.posY) {
                this.remove();
            }
        }
    }


    // Utilにimgを移すかはのちのち検討する
    draw(img:p5.Image) {
        if( this.isEnable() ) {
            if( this.spX < 0)
                img.drawImage(this.imgNo, this.posX, this.posY);
            else
                img.drawImageFlipH(this.imgNo, this.posX, this.posY);

            if( Util.isDebugRect ) {
                let imgBuf = img.getImage(this.imgNo);
                img.p.stroke(0,255,0);
                img.p.noFill();
                img.p.rect(this.posX, this.posY, imgBuf.width, imgBuf.height);
                img.p.noStroke();
            }

            if( Util.isDebugHit ) {
                img.p.stroke(255,255,255);
                img.p.noFill();
                img.p.rect(
                    this.posX+this.hitOfsX,
                    this.posY+this.hitOfsY,
                    this.hitOfsW,
                    this.hitOfsH
                );
                img.p.noStroke();

            }
        }
    }
}
