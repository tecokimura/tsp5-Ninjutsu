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
    let playX:number = Def.PLAY_INIT_POS_X;
    let playY:number = Def.PLAY_INIT_POS_Y;
    let playVY:number = 0;
    let playH:number = 0;
    let playTime:number = 0;

    // TODO:クラス化する
	let enemyX: Array<number>   = new Array(Def.ENEMY_MAX);
	let enemyY: Array<number>   = new Array(Def.ENEMY_MAX);
	let enemyImg: Array<number> = new Array(Def.ENEMY_MAX);
	let enemyTime: Array<number>= new Array(Def.ENEMY_MAX);
	let enemySp: Array<number>  = new Array(Def.ENEMY_MAX);
	let enemyAppearNum = 0;

	let enemyImgArea= Def.AREA_BIRD; // 敵の絵の範囲
	let enemySpArea = Def.SPEED_SP1; // 敵のスピードの範囲

	// 星
	let starX: Array<number> = new Array(Def.STAR_MAX);	// 星x座標
    let starY: Array<number> = new Array(Def.STAR_MAX);	// 星y座標

    let cloudX: Array<number>  = new Array(Def.CLOUD_MAX);	// 星x座標
    let cloudY: Array<number>  = new Array(Def.CLOUD_MAX);	// 星y座標
    let cloudZ: Array<number>  = new Array(Def.CLOUD_MAX);	// 星y座標
    let cloudSp: Array<number> = new Array(Def.CLOUD_MAX);	// 星y座標

    let keyCodePre = Def.P5_KEYCODE_NONE;
    let keyCodeHistory: Array<number> = new Array(5);
    let is_playkey_push = false;

    // p5のキーコードと変数を見て調べる
	function isPushKey() {
        let is = (keyCodeHistory[0] != Def.P5_KEYCODE_NONE);
        if(is) console.log("isPushKey:0="+keyCodeHistory[0]+",1="+keyCodeHistory[1]);
        return is;
    }

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

    p.setup = () => {
        p.createCanvas(240, 240);

        scene = new Scene();

        init();
        proc();
    };

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
        keyCodePre= Def.P5_KEYCODE_NONE;
    }

    p.draw = () => {
        if( isDraw ) {
            if( scene.is(Scene.INIT)) {
                p.fill(0,0,0);
                p.rect(0, 0, Def.DISP_W, Def.DISP_H);
            }
            else
            if( scene.is(Scene.LOADING)) {
                p.fill(0,0,0);
                p.rect(0, 0, Def.DISP_W, Def.DISP_H);
            }
            else
            if( scene.is(Scene.TITLE)) {
                p.fill(255,255,255);
                p.rect(0, 0, Def.DISP_W, Def.DISP_H);

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
                // Clear
                p.fill(20,20,20);
                p.rect(0, 0, Def.DISP_W, Def.DISP_H);

                drawBg();

                // とりあえず適当背景を描画する
                p.fill(128,255,128);
                p.rect(0, 215, Def.DISP_H, 25);

                drawReadyNinjutsu(scene.count());

            }
            else
            if( scene.is(Scene.PLAY)) {
                drawBg();
                // drawEnemy();
                //
                if(is_playkey_push) {
                    if(isPushKeyNow()) {
                        img.drawImage(Img.NINJA_DOWN, playX, playY);
                    } else {
                        img.drawImage(Img.NINJA_DOWN2, playX, playY);
                    }
                } else {
                    if(isReleaseKeyNow()) {
                        img.drawImage(Img.NINJA_DOWN, playX, playY);
                    } else {
                        let i = mathFloor((playTime % 20)/5)% Def.NINJA_FLY_ANIM.length;
                        img.drawImage(Def.NINJA_FLY_ANIM[i], playX, playY);
                    }
                }
                
                
            }

            // for DEBUG
            if( isDebug ) {
                drawDebugInfo(p);
            }

            // console.log("in draw");
        }
    }

    // Debug画面表示{
    function drawDebugInfo(p) {
        let x = 5;
        let y = 0;
        let addy = 12;
        p.fill(255,0,0);
        p.textSize(y+=addy);
        p.text('S:'+scene.present , x ,y+=addy);
        p.text('F:'+scene.count() , x ,y+=addy);
        p.text('PX:'+playX , x ,y+=addy);
        p.text('PY:'+playY , x ,y+=addy);
        p.text('PV:'+playVY, x ,y+=addy);
        p.text('PH:'+playH , x ,y+=addy);
    }

    // Ready の時のアニメーション
    // TODO: アニメーションロジック見直し
    // アニメーション定義をして配列かに別定義する
    // procでカウントを判定して次のPLAYに移行させる
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
            if( playH >= Def.FIRST_ENEMY_POS ) {
                // 星出現
                for(let i=0; i<Def.STAR_MAX; i++) {
                    if( starY[i] == -99 && Def.AIR_LV_1 <= enemyAppearNum) {
                        starY[i] = -40-(getRandInt()>>>1)%120;
                        starX[i] = (getRandInt()>>>1)%240;
                        break;
                    }
                }

                // 雲出現
                for(let i=0; i<Def.CLOUD_MAX; i++) {
                    if( cloudY[i] == -99
                    &&  (enemyAppearNum <= Def.AIR_LV_1 || Def.AIR_LV_3 <= enemyAppearNum) ) {
                        cloudY[i]   = -40-(getRandInt()>>>1)%20;
                        cloudX[i]   = (getRandInt()>>>1)%240;
                        cloudZ[i]   = (getRandInt()>>>1)%2;
                        cloudSp[i]  = (getRandInt()>>>1)%2+1;

                        if( ((getRandInt()>>>1)%2) == 0)
                            cloudSp[i] *= -1;

                        break;
                    }
                }

                // 敵出現
                for(let i=0; i<Def.ENEMY_MAX; i++) {
                    if( enemyY[i] == -99 ) {
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
                        	//	ヘリコプターエリア
                        	//	速度2-4
                        	//	オプション 雲
                            enemyAppearNum	+= 40;
                            enemyY[i]  	= -40-(getRandInt()>>>1)%10;	//敵
	                        enemyX[i] 	= (getRandInt()>>>1)%240;
	                        enemyImg[i]	= Def.AREA_HELI;
	                        enemyTime[i]= 0;
	                        enemySp[i]	= ((getRandInt()>>>1)%3)+2;
	                        if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_2 )
                        {
	                        //	UFOエリア
                        	//	速度 3-5
                        	//	オプション 星
							enemyAppearNum += 20;
							enemyY[i]   = -40-(getRandInt()>>>1)%10;	//敵
	                        enemyX[i]   = (getRandInt()>>>1)%240;
							enemyImg[i] = Def.AREA_UFO;
	                        enemyTime[i]= 0;
	                        enemySp[i]  = ((getRandInt()>>>1)%3)+3;
	                        if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_3 )
                        {
                        	//	星エリア
                        	//	速度 1-4
                        	//	オプション なし
                            enemyAppearNum	+= 30;
                            enemyY[i]  	= -40-(getRandInt()>>>1)%10;	//敵
	                        enemyX[i] 	= (getRandInt()>>>1)%240;
	                        enemyImg[i]	= Def.AREA_STAR;
	                        enemyTime[i]	= 0;
	                        enemySp[i]	= ((getRandInt()>>>1)%4)+1;
	                        if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }
                        else
                        if( enemyAppearNum < Def.AIR_LV_4 )
                        {
                        	//	天使エリア
                        	//	速度 1-2
                        	//	オプション 雲
                        	enemyAppearNum += 20;
							enemyY[i]   = -40-(getRandInt()>>>1)%10;	//敵
	                        enemyX[i]   = (getRandInt()>>>1)%240;
							enemyImg[i] = Def.AREA_ANGEL;
	                        enemyTime[i] = 0;
	                        enemySp[i] = ((getRandInt()>>>1)%2)+1;
	                        if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }
                        else
                        {
                        	//	最後だよ!!全員集合
                        	//	速度 1-5
                        	//	オプション 雲・星
                            enemyAppearNum	+= 20;
                            enemyY[i]  	= -40-(getRandInt()>>>1)%10;	//敵
	                        enemyX[i] 	= (getRandInt()>>>1)%240;
							enemyImg[i]	= (getRandInt()>>>1)%Def.AREA_ALL;
	                        enemyTime[i]	= 0;
	                        enemySp[i]	= ((getRandInt()>>>1)%Def.ENEMY_MAX_SPEED)+1;
	                        if( (getRandInt()>>>1)%2 == 0 )enemySp[i] *= -1;
                        }

                       	break;
                    }
				}
			}
			else
			{
				// 敵がたまらないようにリセット
				enemyAppearNum = playH + 80;
			}
        }
	}


    function getRandInt():number {
        return 1;
    }

    function init() {
        playY = Def.PLAY_INIT_POS_Y;
        playVY= 0;
        playH = 0;
        enemyAppearNum = 0;

        keyCodePre = Def.P5_KEYCODE_NONE;
        for(let i=0;i<keyCodeHistory.length;i++) {
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
            if( true || p.keyIsPressed === true) {
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
            // キーを押しているかどうか
            if( isPushKey() && playH > 64) is_playkey_push = true;
            if( isPushKey() == false && playH > 64) is_playkey_push = false;
           
            // ボタンを押していたら上昇速度を上げる
            if( is_playkey_push ) {
                playVY++;
            }
            
            if(is_playkey_push == false && playVY > -40) {
                // TODO: why?
                playVY--;
            }

            // 上昇しすぎないように調整する
            if(playH < 100) {
                playY += -4;
                playVY = -8;
            } else {
                playY += playVY/2;
            }

            
            // 風船がまだ画面の中にある場合
            let i = 150 - playY;
            if( 0 < i) {

                // カウンターストップ
                if(playH+i < 99999) {
                    playH+=i;
                } else {
                    playH = 99999;
                }

                // 敵が存在するのなら
                for(let j=0;j<Def.ENEMY_MAX;j++) {
                    if(enemyY[j] != -99) {
                        enemyY[j]+=i;
                        if(enemyY[j]>260) enemyY[j]=-99;
                    }
                }

                //
                for(let j=0;j<Def.STAR_MAX;j++) {
                    // 星が存在するのなら
                    if(starY[j] != -99) {

                        if( (starX[j]&1)==1 ) {
                            // Xが奇数なら普通に落ちる
                            starY[j]+=i;
                        } else {
                            // Xが偶数の場合は1.5倍で流れる
                            starY[j]+=i+(i/2);
                        }

                        if(starY[j]>260) starY[j]=-99;
                    }
                }

                for(let j=0;j<Def.CLOUD_MAX;j++) {
                    // 雲が存在するのなら
                    if(cloudY[j] != -99) {

                        if( (cloudX[j]&1)==1 ) {
                            // Xが奇数なら普通に落ちる
                            cloudY[j]+=i;
                        } else {
                            // Xが偶数の場合は1.5倍で流れる
                            cloudY[j]+=i+(i/2);
                        }

                        if(cloudY[j]>260) cloudY[j]=-99;

                    }
                }

                playY=150;
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
     * プログラムによるグラデーションの描画
     */
    function drawBg() {
        let i;
        let rgbs;
        p.noStroke();
        if( enemyAppearNum < Def.BACK_SCR_STOP ) {
            // 背景スクロール中
            for(i=0;i<12;i++) {
                rgbs = Def.BG_COLOR_RGBs[mathFloor(i+(enemyAppearNum/170))];
                p.fill(rgbs[0],rgbs[1],rgbs[2]);
                p.rect(0, 220-(i*20), Def.DISP_W, 20);
            }
        } else {
            // 背景スクロール停止後
            for(i=0;i<12;i++) {
                rgbs = Def.BG_COLOR_RGBs[mathFloor(i+(Def.BACK_SCR_STOP/170))];
                p.fill(rgbs[0],rgbs[1],rgbs[2]);
                p.rect(0, 220-(i*20), Def.DISP_W, 20);
			}
		}

		if(	(enemyAppearNum >= Def.AIR_LV_1 && enemyAppearNum < Def.AIR_LV_3)
		||	enemyAppearNum >= Def.AIR_LV_4)	//大気圏-宇宙
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
    }
};

new p5(sketch);
