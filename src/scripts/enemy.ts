import p5 from "p5";

import {Obj} from "./obj";
import {Def} from "./def";
import {Img} from "./img";
import {Util} from "./util";

// TODO: 背景として動くcloud, starもあるので一個superclassがあったほうがいいかも
export class Enemy extends Obj{

    // status:number = 0;
    status:number = 0;
    type:number = 0;
    time:number = 0;
    // posX:number = 0;
    // posY:number = 0;
    // spX:number  = 0;
    imgNo:number= 0;

    animations = new Array();

    constructor() {
        super();
        this.init();
    }

    // データをリセットしたい時などの初期化
    init() {
        this.status= Def.DATA_NONE;
        this.type  = Def.DATA_NONE;
        this.time  = 0;
        this.posX  = 0;
        this.posY  = Def.DATA_NONE;
        this.spX   = 0;
        this.spY   = 0;
        this.imgNo = 0;
        this.animations = new Array();
    }

    remove() { this.init(); }

    // 
    /**
     * 配列の空きを確認して敵を配置する
     * 戻り値（boolean）で配置できたかを返す
     */
    add(type:number, isDebug=false) {
        let isAdd = false; 

        // Debugように色んな種類を出す
        if( Util.isDebugEnemyType ) {
            type = (Util.getRandInt() % Def.TYPE_ALL);
        }

        if(this.isEnable() == false) {
            this.init();

            switch (type) {
              case Def.TYPE_UFO:
                  this.initTypeUfo();
                break;
              case Def.TYPE_SHINOBI:
                  this.initTypeShinobi();
                break;
              case Def.TYPE_SHURI:
                  this.initTypeShuri();
                break;
              case Def.TYPE_KUNAI:
                  this.initTypeKunai();
                break;
              default:
                  this.initTypeBird();
                break;
            }

            this.status = Def.ST_PLAY;
            isAdd = this.isEnable();
        }


        return isAdd;
    }

    // 敵としてゲームに存在しているか？
    isEnable():boolean {
        return ( this.type != Def.DATA_NONE
              && this.posY != Def.DATA_NONE);
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


    // 表示する画像を更新する
    updateImgNo() {
        if( this.isEnable() ) {
            if( 0 < this.animations.length) {
                let i = this.time % this.animations.length;
                this.imgNo = this.animations[i];
            }
        }
    }

    // Utilにimgを移すかはのちのち検討する
    draw(img:p5.Image) {
        if( this.isEnable() ) {
            let r = 0;
            // 回転させる場合
            // r = (this.time*30) $ 360;

            if( this.spX < 0)
                img.drawImage(this.imgNo, this.posX, this.posY, false, r);
            else
                img.drawImage(this.imgNo, this.posX, this.posY, true, r*-1);

            if( Util.isDebugRectObj ) {
                let imgBuf = img.getImage(this.imgNo);
                img.p.stroke(0,255,0,100);
                img.p.noFill();
                img.p.rect(this.posX, this.posY, imgBuf.width, imgBuf.height);
                img.p.noStroke();
            }

            if( Util.isDebugRectHit ) {
                img.p.stroke(255,255,255,100);
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


    countTime() {
        if( this.isEnable() ) {
            this.time++;
        }
    }



    initTypeUfo() {
        this.type = Def.TYPE_UFO;
        this.imgNo= Img.ENEMY_UFO;
        this.spX  = (Util.getRandInt() % 10 )+1;
        this.posY = -40-(Util.getRandInt()%10);
        this.posX = Util.getRandInt() % Def.DISP_W;
        this.animations = [
            Img.ENEMY_UFO, Img.ENEMY_UFO, Img.ENEMY_UFO,
            Img.ENEMY_UFO1,Img.ENEMY_UFO1,Img.ENEMY_UFO1
            Img.ENEMY_UFO, Img.ENEMY_UFO, Img.ENEMY_UFO,
            Img.ENEMY_UFO1,Img.ENEMY_UFO1,Img.ENEMY_UFO1
            Img.ENEMY_UFO, Img.ENEMY_UFO1,
            Img.ENEMY_UFO, Img.ENEMY_UFO1
        ];

        if( Util.getRandInt()%2 == 0 )
            this.spX *= -1;

    }

    initTypeShinobi() {
        this.type = Def.TYPE_SHINOBI;
        this.imgNo= Img.ENEMY_SHINOBI;
        this.spX  = (Util.getRandInt() % 8 )+1;
        this.posY = -40-(Util.getRandInt()%10);
        this.posX = Util.getRandInt() % Def.DISP_W;
        this.animations = [
            Img.ENEMY_SHINOBI1, Img.ENEMY_SHINOBI1, Img.ENEMY_SHINOBI1,
            Img.ENEMY_SHINOBI,  Img.ENEMY_SHINOBI
        ];

        if( Util.getRandInt()%2 == 0 )
            this.spX *= -1;

    }

    initTypeShuri() {
        this.type = Def.TYPE_SHURI;
        this.imgNo= Img.ENEMY_SHURIKEN;
        this.spX   = ((Util.getRandInt() % 4 )+1) * 3;
        this.posY = -40-(Util.getRandInt()%10);
        this.posX = Util.getRandInt() % Def.DISP_W;
        this.animations = [
            Img.ENEMY_SHURIKEN,
            Img.ENEMY_SHURIKEN1,
        ];

        if( Util.getRandInt()%2 == 0 )
            this.spX *= -1;

    }

    initTypeKunai() {
        this.type = Def.TYPE_KUNAI;
        this.imgNo= Img.ENEMY_KUNAI;
        this.spX   = (Util.getRandInt() % 4 )+1;
        this.posY = -40-(Util.getRandInt()%10);
        this.posX = Util.getRandInt() % Def.DISP_W;
        this.animations = [
            Img.ENEMY_KUNAI, Img.ENEMY_KUNAI, Img.ENEMY_KUNAI,
            Img.ENEMY_KUNAI1,Img.ENEMY_KUNAI1,Img.ENEMY_KUNAI1
        ];

        if( Util.getRandInt()%2 == 0 )
            this.spX *= -1;

    }

    initTypeBird() {
        this.type = Def.TYPE_BIRD;;
        this.imgNo= Img.ENEMY_BIRD;
        this.spX   = (Util.getRandInt() % 2 )+1;
        this.posY = -40-(Util.getRandInt()%10);
        this.posX = Util.getRandInt() % Def.DISP_W;
        this.animations = [
            Img.ENEMY_BIRD, Img.ENEMY_BIRD, Img.ENEMY_BIRD,
            Img.ENEMY_BIRD1,Img.ENEMY_BIRD1,Img.ENEMY_BIRD1,
            Img.ENEMY_BIRD1,Img.ENEMY_BIRD1,Img.ENEMY_BIRD1
        ];

        if( Util.getRandInt()%2 == 0 ) {
            this.spX *= -1;
        }

        // これが入ると一気に難しくなる・・・
        // this.spY = 2;

    }
}
