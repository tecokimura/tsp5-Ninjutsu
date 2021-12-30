
/**
 * シーンを管理するためのクラス
 */
 export class Scene {
    static readonly NONE :number = -1;
    static readonly INIT :number = 0;
    static readonly LOADING :number = 1;
    static readonly TITLE :number = 2;
    static readonly READY :number = 3;
    static readonly PLAY :number = 4;
    static readonly GAMEOVER :number = 5;
    static readonly MENU :number = 6;

    history :number[] = [Scene.NONE];
    frame :number = 0;
    present :number = Scene.NONE;

    /**
     * @constructor
     */
    constructor() {
        this.clear(Scene.INIT);
    };

    // データをクリアする
    clear(next:number) {
        this.history = [];
        this.frame = 0;
        this.present = next;
    };

    // シーンを切り替える
    set(next :number) {
        // PUSH/POPできるのか調べる
        // this.history = 
        this.present = next;
        this.frame = 0;
    }

    // 現在のSceneを調べる
    is(check :number) {
        return (this.present == check);
    }

    // 
    count():number {
        return this.frame;
    }
    counting(num:number=1) {
        this.frame += num;
    }
}

