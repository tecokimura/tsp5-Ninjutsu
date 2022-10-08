/**
 * ステージを管理するためのクラス
 * ステージ内での難しさや表現を設定する。
 * 配列でステージ数を保存しておくか生成するイメージ
 */
export class Stage {
    num = 0;
    isClear = false;
    isScreenColorFilter = false;
    colorFilterR = 0;
    colorFilterG = 0;
    colorFilterB = 0;
    colorFilterA = 0;

    maxPlayerSpX = 0;
    maxPlayerSpY = 0;

    // 出す敵の種類
    // Def.TYPE_ENEMY_XXX
    enemyTypes: number[] = [];

    // 画面に出す演出の種類
    // Def.TYPE_ENEMY_XXX
    bgobjTypes: number[] = [];

    frame: number = 0;

    /**
     * @constructor
     */
    constructor(n: number) {
        this.init();
        this.num = n;
    }

    // データをクリアする
    init() {
        this.num = 1;
        this.frame = 0;
        this.isScreenColorFilter = false;
        this.colorFilterR = 0;
        this.colorFilterG = 0;
        this.colorFilterB = 0;
        this.colorFilterA = 0;
    }

    // ステージ情報にタイプが存在するかチェックする
    isEnemyType(type: number) {
        for (let i = 0; i < this.enemyTypes.length; i++) {
            if (this.enemyTypes[i] == type) {
                return true;
            }
        }

        return false;
    }

    // ステージ情報にタイプが存在するかチェックする
    isBgobjType(type: number) {
        for (let i = 0; i < this.bgobjTypes.length; i++) {
            if (this.bgobjTypes[i] == type) {
                return true;
            }
        }

        return false;
    }

    count(): number {
        return this.frame;
    }

    counting(num: number = 1) {
        this.frame += num;
    }
}
