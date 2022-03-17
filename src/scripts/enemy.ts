import p5 from "p5";

import {Def} from "./def";
import {Img} from "./img";

// TODO: 背景として動くcloud, starもあるので一個superclassがあったほうがいいかも
export class Enemy {
    p:p5 = null;

    // status:number = 0;
    enable:boolean = false;
    type:number = 0;
    time:number = 0;
    posX:number = 0;
    posY:number = 0;
    spX:number  = 0;
    imgNo:number= 0;
    // sizeW
    // sizeH
   

    constructor(p5: p5) {
        this.p = p5;
    }

    preload() {
    }
    

    init() {
        this.time = 0;
        this.type = Def.DATA_NONE;
        this.posX = 0;
        this.posY = Def.DATA_NONE;
        this.spX  = 0;
        this.imgNo= 0;
    }

    // もうちょっといい方法ありそうｗ
    add(type:number) {
        if(this.isEnable() == false) {
            this.init();

            switch (type) {
              case Def.TYPE_UFO:
                this.type = Def.TYPE_UFO;
                this.imgNo= Img.ENEMY_UFO;
                this.spX   = (this.getRandInt() % 10 )+1;
                break;
              case Def.TYPE_SHINOBI:
                this.type = Def.TYPE_SHINOBI;
                this.imgNo= Img.ENEMY_SHINOBI;
                this.spX   = (this.getRandInt() % 8 )+1;
                break;
              case Def.TYPE_SHURI:
                this.type = Def.TYPE_SHURI;
                this.imgNo= Img.ENEMY_SHURIKEN;
                this.spX   = (this.getRandInt() % 6 )+1;
                break;
              case Def.TYPE_KUNAI:
                this.type = Def.TYPE_KUNAI;
                this.imgNo= Img.ENEMY_KUNAI;
                this.spX   = (this.getRandInt() % 4 )+1;
                break;
              default:
                this.type = Def.TYPE_BIRD;;
                this.imgNo= Img.ENEMY_BIRD;
                this.spX   = (this.getRandInt() % 2 )+1;
                break;
            }


            // ;
            this.posY = -40-((this.getRandInt()>>>1)%10);
            this.posX = this.getRandInt() % Def.DISP_W;
            this.time  = 0;

            if( this.getRandInt()%2 == 0 )
                this.spX *= -1;

        }

        return this.isEnable();
    }

    // TODO:Utilにする
    getRandInt():number { return this.p.round(this.p.random(1000)); }


    // 敵としてゲームに存在しているか？
    isEnable():boolean { this.enable = (this.posY != Def.DATA_NONE); return this.enable; }

    move() {
        if(this.isEnable()) {
            this.posX += this.spX;
            if( (this.posX <= (0-48) && this.spX < 0)
            ||  (240 <= this.posX && 0 < this.spX) {
                this.spX *= -1;
            }
        }
    }

    // 表示位置の調整と画面外にでた場合の削除処理
    // 本当は位置調整しないで描画したいがとりあえず
    adjustDispPos(pMoveY:number) {
        if( this.isEnable() ) {
            this.posY += pMoveY;
            if(Def.DISP_H+20 < this.posY) {
                this.posY = Def.DATA_NONE;
            }
        }
    }


    draw(img:p5.Image, isDebugRect:bool=false) {
        if( this.isEnable() ) {
            if( this.spX < 0)
                img.drawImage(this.imgNo, this.posX, this.posY);
            else
                img.drawImageFlipH(this.imgNo, this.posX, this.posY);

            if( isDebugRect ) {
                let imgBuf = img.getImage(this.imgNo);
                img.p.stroke(0,128,0);
                img.p.noFill();
                img.p.rect(this.posX, this.posY, imgBuf.width, imgBuf.height);
                img.p.noStroke();
            }
        }
    }
}
