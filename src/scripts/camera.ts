import {Def} from "./def";
import {Util} from "./util";

export class Camera {

    static high = 0;
    static width = 0;
    static height = 0;
    static isStop = false;

    /**
     * @constructor
     */
    constructor() {
    };

    // データをクリアする
    static init() {
        Camera.high  = 0;
        Camera.width = Def.DISP_W;
        Camera.height= Def.DISP_H;
    };

    static getWidth() :number { return Camera.width; }
    static getWidthCenter() :number { return Util.mathFloor(Camera.width/2); } 
    static getHeight() :number { return Camera.height; }
    static getHeightCenter() :number { return Util.mathFloor(Camera.height/2); }

}
