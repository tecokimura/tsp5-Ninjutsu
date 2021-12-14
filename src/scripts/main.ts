import p5 from "p5";
import {Def} from "./def";
import {Scene} from "./scene";
import {Img} from "./img";

//@ts-ignore
import IMG_PNGS from "../images/*.png";

let scene = null;
let isDraw = false;
let img = null;

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(480, 480);

        scene = new Scene();

        proc();
    };

    p.preload = () => {
        // 画像読み込み予定 sample
        img = p.loadImage(IMG_PNGS["ninja-stand"]);
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

                p.image(img,0,0);
            }

            console.log("in draw");
        }
    };

    p.keyIsDown = (code: number):boolean => {
        return false;
    }

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

            // キーが押されているかを調べる
            if( p.keyIsPressed === true) {
                console.log("keyIsPressed");
            }
        }

        scene.count();

        isDraw = true;
        repeatProc();
    };
};

new p5(sketch);
