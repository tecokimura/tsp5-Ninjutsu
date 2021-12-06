import p5 from "p5";
import　{Def} from "./def";
import {SceneManager} from "./SceneManager";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(480, 480);
    
    // 定期的に実行する
    repeatProc();
  };

  p.preload = () => {
      
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
  };

  function repeatProc(time:number=10000) {
    setTimeout(() => { proc(); }, time);
  };

  function proc() {
      console.log("in proc");
      repeatProc();
    };
};

new p5(sketch);
