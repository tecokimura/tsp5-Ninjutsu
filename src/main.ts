import p5 from "p5";
import {Def} from "./def";
import {Scene} from "./scene";

let scene = null;
let isDraw = false;

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(480, 480);

        scene = new Scene();

        proc();
    };

    p.preload = () => {
        // 画像読み込み予定
    };

    p.draw = () => {
        if( isDraw ) {
            if( scene.is(Scene.INIT)) {
                p.background(220);
                p.ellipse(50, 50, 280, 280);
            }
            else
            if( scene.is(Scene.LOADING)) {
                p.background(20);
                p.ellipse(150, 150, 80, 80);
            }

            console.log("in draw");
        }
    };

    function repeatProc(time:number=100) {
        setTimeout(() => { proc(); }, time);
    };

    function proc() {
        isDraw = false;
        console.log("in proc");

        if( scene.is(Scene.INIT) ) {
            console.log("Scene.INIT");
            if(scene.frame > 10) {
                scene.set(Scene.LOADING);
            }
        }
        else
        if( scene.is(Scene.LOADING) ) {
            console.log("Scene.LOADING");

        }

        scene.count();

        isDraw = true;
        repeatProc();
    };
};

new p5(sketch);
