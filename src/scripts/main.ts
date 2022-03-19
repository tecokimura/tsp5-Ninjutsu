import p5 from "p5";
import {Def} from "./def";
import {Img} from "./img";
import {Util} from "./util";
import {Player} from "./player";
import {Enemy} from "./enemy";
import {Scene} from "./scene";


let scene = null;
let isDraw = false;
let img = null;
let isDebug = true;
let isDebugLog = true;
let isDebugInfo= true;
let isDebugRect= true;

const sketch = (p: p5) => {

    // Player(Ninja) data
    let player = null;

    let enemies: Array<Enemey>  = new Array(Def.ENEMY_MAX);
    
    let appearAirLevel = 0;

    // 星
    let starX: Array<number> = new Array(Def.STAR_MAX);    // 星x座標
    let starY: Array<number> = new Array(Def.STAR_MAX);    // 星y座標

    let cloudX: Array<number>  = new Array(Def.CLOUD_MAX);    // 星x座標
    let cloudY: Array<number>  = new Array(Def.CLOUD_MAX);    // 星y座標
    let cloudZ: Array<number>  = new Array(Def.CLOUD_MAX);    // 星y座標
    let cloudSp: Array<number> = new Array(Def.CLOUD_MAX);    // 星y座標

    let keyCodePre = Def.P5_KEYCODE_NONE;
    let keyCodeHistory: Array<number> = new Array(5);


    // p5のキーコードと変数を見て調べる
    // キーが押されていればtrue
    // if文１回で行けそうだけど見にくくなりそうなのでとりあえずこのままにしとく
    function isPushKey(code:number=Def.P5_KEYCODE_ANY) {
        let is = (keyCodeHistory[0] != Def.P5_KEYCODE_NONE);
        if( is ) {
            // キーが指定されている場合は調べて更新する
            if (code != Def.P5_KEYCODE_ANY) {
                is = (keyCodeHistory[0] == code);
            }

            Util.debug("isPushKey:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        }
        return is;
    }

    // キーが今のフレームで押されたかを調べる
    // 履歴の前が押していなくて今が押していればtrue
    function isPushKeyNow() {
        let is = (keyCodeHistory[0] != Def.P5_KEYCODE_NONE
               && keyCodeHistory[1] == Def.P5_KEYCODE_NONE);
        if(is) Util.debug("isPushKeyNow:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }
    
    function isReleaseKeyNow() {
        let is = (keyCodeHistory[0] == Def.P5_KEYCODE_NONE
               && keyCodeHistory[1] != Def.P5_KEYCODE_NONE);
        if(is) Util.debug("isReleaseKeyNow:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }

    // p5 の初期設定
    p.setup = () => {
        p.createCanvas(Def.DISP_W, Def.DISP_H);
        p.angleMode(p.DEGREES);

        scene = new Scene();

        // Utilにp5を設定
        Util.setP5(p);
        Util.isDebug = true;
        Util.isDebugLog = true;
        Util.isDebugRect = true;
        Util.isDebugInfo = true;
        Util.isDebugHit = true;

        init();
        proc();
    };

    // p5 画像読み込み
    p.preload = () => {
        // 画像読み込み予定 sample
        img = new Img(p);
        img.preload(); 

    };


    // 
    p.keyPressed = () => {
        Util.debug("keyPressed:"+p.keyCode);
        keyCodePre = p.keyCode;
    }

    // 
    p.keyReleased = () => {
        Util.debug("keyReleased:"+p.keyCode);
        keyCodePre = Def.P5_KEYCODE_NONE;
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
                drawClear();

                // Test title
                p.fill(0,0,255);
                p.textSize(24);
                p.text('Ninjutsu!!', 50 ,82);
                p.noFill();
                p.stroke(0,0,255);
                p.rect(30, 40, 170, 60);
                p.noStroke();

                p.fill(255,0,0);
                p.textSize(16);
                p.text('PUSH ENTER', 60 ,232);

            }
            else
            if( scene.is(Scene.READY)) {
                drawBg();

                drawReadyNinjutsu(scene.count());

            }
            else
            if( scene.is(Scene.PLAY)) {
                drawBg();
                drawEnemy();

                player.draw(img, isPushKey(), isPushKeyNow(), isReleaseKeyNow());
               
                
            }
            else
            if( scene.is(Scene.GAMEOVER)) {
                drawBg();
                drawEnemy();
                
                if( player.posY < Def.DISP_H ) {
                    player.drawCrush(img);
                }
            }



            // for DEBUG
            if( Util.isDebugInfo ) {
                drawDebugInfo(p);
            }

            // Util.debug("in draw");
        }
        // draw()
    }

    // Debug画面表示
    // Player情報などの表示
    function drawDebugInfo(p) {
        if(Util.isDebugInfo) {
            let x = 5;
            let y = 0;
            let addy = 12;
            p.fill(255,0,0);
            p.textSize(y+=addy);
            p.text('SC:'+scene.present,  x, y+=addy);
            p.text('FR:'+scene.count(),  x, y+=addy);
            p.text('PX:'+player.posX,    x, y+=addy);
            p.text('PY:'+player.posY,    x, y+=addy);
            p.text('PV:'+player.spVY,    x, y+=addy);
            p.text('PH:'+player.high,    x, y+=addy);
            p.text('PT:'+player.time,    x, y+=addy);
            p.text('eA:'+appearAirLevel, x, y+=addy);
        }
    }

    // Ready の時のアニメーション
    // TODO: アニメーションロジック見直し
    // アニメーション定義をして配列かに別定義する
    // procでカウントを判定して次のPLAYに移行させている
    function drawReadyNinjutsu(c:number) {
        if(c < 10) {
            img.drawImage( Img.NINJA_JUTSU_BASE, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        else
        if(c < 15) {
            img.drawImage( Img.NINJA_JUTSU_GU, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        else
        if(c < 20) {
            img.drawImage( Img.NINJA_JUTSU_CHOKI, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        else
        if(c < 25) {
            img.drawImage( Img.NINJA_JUTSU_BASE, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        else
        if(c < 30) {
            img.drawImage( Img.NINJA_JUTSU_PA, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        else
        if(c < 35) {
            img.drawImage( Img.NINJA_JUTSU_GU, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        else
        if(c < 40) {
            img.drawImage( Img.NINJA_JUTSU_BASE, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        else
        if(c < 45) {
            img.drawImage( Img.NINJA_JUTSU_PA, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        //ランダムで2回ぐらいなにか表示する
    }

    // 定期的にprocを実行する
    function repeatProc(time:number=100) {
        setTimeout(() => { proc(); }, time);
    };

    function addEnemy() {
        if( appearAirLevel <= player.high ) {
            if( Def.FIRST_ENEMY_POS <= player.high) {
                // 星出現
                for(let i=0; i<Def.STAR_MAX; i++) {
                    if( starY[i] == Def.DATA_NONE && Def.AIR_LV_1 <= appearAirLevel) {
                        starY[i] = -40-(getRandInt()%120);
                        starX[i] = (getRandInt()%Def.DISP_W);
                        break;
                    }
                }

                // 雲出現
                for(let i=0; i<Def.CLOUD_MAX; i++) {
                    if( cloudY[i] == Def.DATA_NONE
                    &&  (appearAirLevel <= Def.AIR_LV_1 || Def.AIR_LV_3 <= appearAirLevel) ) {
                        cloudY[i]  = -40-(getRandInt()>>>1)%20;
                        cloudX[i]  = (getRandInt()>>>1)%Def.DISP_W;
                        cloudZ[i]  = (getRandInt()>>>1)%2;
                        cloudSp[i] = (getRandInt()>>>1)%2+1;

                        if( ((getRandInt()>>>1)%2) == 0)
                            cloudSp[i] *= -1;

                        break;
                    }
                }

                // 敵出現
                
                for(let i=0; i<enemies.length; i++) {
                    if( enemies[i].isEnable() == false) {
                        if( appearAirLevel < Def.AIR_LV_0 ) {
                            if( enemies[i].add(Def.TYPE_BIRD) ) {
                                appearAirLevel += 70;
                            }
                        }
                        else
                        if( appearAirLevel < Def.AIR_LV_1 ) {
                            if( enemies[i].add(Def.TYPE_KUNAI) ) {
                                appearAirLevel += 50;
                            }
                        }
                        else
                        if( appearAirLevel < Def.AIR_LV_2 ) {
                            if( enemies[i].add(Def.TYPE_SHURI) ) {
                                appearAirLevel += 40;
                            }
                        }
                        else
                        if( appearAirLevel < Def.AIR_LV_3 ) {
                            if( enemies[i].add(Def.TYPE_SHINOBI) ) {
                                appearAirLevel += 30;
                            }
                        }
                        else
                        if( appearAirLevel < Def.AIR_LV_4 ) {
                            if( enemies[i].add(Def.TYPE_UFO) ) {
                                appearAirLevel += 20;
                            }
                        } else {
                            if( enemies[i].add(getRandInt()%Def.TYPE_ALL) ) {
                                appearAirLevel += 10;
                            }
                        }

                        Util.debug("added Enemy");
                        break;
                    }
                }
            } else {
                // 敵がたまらないようにリセット
                appearAirLevel = player.high + 80;
            }
        }
    }


    function moveCloudEnemy() {
        // 雲の移動
        for(let i=0;i<Def.CLOUD_MAX;i++) {
            cloudX[i] += cloudSp[i];
            if( cloudX[i] <= (0-48) || 240 <= cloudX[i])
                cloudSp[i] *= -1;
        }

        for(let i=0; i<enemies.length; i++) {
            enemies[i].move();
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

        player = new Player();

        for(let i=0; i<Def.STAR_MAX;   i++) starY[i]  = Def.DATA_NONE;
        for(let i=0; i<Def.CLOUD_MAX;  i++) cloudY[i] = Def.DATA_NONE;

        for(let i=0; i<enemies.length; i++) {
            enemies[i] = new Enemy(p);
            enemies[i].init();
        }

        keyCodePre = Def.P5_KEYCODE_NONE;
        for(let i=0; i<keyCodeHistory.length;i++) {
            keyCodeHistory[i] = Def.P5_KEYCODE_NONE;
        }
    }

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
        keyCodePre = Def.P5_KEYCODE_NONE;

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
            if( Util.isDebug ) {
                scene.set(Scene.TITLE);
            }

        }
        else
        if( scene.is(Scene.TITLE)) {
            Util.debug("Scene.TITLE");
            // キーが押されているかを調べる
            if( true || p.keyIsPressed === true) {
                scene.set(Scene.READY);
            }
        }
        else
        if( scene.is(Scene.READY)) {
            if(scene.count() > 60 || Util.isDebug) {
                scene.set(Scene.PLAY);
            }
        }
        else
        if( scene.is(Scene.PLAY)) {

            moveCloudEnemy();

            // キーを押しているかどうか
            if(player.high > 64) {
                if( isPushKey(Def.P5_KEYCODE_Z) ) {
                    scene.set(Scene.GAMEOVER);
                    player.setGameover();
                }
            }
           
            player.move(isPushKey());
            player.updateImgNo(isPushKey(), isPushKeyNow(), isReleaseKeyNow());

            let adjustH = player.adjustHigh(Def.PLAY_MAX_DRAW_POS_Y);
            if( 0 < adjustH) {

                // 敵が存在するのなら プレイヤーが移動した分を移動させる
                // TODO: 変な処理だがリファクタはまた別に行う
                for(let k=0;k<enemies.length;k++) {
                    enemies[k].adjustDispPos(adjustH); 
                }

                //
                for(let j=0;j<Def.STAR_MAX;j++) {
                    // 星が存在するのなら
                    if(starY[j] != Def.DATA_NONE) {

                        if( (starX[j]&1)==1 ) {
                            // Xが奇数なら普通に落ちる
                            starY[j]+=adjustH;
                        } else {
                            // Xが偶数の場合は1.5倍で流れる
                            starY[j]+=adjustH+(adjustH/2);
                        }

                        if(starY[j]>260) starY[j]=Def.DATA_NONE;
                    }
                }

                //
                for(let j=0;j<Def.CLOUD_MAX;j++) {
                    // 雲が存在するのなら
                    if(cloudY[j] != Def.DATA_NONE) {

                        if( (cloudX[j]&1)==1 ) {
                            // Xが奇数なら普通に落ちる
                            cloudY[j]+=adjustH;
                        } else {
                            // Xが偶数の場合は1.5倍で流れる
                            cloudY[j]+=adjustH+(adjustH/2);
                        }

                        if(cloudY[j]>260) cloudY[j]=Def.DATA_NONE;

                    }
                }

                // // ここをコメントアウトすると上に飛び去ってしまう
                if( player.posY < Def.PLAY_MAX_DRAW_POS_Y)
                    player.posY = Def.PLAY_MAX_DRAW_POS_Y;
                
            }

            // 当たり判定
            for(let i=0; i<enemies.length; i++) {
                if( enemies[i].hit(player) ) {
                    Util.debug("!!!!! Enemy Hit !!!!!");
                    scene.set(Scene.GAMEOVER);
                    player.setGameover();
                }
            }

            // 敵出現
            addEnemy();

            // 画面下に切れた場合もゲームオーバー
            if( player.checkOverUnder(Def.DISP_H) ) {
                // pyon_time = 0;
                scene.set(Scene.GAMEOVER);
                player.setGameover();
            }

        }
        else
        if( scene.is(Scene.GAMEOVER)) {
            Util.debug("Scene.GAMEOVER");

            if( isPushKey(Def.P5_KEYCODE_Z) ) {
                // Data reset する
                scene.set(Scene.TITLE);
            }

            moveCloudEnemy();

            // 
            player.moveInGameover(Def.DISP_H);
        }

        // play.Time++;
        player.countTime();
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
        let i;
        let rgbs;

        p.noStroke();

        // 描画クリア
        if(isClear) drawClear();

        let rgbi = (appearAirLevel/170);
        if( Def.BG_COLOR_RGBs.length - 12 < rgbi ) {
            rgbi = Def.BG_COLOR_RGBs.length - 12;
        }
        
        // 背景スクロール中
        for(i=0;i<12;i++) {
            rgbs = Def.BG_COLOR_RGBs[Util.mathFloor(i+rgbi)];
            p.fill(rgbs[0],rgbs[1],rgbs[2]);
            p.rect(0, 220-(i*20), Def.DISP_W, 20);
        }

        // // STAR
        // if( (appearAirLevel >= Def.AIR_LV_1 && appearAirLevel < Def.AIR_LV_3)
        // ||   appearAirLevel >= Def.AIR_LV_4)    //大気圏-宇宙
        // {
        //     for(i=0;i<Def.STAR_MAX;i++)//星
        //     {
        //         g.setColor(Graphics.getColorOfRGB(252,231,134));
        //         g.fillRect(starX[i],starY[i],2,2);
        //     }
        // }

        // // CLOUD
        // if( appearAirLevel <= Def.AIR_LV_2 || appearAirLevel >= Def.AIR_LV_3 )
        // {
        //     // 青空-大気圏
        //     for(i=0;i<Def.CLOUD_MAX;i++)// 雲
        //     {
        //         // 奥の雲なら出す
        //         if(cloudZ[i] == 0)
        //             g.drawImage(getImage(IMAGE.CLOUD),cloudX[i], cloudY[i]);
        //     }
        // }

        // TODO:地面の描画
        i = player.high + 210;
        if( i < 210+30) {
            // とりあえず適当背景を描画する
            p.fill(64,125,64);
            p.rect(0, i, Def.DISP_W, 30);
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

    // 再ゲームするためのデータリセット
    function resetDataPlay() {
    }
};

new p5(sketch);

