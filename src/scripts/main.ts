import p5 from "p5";
import {Def} from "./def";
import {Scene} from "./scene";
import {Img} from "./img";
import {Enemy} from "./enemy";


let scene = null;
let isDraw = false;
let img = null;
let isDebug = true;
let isDebugLog = true;
let isDebugInfo= true;
let isDebugRect= true;
// let isDebugHit = true;

const sketch = (p: p5) => {

    // Player(Ninja) data
    let playX:number = Def.PLAY_INIT_POS_X; // X位置
    let playY:number = Def.PLAY_INIT_POS_Y; // y位置
    let playVY:number = 0;  // 上昇速度
    let playH:number = 0; // 高さ
    let playTime:number = 0; // 経過時間

    // TODO:クラス化する優先度低め
    let enemies: Array<Enemey>  = new Array(Def.ENEMY_MAX);
    // let enemyX: Array<number>   = new Array(Def.ENEMY_MAX);
    // let enemyY: Array<number>   = new Array(Def.ENEMY_MAX);
    // let enemyImg: Array<number> = new Array(Def.ENEMY_MAX);
    // let enemyTime: Array<number>= new Array(Def.ENEMY_MAX);
    // let enemySp: Array<number>  = new Array(Def.ENEMY_MAX);
    let enemyAppearNum = 0;

    let enemyImgArea= Def.TYPE_BIRD; // 敵の絵の範囲
    let enemySpArea = Def.SPEED_SP1; // 敵のスピードの範囲

    // 星
    let starX: Array<number> = new Array(Def.STAR_MAX);    // 星x座標
    let starY: Array<number> = new Array(Def.STAR_MAX);    // 星y座標

    let cloudX: Array<number>  = new Array(Def.CLOUD_MAX);    // 星x座標
    let cloudY: Array<number>  = new Array(Def.CLOUD_MAX);    // 星y座標
    let cloudZ: Array<number>  = new Array(Def.CLOUD_MAX);    // 星y座標
    let cloudSp: Array<number> = new Array(Def.CLOUD_MAX);    // 星y座標

    let keyCodePre = Def.P5_KEYCODE_NONE;
    let keyCodeHistory: Array<number> = new Array(5);
    let is_playkey_push = false;


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

            if( isDebugLog ) {
                console.log("isPushKey:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
            }
        }
        return is;
    }

    // キーが今のフレームで押されたかを調べる
    // 履歴の前が押していなくて今が押していればtrue
    function isPushKeyNow() {
        let is = (keyCodeHistory[0] != Def.P5_KEYCODE_NONE
               && keyCodeHistory[1] == Def.P5_KEYCODE_NONE);
        if(is && isDebugLog) console.log("isPushKeyNow:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }
    
    function isReleaseKeyNow() {
        let is = (keyCodeHistory[0] == Def.P5_KEYCODE_NONE
               && keyCodeHistory[1] != Def.P5_KEYCODE_NONE);
        if(is && isDebugLog) console.log("isReleaseKeyNow:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }

    // p5 の初期設定
    p.setup = () => {
        p.createCanvas(Def.DISP_W, Def.DISP_H);
        p.angleMode(p.DEGREES);

        scene = new Scene();

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
        if(isDebugLog) console.log("keyPressed:"+p.keyCode);
        keyCodePre = p.keyCode;
    }

    // 
    p.keyReleased = () => {
        if(isDebugLog) console.log("keyReleased:"+p.keyCode);
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
               
                // TODO: いづれ関数にする
                let imgNo = 0;
                if(is_playkey_push) {
                    // アニメーション切替中か降下中か
                    if(isPushKeyNow())
                        imgNo = Img.NINJA_DOWN;
                    else
                        imgNo = Img.NINJA_DOWN2;
                } else {
                    // アニメーション切替中か上昇中か
                    if(isReleaseKeyNow())
                        imgNo = Img.NINJA_DOWN;
                    else
                        imgNo = Def.NINJA_FLY_ANIM[mathFloor((playTime % 20)/5) % Def.NINJA_FLY_ANIM.length];
                }

                img.drawImage(imgNo, playX, playY);

                if( isDebugRect ) {
                    let imgBuf = img.getImage(imgNo);
                    p.stroke(0,0,200);
                    p.noFill();
                    p.rect(playX, playY, imgBuf.width, imgBuf.height);
                    p.noStroke();
                }
                
            }
            else
            if( scene.is(Scene.GAMEOVER)) {
                drawBg();
                drawEnemy();
                
                if( playY < Def.DISP_H ) {
                    img.drawImage(Img.NINJA_CRASH, playX, playY);
                }
            }



            // for DEBUG
            if( isDebugInfo ) {
                drawDebugInfo(p);
            }

            // console.log("in draw");
        }
        // draw()
    }

    // Debug画面表示
    // Player情報などの表示
    function drawDebugInfo(p) {
        let x = 5;
        let y = 0;
        let addy = 12;
        p.fill(255,0,0);
        p.textSize(y+=addy);
        p.text('S:'+scene.present,   x, y+=addy);
        p.text('F:'+scene.count(),   x, y+=addy);
        p.text('PX:'+playX,          x, y+=addy);
        p.text('PY:'+playY,          x, y+=addy);
        p.text('PV:'+playVY,         x, y+=addy);
        p.text('PH:'+playH,          x, y+=addy);
        p.text('PT:'+playTime,       x, y+=addy);
        p.text('eA:'+enemyAppearNum, x, y+=addy);
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

    function repeatProc(time:number=100) {
        setTimeout(() => { proc(); }, time);
    };

    function addEnemy() {
        if( enemyAppearNum <= playH ) {
            if( Def.FIRST_ENEMY_POS <= playH) {
                // 星出現
                for(let i=0; i<Def.STAR_MAX; i++) {
                    if( starY[i] == Def.DATA_NONE && Def.AIR_LV_1 <= enemyAppearNum) {
                        starY[i] = -40-(getRandInt()%120);
                        starX[i] = (getRandInt()%Def.DISP_W);
                        break;
                    }
                }

                // 雲出現
                for(let i=0; i<Def.CLOUD_MAX; i++) {
                    if( cloudY[i] == Def.DATA_NONE
                    &&  (enemyAppearNum <= Def.AIR_LV_1 || Def.AIR_LV_3 <= enemyAppearNum) ) {
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
                        if( enemyAppearNum < Def.AIR_LV_0 ) {
                            if( enemies[i].add(Def.TYPE_BIRD) ) {
                                enemyAppearNum += 70;
                            }
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_1 ) {
                            if( enemies[i].add(Def.TYPE_KUNAI) ) {
                                enemyAppearNum += 50;
                            }
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_2 ) {
                            if( enemies[i].add(Def.TYPE_SHURI) ) {
                                enemyAppearNum += 40;
                            }
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_3 ) {
                            if( enemies[i].add(Def.TYPE_SHINOBI) ) {
                                enemyAppearNum += 30;
                            }
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_4 ) {
                            if( enemies[i].add(Def.TYPE_UFO) ) {
                                enemyAppearNum += 20;
                            }
                        } else {
                            if( enemies[i].add(getRandInt()%Def.TYPE_ALL) ) {
                                enemyAppearNum += 10;
                            }
                        }

                        break;
                    }
                }
            } else {
                // 敵がたまらないようにリセット
                enemyAppearNum = playH + 80;
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
     * 1000はなんとなく
     * https://p5js.org/reference/#/p5/random
     */
    function getRandInt():number {
        return p.round(p.random(1000));
    }

    function init() {
        let i=0;

        playY = Def.PLAY_INIT_POS_Y;
        playVY= 0;
        playH = 0;
        enemyAppearNum = 0;


        for(let i=0;i<Def.STAR_MAX;    i++) starY[i]  = Def.DATA_NONE;
        for(let i=0;i<Def.CLOUD_MAX;i++) cloudY[i] = Def.DATA_NONE;

        for(let i=0;i<enemies.length; i++) { enemies[i] = new Enemy(p); enemies[i].init(); }

        keyCodePre = Def.P5_KEYCODE_NONE;
        for(i=0;i<keyCodeHistory.length;i++) {
            keyCodeHistory[i] = Def.P5_KEYCODE_NONE;
        }
    }

    function proc() {
        isDraw = false;
        // console.log("in proc");

        //
        // KEY CODE 更新

        // キーコード履歴 を更新する
        for(let i=0;i<keyCodeHistory.length-1;i++) {
            keyCodeHistory[i+1] = keyCodeHistory[i];
        }

        // キーが押しっぱなし
        if(p.keyIsPressed === true) {
            // Enterしか押せないので外す
            keyCodePre = p.keyCode;
            if( isDebugLog ) console.log('kCH='+keyCodeHistory[1]);
        }

        keyCodeHistory[0] = keyCodePre;
        keyCodePre = Def.P5_KEYCODE_NONE;


        if( scene.is(Scene.INIT) ) {
            console.log("Scene.INIT");
            if(scene.count() > 10) {
                scene.set(Scene.LOADING);
            }
        }
        else
        if( scene.is(Scene.LOADING) ) {
            console.log("Scene.LOADING");

            // TODO: 画像読み込みが完了しているかチェックする
            if( isDebug ) {
                scene.set(Scene.TITLE);
            }

        }
        else
        if( scene.is(Scene.TITLE)) {
            console.log("Scene.TITLE");
            // キーが押されているかを調べる
            if( true || p.keyIsPressed === true) {
                scene.set(Scene.READY);
            }
        }
        else
        if( scene.is(Scene.READY)) {
            if(scene.count() > 60 || isDebug) {
                scene.set(Scene.PLAY);
            }
        }
        else
        if( scene.is(Scene.PLAY)) {

            moveCloudEnemy();

            // キーを押しているかどうか
            if(playH > 64) {
                if( isPushKey() ) is_playkey_push = true;
                if( isPushKey() == false ) is_playkey_push = false;
                if( isPushKey(Def.P5_KEYCODE_Z) ) {
                    scene.set(Scene.GAMEOVER);
                    playVY *= 1.25; // いて！みたいにちょっと上に飛ばす(びっくりした感じを出す)
                }
            }
            
            // ボタンを押していたら上昇速度を下げる
            if( is_playkey_push) {
                playVY--;
            }
            
            // ボタンを押していない && MAXスピードではなければ
            if(is_playkey_push== false && playVY < Def.PLAY_MAX_VY ) {
                // 徐々に速度を上げる
                playVY++;
            }

            if(playH < 100) {
                // ある程度の高さまで行っていれば上昇しすぎないように調整する
                playY += -4;
                playVY = 8;
            } else {
                // 速度分を移動させる
                playY -= mathFloor(playVY/2);
            }

            // 風船がまだ画面の中にある場合
            let i = Def.PLAY_MAX_DRAW_POS_Y - playY;
            if( 0 < i) {

                // カウンターストップ
                if(playH+i < 99999) {
                    playH+=i;
                } else {
                    playH = 99999;
                }

                // 敵が存在するのなら プレイヤーが移動した分を移動させる
                // TODO: 変な処理だがリファクタはまた別に行う
                for(let k=0;k<enemies.length;k++) {
                    enemies[k].adjustDispPos(i); 
                }

                //
                for(let j=0;j<Def.STAR_MAX;j++) {
                    // 星が存在するのなら
                    if(starY[j] != Def.DATA_NONE) {

                        if( (starX[j]&1)==1 ) {
                            // Xが奇数なら普通に落ちる
                            starY[j]+=i;
                        } else {
                            // Xが偶数の場合は1.5倍で流れる
                            starY[j]+=i+(i/2);
                        }

                        if(starY[j]>260) starY[j]=Def.DATA_NONE;
                    }
                }

                for(let j=0;j<Def.CLOUD_MAX;j++) {
                    // 雲が存在するのなら
                    if(cloudY[j] != Def.DATA_NONE) {

                        if( (cloudX[j]&1)==1 ) {
                            // Xが奇数なら普通に落ちる
                            cloudY[j]+=i;
                        } else {
                            // Xが偶数の場合は1.5倍で流れる
                            cloudY[j]+=i+(i/2);
                        }

                        if(cloudY[j]>260) cloudY[j]=Def.DATA_NONE;

                    }
                }

                // TODO: PlayerY 位置を調整する
                // ここをコメントアウトすると上に飛び去ってしまう
                if( playY < Def.PLAY_MAX_DRAW_POS_Y) playY=Def.PLAY_MAX_DRAW_POS_Y;
                
            }

            // 敵出現
            addEnemy();

            // 画面下に切れた場合もゲームオーバー
            if(playY>=Def.DISP_H) {
                // pyon_time = 0;
                scene.set(Scene.GAMEOVER);
            }

        }
        else
        if( scene.is(Scene.GAMEOVER)) {
            console.log("Scene.GAMEOVER");

            moveCloudEnemy();

            if( playY < Def.DISP_H) {
                playVY -= 2;
                playY -= mathFloor(playVY/2);
            }
        }

        playTime++;
        scene.counting();

        isDraw = true;
        repeatProc();
    }

    function mathFloor(num:number):number {
        return p.floor(num);
    }


    /**
      * 画面を単色で描画してクリアする
      * 色を引数で渡せるとベスト
      */
    function drawClear() {
        p.fill(0, 0, 0);
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


        let rgbi = (enemyAppearNum/170);
        if( Def.BG_COLOR_RGBs.length - 12 < rgbi ) {
            rgbi = Def.BG_COLOR_RGBs.length - 12;
        }
        
        // 背景スクロール中
        for(i=0;i<12;i++) {
            rgbs = Def.BG_COLOR_RGBs[mathFloor(i+rgbi)];
            p.fill(rgbs[0],rgbs[1],rgbs[2]);
            p.rect(0, 220-(i*20), Def.DISP_W, 20);
        }


        if(    (enemyAppearNum >= Def.AIR_LV_1 && enemyAppearNum < Def.AIR_LV_3)
        ||    enemyAppearNum >= Def.AIR_LV_4)    //大気圏-宇宙
        {
            for(i=0;i<Def.STAR_MAX;i++)//星
            {
                // g.setColor(Graphics.getColorOfRGB(252,231,134));
                // g.fillRect(starX[i],starY[i],2,2);
            }
        }

        if( enemyAppearNum <= Def.AIR_LV_2 || enemyAppearNum >= Def.AIR_LV_3 )
        {
            // 青空-大気圏
            for(i=0;i<Def.CLOUD_MAX;i++)// 雲
            {
                // 奥の雲なら出す
                // if(cloudZ[i] == 0)
                //     g.drawImage(getImage(IMAGE.CLOUD),cloudX[i], cloudY[i]);
            }

        }

        // 地面の描画
        i = playH + 210;
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
            enemies[i].draw(img, isDebugRect);
        }
    }
};

new p5(sketch);
