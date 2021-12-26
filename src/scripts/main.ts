import p5 from "p5";
import {Def} from "./def";
import {Scene} from "./scene";
import {Img} from "./img";


let scene = null;
let isDraw = false;
let img = null;

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

                img.drawImage( Img.NINJA_JUTSU_BASE,  0,0);
                img.drawImage( Img.NINJA_JUTSU_GU,    24,0);
                img.drawImage( Img.NINJA_JUTSU_CHOKI, 48,0);
                img.drawImage( Img.NINJA_JUTSU_PA,    72,0);
                drawReadyNinjutsu(scene.frame);


            }
            else
            if( scene.is(Scene.PLAY)) {
            }

            // for DEBUG
            if(true) {
                p.fill(255,0,0);
                p.textSize(14);
                p.text('F:'+scene.frame , 5 ,15);
            }

            // console.log("in draw");
        }
    };

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
        if(c < 35) {
            img.drawImage( Img.NINJA_JUTSU_PA, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        else
        if(c < 40) {
            img.drawImage( Img.NINJA_JUTSU_BASE, Def.R_NINJA_POS_X, Def.R_NINJA_POS_Y );
        }
        //ランダムで2回ぐらいなにか表示する
    }

    p.keyIsDown = (code: number):boolean => {
        return false;
    }

    function repeatProc(time:number=100) {
        setTimeout(() => { proc(); }, time);
    };

    function proc() {
        isDraw = false;
        // console.log("in proc");

        if( scene.is(Scene.INIT) ) {
            console.log("Scene.INIT");
            if(scene.frame > 10) {
                scene.set(Scene.LOADING);
            }
        }
        else
        if( scene.is(Scene.LOADING) ) {
            console.log("Scene.LOADING");

            // TODO: 画像読み込みが完了しているかチェックする
            if(true) {
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
        }
        else
        if( scene.is(Scene.PLAY)) {
        }

        scene.count();

        isDraw = true;
        repeatProc();
    };
};

new p5(sketch);
