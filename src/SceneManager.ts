
/**
 * シーンを管理するためのクラス
 */
 export class SceneManager {
    NONE = -1;
    scene:number[] = [this.NONE];
    activeScene:number = this.NONE;
    startTime:number = 0;
    frame:number = 0;

    // 変数に関数を入れる方法を調べる

    /**
     * @constructor
     */
    constructor() {
        this.init();
    };

    init() {
        this.scene = [];
        this.activeScene = null;
        this.startTime = 0;
        /**
         * 現在のシーンがアクティブになってからのシーンの実行回数（カウンタ）
         * @type {number}
         */
        this.frame = null;
    };

    /**
     * シーンを追加する
     * @param {string} name - シーンの名前
     * @param {function} updateFunction - シーン中の処理
     */
    add(name, updateFunction){
        this.scene[name] = updateFunction;
    }

    /**
     * アクティブなシーンを設定する
     * @param {string} name - アクティブにするシーンの名前
     */
    use(name){
        // 指定されたシーンが存在するか確認する
        if(this.scene.hasOwnProperty(name) !== true){
            // 存在しなかった場合はなにもせず終了する
            return;
        }
        // 名前をもとにアクティブなシーンを設定する
        this.activeScene = this.scene[name];
        // シーンをアクティブにした瞬間のタイムスタンプを設定する
        this.startTime = Date.now();
        // シーンをアクティブにしたのでカウンタをリセットする
        this.frame = -1;
    }

    /**
     * シーンを更新する
     */
    update(){
        // シーンがアクティブになってからの経過時間（秒）
        let activeTime = (Date.now() - this.startTime) / 1000;
        // 経過時間を引数に与えて updateFunction を呼び出す
        // TODO:TypeScript で関数に値を入れる方法を調べる
        // this.activeScene(activeTime);
        // シーンを更新したのでカウンタをインクリメントする
        ++this.frame;
    }
}

