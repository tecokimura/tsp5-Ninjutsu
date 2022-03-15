import p5 from "p5";
import {Def} from "./def";
import {Scene} from "./scene";
import {Img} from "./img";


let scene = null;
let isDraw = false;
let img = null;
let isDebug = true;

const sketch = (p: p5) => {

    // Player(Ninja) data
    let playX:number = Def.PLAY_INIT_POS_X; // X位置
    let playY:number = Def.PLAY_INIT_POS_Y; // y位置
    let playVY:number = 0;  // 上昇速度
    let playH:number = 0; // 高さ
    let playTime:number = 0; // 経過時間

    // TODO:クラス化する優先度低め
    let enemyX: Array<number>   = new Array(Def.ENEMY_MAX);
    let enemyY: Array<number>   = new Array(Def.ENEMY_MAX);
    let enemyImg: Array<number> = new Array(Def.ENEMY_MAX);
    let enemyTime: Array<number>= new Array(Def.ENEMY_MAX);
    let enemySp: Array<number>  = new Array(Def.ENEMY_MAX);
    let enemyAppearNum = 0;

    let enemyImgArea= Def.AREA_BIRD; // 敵の絵の範囲
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
    function isPushKey() {
        let is = (keyCodeHistory[0] != Def.P5_KEYCODE_NONE);
        if(is) console.log("isPushKey:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }

    // キーが今のフレームで押されたかを調べる
    // 履歴の前が押していなくて今が押していればtrue
    function isPushKeyNow() {
        let is = (keyCodeHistory[0] != Def.P5_KEYCODE_NONE
               && keyCodeHistory[1] == Def.P5_KEYCODE_NONE);
        if(is) console.log("isPushKeyNow:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }
    
    function isReleaseKeyNow() {
        let is = (keyCodeHistory[0] == Def.P5_KEYCODE_NONE
               && keyCodeHistory[1] != Def.P5_KEYCODE_NONE);
        if(is) console.log("isReleaseKeyNow:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }

    // p5 の初期設定
    p.setup = () => {
        p.createCanvas(240, 240);
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
        console.log("keyPressed:"+p.keyCode);
        keyCodePre = p.keyCode;
    }

    // 
    p.keyReleased = () => {
        console.log("keyReleased:"+p.keyCode);
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

                // sample for test
                p.image( img.getImage(Img.ENEMY_UFO), 0, 100);
                // draw test
                p.image( img.getImage(Img.ENEMY_UFO),  50, 100, 48, 24, 0, 0, 48, 24);

                // 左右反転
                p.push();
                p.translate(240, 0);
                p.scale(-1, 1);
                p.image( img.getImage(Img.ENEMY_UFO), 0, 0, 48, 24, 0, 0, 48, 24);
                p.pop();

                // TODO: 調整中
                p.image( img.getImage(Img.ENEMY_UFO), 70, 30, 48, 24, 0, 0, 48, 24);
                // p.push();
                // p.translate(70+24, 50);
                // p.scale(-1, 1);
                // p.image( img.getImage(Img.ENEMY_UFO), -24, 0, 48, 24, 0, 0, 48, 24);
                // p.pop();
                img.drawImageFlipH( Img.ENEMY_UFO, 70, 50);

                p.image( img.getImage(Img.ENEMY_UFO), 100, 150, 24, 24, 0, 0, 48, 24);
                p.image( img.getImage(Img.ENEMY_UFO), 200, 100, -48, 24, 0, 0, 48, 24);

                // TEST DRAW
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
                
                
            }

            // for DEBUG
            if( isDebug ) {
                drawDebugInfo(p);
            }

            // console.log("in draw");
        }
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
                        starY[i] = -40-(getRandInt()>>>1)%120;
                        starX[i] = (getRandInt()>>>1)%240;
                        break;
                    }
                }

                // 雲出現
                for(let i=0; i<Def.CLOUD_MAX; i++) {
                    if( cloudY[i] == Def.DATA_NONE
                    &&  (enemyAppearNum <= Def.AIR_LV_1 || Def.AIR_LV_3 <= enemyAppearNum) ) {
                        cloudY[i]  = -40-(getRandInt()>>>1)%20;
                        cloudX[i]  = (getRandInt()>>>1)%240;
                        cloudZ[i]  = (getRandInt()>>>1)%2;
                        cloudSp[i] = (getRandInt()>>>1)%2+1;

                        if( ((getRandInt()>>>1)%2) == 0)
                            cloudSp[i] *= -1;

                        break;
                    }
                }

                // 敵出現
                for(let i=0; i<Def.ENEMY_MAX; i++) {
                    if( enemyY[i] == Def.DATA_NONE ) {
                        if( enemyAppearNum < Def.AIR_LV_0 ) {
                            // 鳥エリア
                            // 速度 1-3
                            // オプション 雲
                            enemyAppearNum += 80;
                            enemyY[i]   = -40-(getRandInt()>>>1)%10;
                            enemyX[i]   = (getRandInt()>>>1)%240;

                            enemyImg[i] = Def.AREA_BIRD;

                            enemyTime[i]= 0;
                            enemySp[i]  = ((getRandInt()>>>1)% 3 )+1;

                            if( (getRandInt()>>>1)%2 == 0 )
                                enemySp[i] *= -1;
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_1 ) {
                            // KUNAI エリア
                            // 速度2-4
                            // オプション 雲
                            enemyAppearNum    += 40;
                            enemyY[i]      = -40-(getRandInt()>>>1)%10;
                            enemyX[i]     = (getRandInt()>>>1)%240;
                            enemyImg[i]    = Def.AREA_KUNAI;
                            enemyTime[i]= 0;
                            enemySp[i]    = ((getRandInt()>>>1)%3)+2;
                            if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_2 )
                        {
                            // Shuri エリア
                            // 速度 3-5
                            // オプション 星
                            enemyAppearNum += 20;
                            enemyY[i]   = -40-(getRandInt()>>>1)%10;
                            enemyX[i]   = (getRandInt()>>>1)%240;
                            enemyImg[i] = Def.AREA_SHURI;
                            enemyTime[i]= 0;
                            enemySp[i]  = ((getRandInt()>>>1)%3)+3;
                            if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_3 )
                        {
                            //    SHINOBI
                            //    速度 1-4
                            //    オプション なし
                            enemyAppearNum    += 30;
                            enemyY[i]      = -40-(getRandInt()>>>1)%10;
                            enemyX[i]     = (getRandInt()>>>1)%240;
                            enemyImg[i]    = Def.AREA_SHINOBI;
                            enemyTime[i]    = 0;
                            enemySp[i]    = ((getRandInt()>>>1)%4)+1;
                            if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_4 )
                        {
                            //    UFO
                            //    速度 1-2
                            //    オプション 雲
                            enemyAppearNum += 20;
                            enemyY[i]   = -40-(getRandInt()>>>1)%10;    //敵
                            enemyX[i]   = (getRandInt()>>>1)%240;
                            enemyImg[i] = Def.AREA_UFO;
                            enemyTime[i] = 0;
                            enemySp[i] = ((getRandInt()>>>1)%2)+1;
                            if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }
                        else
                        {
                            //    最後だよ!!全員集合
                            //    速度 1-5
                            //    オプション 雲・星
                            enemyAppearNum    += 20;
                            enemyY[i]      = -40-(getRandInt()>>>1)%10;    //敵
                            enemyX[i]     = (getRandInt()>>>1)%240;
                            enemyImg[i]    = (getRandInt()>>>1)%Def.AREA_ALL;
                            enemyTime[i]    = 0;
                            enemySp[i]    = ((getRandInt()>>>1)%Def.ENEMY_MAX_SPEED)+1;
                            if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
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

        for(let i=0;i<Def.ENEMY_MAX;i++) {
            if(enemyY[i] > Def.DATA_NONE) {
                enemyX[i] += enemySp[i];
                if( enemyX[i] <= (0-48) || 240 <= enemyX[i])
                    enemySp[i] *= -1;
            }
        }
    }


    /**
     * 整数の乱数を取得する
     * 100はなんとなく
     * https://p5js.org/reference/#/p5/random
     */
    function getRandInt():number {
        return p.round(p.random(100));
    }

    function init() {
        let i=0;

        playY = Def.PLAY_INIT_POS_Y;
        playVY= 0;
        playH = 0;
        enemyAppearNum = 0;

        for(let i=0;i<Def.ENEMY_MAX;i++) enemyY[i] = Def.DATA_NONE;
        for(let i=0;i<Def.STAR_MAX;    i++) starY[i]  = Def.DATA_NONE;
        for(let i=0;i<Def.CLOUD_MAX;i++) cloudY[i] = Def.DATA_NONE;

        keyCodePre = Def.P5_KEYCODE_NONE;
        for(i=0;i<keyCodeHistory.length;i++) {
            keyCodeHistory[i] = Def.P5_KEYCODE_NONE;
        }
    }

    function proc() {
        isDraw = false;
        // console.log("in proc");

        // KEY_CODE を更新する
        for(let i=0;i<keyCodeHistory.length-1;i++) {
            keyCodeHistory[i+1] = keyCodeHistory[i];
        }

        if(p.keyIsPressed === true) {
            keyCodePre = Def.P5_KEYCODE_ENTER;
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
            if( p.keyIsPressed === true) {
                scene.set(Scene.READY);
            }
        }
        else
        if( scene.is(Scene.READY)) {
            if(scene.count() > 60) {
                scene.set(Scene.PLAY);
            }
        }
        else
        if( scene.is(Scene.PLAY)) {

            moveCloudEnemy();

            // キーを押しているかどうか
            if( isPushKey() && playH > 64) is_playkey_push = true;
            if( isPushKey() == false && playH > 64) is_playkey_push = false;
           
            // ボタンを押していたら上昇速度を下げる
            if( is_playkey_push ) {
                playVY--;
            }
            
            // ボタンを押していない && MAXスピードではなければ
            if(is_playkey_push == false && playVY < Def.PLAY_MAX_VY ) {
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

                // 敵が存在するのなら
                for(let j=0;j<Def.ENEMY_MAX;j++) {
                    if(enemyY[j] != Def.DATA_NONE) {
                        enemyY[j]+=i;
                        if(enemyY[j]>260) enemyY[j]=Def.DATA_NONE;
                    }
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
            if(playY>=240) {
                // pyon_time = 0;
                scene.set(Scene.GAMEOVER);
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
     */
    function drawEnemy() {
        for(let i=0;i<Def.ENEMY_MAX;i++) {
            if(Def.DATA_NONE < enemyY[i]) {
                if( enemyImg[i] == Def.AREA_BIRD) {
                    img.drawImage(Img.ENEMY_BIRD,enemyX[i],enemyY[i]);
                }
                else
                if( enemyImg[i] == Def.AREA_KUNAI) {
                    img.drawImage(Img.ENEMY_KUNAI,enemyX[i],enemyY[i]);
                }
                else
                if( enemyImg[i] == Def.AREA_SHURI) {
                    img.drawImage(Img.ENEMY_SHURIKEN,enemyX[i],enemyY[i]);
                }
                else
                if( enemyImg[i] == Def.AREA_SHINOBI) {
                    img.drawImage(Img.ENEMY_SHINOBI,enemyX[i],enemyY[i]);
                }
                else
                if( enemyImg[i] == Def.AREA_UFO) {
                    img.drawImage(Img.ENEMY_UFO,enemyX[i],enemyY[i]);
                }
                else
                if( enemyImg[i] == Def.AREA_UFO) {
                    img.drawImage(Img.ENEMY_BIRD1,enemyX[i],enemyY[i]);
                }

                // 敵の描画
                // if(enemyImg[i] != Def.AREA_UFO)) {
                //     if(enemySp[i] < 0) {
                //         if( enemyTime[i] % enemyAnim[enemyImg[i]] < (enemyAnim[enemyImg[i]]>>1) ) {
                //             img.drawImage(img[(enemyGra[i]*4)+get(IMAGE.BIRD_L_1)],enemyX[i],enemyY[i]);
                //         } else {
                //             img.drawImage(img[(enemyGra[i]*4)+get(IMAGE.BIRD_L_0)],enemyX[i],enemyY[i]);
                //         }
                //     } else {
                //         if( enemyTime[i] % enemyAnim[enemyImg[i]] < (enemyAnim[enemyImg[i]]>>1) ) {
                //             img.drawImage(img[(enemyGra[i]*4)+get(IMAGE.BIRD_R_1)],enemyX[i],enemyY[i]);
                //         } else {
                //             img.drawImage(img[(enemyGra[i]*4)+get(IMAGE.BIRD_R_0)],enemyX[i],enemyY[i]);
                //         }
                //     }
                // } else {
                //     if( enemyTim[i] % enemyAnim[enemyGra[i]] < (enemyAnim[enemyGra[i]]>>1) ) {
                //         img.drawImage(getImage(IMAGE.UFO_1),enemyX[i],enemyY[i]);
                //     } else {
                //         img.drawImage(getImage(IMAGE.UFO_0),enemyX[i],enemyY[i]);
                //     }
                // }
            }
        }
    }
};

new p5(sketch);
