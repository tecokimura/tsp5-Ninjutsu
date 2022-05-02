import p5 from "p5";

import {Def} from "./def";
import {Img} from "./img";
import {Util} from "./util";
import {Player} from "./player";
import {Enemy} from "./enemy";
import {Cloud} from "./cloud";
import {Star} from "./star";
import {Snow} from "./Snow";
import {Rain} from "./rain";
import {Scene} from "./scene";
import {Camera} from "./camera";
import {Stage} from "./stage";


// for Debug
Util.isDebug = false;
Util.isDebugLog = true;
Util.isDebugInfo = false;
Util.isDebugHit = true;
Util.isDebugRectObj = true;
Util.isDebugRectHit = true;false
Util.isDebugEnemyType = false;

let scene = null;
let isDraw = false;
let img = null;

const sketch = (p: p5) => {

    // Player(Ninja) data
    let player = null;

    let enemies: Array<Enemy>  = new Array(Def.ENEMY_MAX);
    
    let appearAirLevel = 0;

    // -s は英語がおかしいけど まぁいいか・・・
    let clouds: Array<Cloud> = new Array(Def.CLOUD_MAX);
    let stars: Array<Star> = new Array(Def.STAR_MAX);
    let rains: Array<Rain> = new Array(Def.RAIN_MAX);
    let snows: Array<Snow> = new Array(Def.SNOW_MAX);

    // keyCodeHistory
    // 0,1,2,3.. と押された履歴を配列に記憶する
    // [0] が一番直近に押されたキーコード
    // [1] がその前に押されたキーコード
    let keyCodeHistory: Array<number> = new Array(5);
    let keyCodePre = Def.P5_KEY_NONE;

    // p5のキーコードと変数を見て調べる
    // キーが押されていればtrue
    // if文１回で行けそうだけど見にくくなりそうなのでとりあえずこのままにしとく
    function isPushKey(code:number=Def.P5_KEY_ANY) {
        let is = (keyCodeHistory[0] != Def.P5_KEY_NONE);
        if( is ) {
            // キーが指定されている場合は調べて更新する
            if (code != Def.P5_KEY_ANY) {
                is = (keyCodeHistory[0] == code);
            }

            Util.debug("isPushKey:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        }
        return is;
    }

    // キーが今のフレームで押されたかを調べる
    // 履歴の前が押していなくて今が押していればtrue
    function isPushKeyNow() {
        let is = (keyCodeHistory[0] != Def.P5_KEY_NONE
               && keyCodeHistory[1] == Def.P5_KEY_NONE);
        if(is) Util.debug("isPushKeyNow:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }
    
    //
    // 今キーを離したかを取得する
    //
    function isReleaseKeyNow() {
        let is = (keyCodeHistory[0] == Def.P5_KEY_NONE
               && keyCodeHistory[1] != Def.P5_KEY_NONE);
        if(is) Util.debug("isReleaseKeyNow:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }

    // p5 の初期設定
    p.setup = () => {
        p.createCanvas(Def.DISP_W, Def.DISP_H);

        // 以降、すべてに反映されるので注意
        p.angleMode(p.DEGREES);
        p.textAlign(p.LEFT, p.BOTTOM);

        Util.setP5(p);

        scene = new Scene();
        player = new Player();
        for(let i=0; i<enemies.length; i++)
            enemies[i] = new Enemy();

        for(let i=0; i<stars.length; i++)
            stars[i] = new Star();

        for(let i=0; i<clouds.length; i++)
            clouds[i] = new Cloud();

        for(let i=0; i<rains.length; i++)
            rains[i] = new Rain();

        for(let i=0; i<snows.length; i++)
            snows[i] = new Snow();

        init();
        proc();
    };

    // p5 画像読み込み
    p.preload = () => {
        // 画像読み込み予定 sample
        img = new Img(p);
        img.preload(); 

    };


    p.keyPressed = () => {
        Util.debug("keyPressed:"+p.keyCode);
        keyCodePre = p.keyCode;
    }

    p.keyReleased = () => {
        Util.debug("keyReleased:"+p.keyCode);
        keyCodePre = Def.P5_KEY_NONE;
    }

    // Scene の状態に合わせて画面を描画する
    p.draw = () => {
        if( isDraw ) {
            if( scene.is(Scene.INIT)) {
                drawClear();
            }
            else
            if( scene.is(Scene.LOADING)) {
                drawClear();
            }
            else
            if( scene.is(Scene.TITLE)) {

                p.push()
                drawBg();

                img.drawImage( Img.NINJA_STAND, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );

                drawFg(Def.TITLE_FILTER_COLOR_R,
                       Def.TITLE_FILTER_COLOR_G,
                       Def.TITLE_FILTER_COLOR_B,
                       Def.TITLE_FILTER_COLOR_A);

                p.textAlign(p.CENTER, p.CENTER);

                p.fill(200,200,240);
                p.textSize(24);
                Util.textBold('N i n j u t s u', Def.DISP_W/2, 90);

                p.noFill();
                p.stroke(100,100,200);
                p.rect(30, 60, 180, 60);
                p.stroke(90,90,200);
                p.rect(30-1, 60-1, 180+2, 60+2);
                p.rect(30+1, 60+1, 180-2, 60-2);
                p.noStroke();

                if ( scene.count() % 20 > 2) {
                    p.textSize(16);
                    p.fill(155,50,50,220);
                    p.text('PUSH ENTER', Def.DISP_W/2, 150+1);
                    p.fill(230,100,100,250);
                    p.text('PUSH ENTER', Def.DISP_W/2, 150);
                }

                // Like a movie
                p.fill(0, 0, 0);
                p.rect(0, 0, Def.DISP_W, 40);
                p.rect(0, Def.DISP_H-40, Def.DISP_W, 40);

                p.pop()
            }
            else
            if( scene.is(Scene.READY)) {

                // Camera on

                // draw bg
                drawBg();

                drawReadyNinjutsu(scene.count());

                // :TODO
                // -5 は適当です。PLAYになる時に0以下になるように調整する
                let a = Def.TITLE_FILTER_COLOR_A+(scene.count()*-5)
                if ( a < 0 ) a = 0;

                drawFg(Def.TITLE_FILTER_COLOR_R,
                       Def.TITLE_FILTER_COLOR_G,
                       Def.TITLE_FILTER_COLOR_B,
                       a);

            }
            else
            if( scene.is(Scene.PLAY)) {
                // draw bg
                drawBg();


                drawEnemy();

                player.draw(img, isPushKey(), isPushKeyNow(), isReleaseKeyNow());
               
                drawFg();
            }
            else
            if( scene.is(Scene.GAMEOVER)) {
                drawBg();

                drawEnemy();
                
                if( player.posY < Def.DISP_H ) {
                    player.drawCrush(img);
                }

                drawFg();

                // GAME OVER を出す
                p.push();
                p.fill(40, 40, 40, 120);
                p.rect(0, 60, Def.DISP_W, 140);

                p.fill(255, 50, 50, 180);
                p.textSize(32);
                p.textAlign(p.CENTER, p.CENTER);
                Util.textBold('G a M e',  Def.DISP_W/2, Def.DISP_H/2-25);
                Util.textBold('O V e R',  Def.DISP_W/2, Def.DISP_H/2+25);
                
                if( 10 < scene.count()) {
                    p.fill(200, 200, 255, 220);
                    p.textSize(12);
                    p.text('< push any key >',  Def.DISP_W/2, Def.DISP_H/2+60);
                }
                p.pop();
            }


            // for DEBUG
            if( Util.isDebugInfo ) {
                drawDebugInfo(p);
            }
        } // draw()
    }

    // Debug画面表示
    // Player情報などの表示
    function drawDebugInfo(p:p5) {
        if(Util.isDebugInfo) {
            let x = 5;
            let y = 5;
            let addy = 12;

            let n = 0;

            p.fill(255,0,0);
            p.textSize(10);
            p.textAlign(p.LEFT, p.BOTTOM);
            p.text('SC:'+scene.present,  x, y+=addy);
            p.text('FR:'+scene.count(),  x, y+=addy);
            p.text('CCX:'+Camera.centerX,    x, y+=addy);
            p.text('CCY:'+Camera.centerY,    x, y+=addy);
            p.text('CIL:'+Camera.getInLeft(),  x, y+=addy);
            p.text('CIT:'+Camera.getInTop(),    x, y+=addy);
            p.text('PX:'+player.posX,    x, y+=addy);
            p.text('PY:'+player.posY,    x, y+=addy);
            p.text('PV:'+player.spY,     x, y+=addy);
            p.text('PH:'+player.high,    x, y+=addy);
            p.text('HR1:'+enemies[0].getStringHit(),    x, y+=addy);
            p.text('HR2:'+enemies[0].getStringHit2(),   x, y+=addy);
            p.text('PT:'+player.time,    x, y+=addy);
            p.text('eA:'+appearAirLevel, x, y+=addy);
           
            n = 0;
            enemies.forEach((e) => { if(e.isEnable()) n++; });
            p.text('en:'+n, x, y+=addy);
            n = 0;
            stars.forEach((s) => { if(s.isEnable()) n++; });
            p.text('st:'+n, x, y+=addy);
            n = 0;
            clouds.forEach((c) => { if(c.isEnable()) n++; });
            p.text('cl:'+n, x, y+=addy);
            n = 0;
            rains.forEach((r) => { if(r.isEnable()) n++; });
            p.text('rn:'+n, x, y+=addy);
            n = 0;
            snows.forEach((s) => { if(s.isEnable()) n++; });
            p.text('sn:'+n, x, y+=addy);
        }
    }

    // Ready の時のアニメーション
    // TODO: アニメーションロジック見直し
    // アニメーション定義をして配列かに別定義する
    // procでカウントを判定して次のPLAYに移行させている
    function drawReadyNinjutsu(c:number) {

        let imgAry = [
            Img.NINJA_JUTSU_BASE,
            Img.NINJA_JUTSU_GU,
            Img.NINJA_JUTSU_CHOKI,
            Img.NINJA_JUTSU_BASE,
            Img.NINJA_JUTSU_PA,
            Img.NINJA_JUTSU_GU,
            Img.NINJA_JUTSU_BASE,
            Img.NINJA_JUTSU_PA,
        ];

        for(let i=0; i< imgAry.length; i++) {
            if( c < 4*(i+1) ) {
                img.drawImage( imgAry[i], Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
                break;
            }
        }
        //ランダムで2回ぐらいなにか表示する
    }

    // 定期的にprocを実行する
    function repeatProc(time:number=100) {
        setTimeout(() => { proc(); }, time);
    };

    function addEnemy() {
        if( scene.count()%2 == 0 ) {
            // 星出現
            for(let i=0; i<stars.length; i++) {
                // if( Def.AIR_LV_1 <= appearAirLevel)
                {
                    if( stars[i].add() ) {
                        Util.debug("added stars");
                        break;
                    }
                }
            }

            // 雲出現
            for(let i=0; i<clouds.length; i++) {
                if( clouds[i].add() ) {
                    // Util.debug("added cloud");
                    break;
                }
            }

            // 雨
            for(let i=0; i<rains.length; i++) {
                if( rains[i].add() ) {
                    // Util.debug("added rain");
                    break;
                }
            }

            // ゆき
            for(let i=0; i<snows.length; i++) {
                if( snows[i].add() ) {
                    // Util.debug("added snow");
                    break;
                }
            }
        }


        if( appearAirLevel <= player.high ) {
            if( Def.FIRST_ENEMY_POS <= player.high) {
                // 敵出現
                for(let i=0; i<enemies.length; i++) {
                    if( enemies[i].isEnable() == false) {
                        if( appearAirLevel < Def.AIR_LV_0 ) {
                            if( enemies[i].add(Def.TYPE_ENEMY_BIRD, Util.isDebugEnemyType) ) {
                                appearAirLevel += 70;
                            }
                        }
                        else
                        if( appearAirLevel < Def.AIR_LV_1 ) {
                            if( enemies[i].add(Def.TYPE_ENEMY_SHURI, Util.isDebugEnemyType) ) {
                                appearAirLevel += 50;
                            }
                        }
                        else
                        if( appearAirLevel < Def.AIR_LV_2 ) {
                            if( enemies[i].add(Def.TYPE_ENEMY_DRONE, Util.isDebugEnemyType) ) {
                                appearAirLevel += 40;
                            }
                        }
                        else
                        if( appearAirLevel < Def.AIR_LV_3 ) {
                            if( enemies[i].add(Def.TYPE_ENEMY_SHINOBI, Util.isDebugEnemyType) ) {
                                appearAirLevel += 30;
                            }
                        }
                        else
                        if( appearAirLevel < Def.AIR_LV_4 ) {
                            if( enemies[i].add(Def.TYPE_ENEMY_UFO, Util.isDebugEnemyType) ) {
                                appearAirLevel += 20;
                            }
                        } else {
                            if( enemies[i].addRandType(Util.isDebugEnemyType) ) {
                                appearAirLevel += 10;
                            }
                        }

                        // 重複して出ないように1回に1体出したら終了
                        break;
                    }
                }
            } else {
                // 敵がたまらないようにリセット
                appearAirLevel = player.high + 80;
            }
        }
    }


    /**
     * 整数の乱数を取得する
     */
    function getRandInt():number {
        return Util.getRandInt();
    }

    function init() {
        let i=0;

        appearAirLevel = 0;

        Camera.init(Def.DISP_W/2,Def.DISP_H/2,Def.DISP_W, Def.DISP_H);
        player.init();

        for(i=0; i<enemies.length; i++) { enemies[i].init(); }
        for(i=0; i<stars.length; i++) { stars[i].init(); }
        for(i=0; i<clouds.length; i++) { clouds[i].init(); }
        for(i=0; i<rains.length; i++) { rains[i].init(); }
        for(i=0; i<snows.length; i++) { snows[i].init(); }

        keyCodePre = Def.P5_KEY_NONE;
        for(let i=0; i<keyCodeHistory.length;i++) {
            keyCodeHistory[i] = Def.P5_KEY_NONE;
        }
    }

    // 
    function proc() {
        isDraw = false;
        // Util.debug("in proc");

        //
        // キーコード履歴 を更新する
        for(let i=0;i<keyCodeHistory.length-1;i++) {
            keyCodeHistory[i+1] = keyCodeHistory[i];
        }

        // キーが押しっぱなし
        if(p.keyIsPressed === true) {
            keyCodePre = p.keyCode;
            Util.debug('kCH='+keyCodeHistory[1]);
        }

        keyCodeHistory[0] = keyCodePre;
        keyCodePre = Def.P5_KEY_NONE;

        // SCENE
        if( scene.is(Scene.INIT) ) {
            Util.debug("Scene.INIT");
            if(scene.count() > 10) {
                scene.set(Scene.LOADING);
            }
        }
        else
        if( scene.is(Scene.LOADING) ) {
            Util.debug("Scene.LOADING");

            // TODO: 画像読み込みが完了しているかチェックする
            if( true ) {
                scene.set(Scene.TITLE);
            }

        }
        else
        if( scene.is(Scene.TITLE)) {
            Util.debug("Scene.TITLE");
            // キーが押されているかを調べてOn/Offを反転させる
            if( isPushKey(Def.P5_KEY_I)) {
                Util.isDebugInfo = !Util.isDebugInfo;
            }
            else
            if( isPushKey(Def.P5_KEY_ENTER) ) {
                scene.set(Scene.READY);
            }
        }
        else
        if( scene.is(Scene.READY) ) {
            // for Test
            if(scene.count() > 40 ) {
                scene.set(Scene.PLAY);
            }
        }
        else
        if( scene.is(Scene.PLAY) ) {

            // 雲の移動
            let i=0;
            for(i=0; i<clouds.length; i++){ clouds[i].move(); }
            for(i=0; i<stars.length; i++) { stars[i].move(); }
            for(i=0; i<rains.length; i++) { rains[i].move(); }
            for(i=0; i<snows.length; i++) { snows[i].move(); }

            // 敵の移動
            for(i=0; i<enemies.length; i++) {
                enemies[i].move();
                enemies[i].updateImgNo();
            }


            // for Debug
            if( isPushKey(Def.P5_KEY_I)) {
                Util.isDebugInfo = !Util.isDebugInfo;
            }

            // キーを押しているかどうか
            if(player.high > 64) {
                if( isPushKey(Def.P5_KEY_H) ) {
                    Util.debug("isPushKey(Def.P5_KEY_H)");
                    player.high = 99999;
                }
            }
           
            player.move(isPushKey());
            Camera.move(player.getCenterX(), player.getCenterY());
            player.updateImgNo(isPushKey(), isPushKeyNow(), isReleaseKeyNow());

            let adjustH = player.adjustHigh(Def.PLAY_MAX_DRAW_POS_Y);
            if( 0 < adjustH) {

                // TODO: 変な処理だがリファクタはまた別に行う
                //       敵が存在するのなら プレイヤーが移動した分を移動させる
                let k=0;
                for(k=0;k<enemies.length;k++) { enemies[k].adjustDispPos(adjustH); }
                for(k=0;k<clouds.length;k++) { clouds[k].adjustDispPos(adjustH); }
                for(k=0;k<stars.length;k++) { stars[k].adjustDispPos(adjustH); }
                for(k=0;k<rains.length;k++) { rains[k].adjustDispPos(adjustH); }
                for(k=0;k<snows.length;k++) { snows[k].adjustDispPos(adjustH); }

            }

            // 当たり判定
            if(Util.isDebugHit == false) {
                for(let i=0; i<enemies.length; i++) {
                    if( enemies[i].hit(player) ) {
                        Util.debug("!!!!! Enemy Hit !!!!!");
                        scene.set(Scene.GAMEOVER);
                        player.setGameover();
                    }
                }
            }

            // 敵出現
            addEnemy();

            // 画面下に切れた場合もゲームオーバー
            if( player.checkOverUnder(Camera.getInBottom()) ) {
                // pyon_time = 0;
                scene.set(Scene.GAMEOVER);
                player.setGameover();
            }

        }
        else
        if( scene.is(Scene.GAMEOVER)) {
            Util.debug("Scene.GAMEOVER");

            let i=0;
            for(i=0; i<clouds.length; i++){ clouds[i].move(); }
            for(i=0; i<stars.length; i++) { stars[i].move(); }
            for(i=0; i<rains.length; i++) { rains[i].move(); }
            for(i=0; i<snows.length; i++) { snows[i].move(); }

            // 敵の移動
            for(i=0; i<enemies.length; i++) {
                enemies[i].move();
                enemies[i].updateImgNo();
            }

            // 
            player.moveInGameover(Camera.getInBottom());

            if( 10 < scene.count() && isPushKey() ) {
                // Data reset する
                scene.set(Scene.TITLE);
                init();
            }

        }

        // play.Time++;
        player.countTime();
        for(let i=0;i<enemies.length;i++) {
            enemies[i].countTime();
        }
        for(let i=0;i<clouds.length;i++) {
            clouds[i].countTime();
        }
        scene.counting();

        isDraw = true;
        repeatProc();
    }


    /**
      * 画面を単色で描画してクリアする
      */
    function drawClear(r:number=0, g:number=0, b:number=0) {
        p.fill(r, g, b);
        p.rect(0, 0, Def.DISP_W, Def.DISP_H);
    }


    /**
     * プログラムによるグラデーションの描画
     */
    function drawBg(isClear:boolean = true) {
        let i:number;

        p.noStroke();

        // 描画クリア
        if(isClear) drawClear();

        // TODO: あとでカメラ位置に変更する
        // appearAirLevel = Camera.getInLeft();
        let rgbi = (appearAirLevel/170);
        if( Def.BG_COLOR_RGBs.length - 12 < rgbi ) {
            rgbi = Def.BG_COLOR_RGBs.length - 12;
        }
        
        // 背景スクロール中
        for(i=0;i<12;i++) {
            let rgbs = Def.BG_COLOR_RGBs[Util.mathFloor(i+rgbi)];
            p.fill(rgbs[0],rgbs[1],rgbs[2]);
            p.rect(0, 220-(i*20), Def.DISP_W, 20);
        }

        // 最初の背景の描画
        i = Camera.getInLeft() + 0;
        if( i <  Camera.getInBottom()) {
            img.drawImage(Img.BG_BG1, 0, i);
        }

        for(i=0; i<stars.length; i++) { stars[i].drawBack(p); }
        for(i=0; i<clouds.length; i++){ clouds[i].drawBack(p); }
        for(i=0; i<rains.length; i++) { rains[i].drawBack(p); }
        for(i=0; i<snows.length; i++) { snows[i].drawBack(p); }

    }


    /**
     * option: Filter color(r,g,b,a)
     **/
    function drawFg(r:number=-1, g:number=-1, b:number=-1, a:number=70) {
        let i=0;

        for(i=0; i<stars.length; i++) { stars[i].drawFront(p); }
        for(i=0; i<clouds.length; i++){ clouds[i].drawFront(p); }
        for(i=0; i<rains.length; i++) { rains[i].drawFront(p); }
        for(i=0; i<snows.length; i++) { snows[i].drawFront(p); }

        // If there use filter on screen
        if(r!=-1 && g != -1 && b != -1) {
            p.fill(r,g,b,a);
            p.rect(0,0,Def.DISP_W,Def.DISP_H);
        }
    }


    /**
     * 敵（障害物の描画）
     * 後々のリファクタは必要そう
     */
    function drawEnemy() {
        for(let i=0;i<enemies.length; i++) {
            enemies[i].draw(img);
        }
    }

};

new p5(sketch);

