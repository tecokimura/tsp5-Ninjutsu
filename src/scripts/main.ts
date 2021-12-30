import p5 from "p5";
import {Def} from "./def";
import {Scene} from "./scene";
import {Img} from "./img";


let scene = null;
let isDraw = false;
let img = null;
let isDebug = true;

const sketch = (p: p5) => {

    let count:number = 0;

    p.setup = () => {
        p.createCanvas(240, 240);

        scene = new Scene();

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

                // とりあえず適当背景を描画する
                p.fill(128,255,128);
                p.rect(0, 215, Def.DISP_H, 25);

                drawReadyNinjutsu(scene.count());

            }
            else
            if( scene.is(Scene.PLAY)) {
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
};

new p5(sketch);
