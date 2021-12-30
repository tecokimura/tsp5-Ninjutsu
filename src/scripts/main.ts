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

    let eneAppear = 0;
    let count:number = 0;

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

    p.keyIsDown = (code: number):boolean => {
        return false;
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
            }

            // for DEBUG
            if( isDebug ) {
                drawDebugInfo(p);
            }

            // console.log("in draw");
        }
    };

    // Debug画面表示{
    function drawDebugInfo(p) {
        let x = 5;
        let y = 0;
        let addy = 12;
        p.fill(255,0,0);
        p.textSize(y+=addy);
        p.text('S:'+scene.present , x ,y+=addy);
        p.text('F:'+scene.count() , x ,y+=addy);
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

    function init() {
        playY = Def.PLAY_INIT_POS_Y;
        playVY= 0;
        playH = 0;
        eneAppear = 0;
    }

    function proc() {
        isDraw = false;
        // console.log("in proc");

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
            if(scene.count() > 70) {
                scene.set(Scene.PLAY);
            }
        }
        else
        if( scene.is(Scene.PLAY)) {
        }

        scene.counting();

        isDraw = true;
        repeatProc();
    };


    /**
     * プログラムによるグラデーションの描画
     */
    function drawBg() {
        let i;
        let rgbs;
        if( eneAppear < Def.BACK_SCR_STOP ) {
            // 背景スクロール中
            for(i=0;i<12;i++) {
                rgbs = Def.BG_COLOR_RGBs[i+(eneAppear/170)];
                p.fill(rgbs[0],rgbs[1],rgbs[2]);
                p.rect(0, 220-(i*20), Def.DISP_W, 20);
            }
        } else {
			// 背景スクロール停止後
			for(i=0;i<12;i++) {
                rgbs = Def.BG_COLOR_RGBs[i+(BACK_SCR_STOP/170)];
                p.fill(rgbs[0],rgbs[1],rgbs[2]);
                p.rect(0, 220-(i*20), Def.DISP_W, 20);
			}
		}

		if(	(eneAppear >= AIR_LV_1
		&&	eneAppear < AIR_LV_3)
		||	eneAppear >= AIR_LV_4)	//大気圏-宇宙
		{
			for(int i=0;i<STAR_MAX;i++)//星
			{
				g.setColor(Graphics.getColorOfRGB(252,231,134));
				g.fillRect(starX[i],starY[i],2,2);
			}
		}

		if(	eneAppear <= AIR_LV_2
		||	eneAppear >= AIR_LV_3 )	// 青空-大気圏
		{
			for(int i=0;i<CLOUD_MAX;i++)// 雲
			{
				// 奥の雲なら出す
				if(cloudZ[i] == 0)
				g.drawImage(getImage(IMAGE.CLOUD),cloudX[i], cloudY[i]);
			}

		}
    }
};

new p5(sketch);
