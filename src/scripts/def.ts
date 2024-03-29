import { Img } from "./img"

// 全部で共通で作成しているのが良くなさそうなので各クラスに分ける
export class Def {
    static HELLO: string = "Hello TSp5 World"
    static DATA_NONE = -999

    static DISP_W: number = 240
    static DISP_H: number = 240

    static ENEMY_MAX: number = 15
    static STAR_MAX: number = 6
    static CLOUD_MAX: number = 20
    static RAIN_MAX: number = 30
    static SNOW_MAX: number = 30
    static ENEMY_MAX_SPEED: number = 5

    static PLAY_INIT_POS_X: number = 120 + 18
    static PLAY_INIT_POS_Y: number = 64 + 12

    static PLAY_MAX_SP_Y: number = 20
    static PLAY_MAX_DRAW_POS_Y: number = 125

    static CAMERA_DISTANCE_PLAYER_Y = 100
    static CAMERA_SP_X = 0
    static CAMERA_SP_Y = 10

    static BACK_SCR_STOP: number = 8300

    static ATARI_W: number = 48

    // 各オブジェクトごと共通で作ってみる
    static ST_NONE = Def.DATA_NONE
    static ST_OVER = -1
    static ST_PLAY = 0

    static AIR_LV_1: number = 500
    static AIR_LV_2: number = 2500
    static AIR_LV_3: number = 3500
    static AIR_LV_4: number = 6000
    static AIR_LV_5: number = 10000
    static AIR_LV_6: number = 15000

    static FIRST_ENEMY_POS: number = 50

    static BIKKURI_POS_X: number = 32
    static BIKKURI_POS_Y: number = 16

    static HIT_BAL_POS_X0: number = 7
    static HIT_BAL_POS_Y0: number = 6
    static HIT_BAL_POS_X1: number = 22
    static HIT_BAL_POS_Y1: number = 21

    static HIT_ENE_POS_X0: number = 19
    static HIT_ENE_POS_Y0: number = 16
    static HIT_ENE_POS_X1: number = 29
    static HIT_ENE_POS_Y1: number = 18

    static TITLE_FILTER_COLOR_R: number = 63
    static TITLE_FILTER_COLOR_G: number = 63
    static TITLE_FILTER_COLOR_B: number = 63
    static TITLE_FILTER_COLOR_A: number = 230

    static T_TITLE_POS_X: number = 20
    static T_TITLE_POS_Y: number = 20
    static T_BAL_POS_X: number = 140
    static T_BAL_POS_Y: number = 15
    static T_HUUSEN_POS_X: number = 120 - 97
    static T_HUUSEN_POS_Y: number = 50
    static T_HUUSEN_KAGE_POS_X: number = 120 - 90
    static T_HUUSEN_KAGE_POS_Y: number = 70

    static T_TITLE_GRA_X: number = 20
    static T_TITLE_GRA_Y: number = 25
    static T_TITLE_GRA_W: number = 195
    static T_TITLE_GRA_H: number = 22

    static T_TITLE_GIRL_POS_X: number = 80 - 15
    static T_TITLE_GIRL_POS_Y: number = 180
    static T_DWANGO_POS_X: number = 70
    static T_DWANGO_POS_Y: number = 205 - 10
    static T_PUSH_KEY_POS_X: number = 40
    static T_PUSH_KEY_POS_Y: number = 180 - 10

    static R_NINJA_POS_X: number = this.DISP_W / 2 + 10
    static R_NINJA_POS_Y: number = this.DISP_H - 90

    static P_EARTH_POS_X: number = 0
    static P_EARTH_POS_Y: number = 228
    static P_RABBIT_POS_X: number = 50 + 2
    static P_RABBIT_POS_Y: number = 240 - 76
    static P_RABBIT_HAND_0_POS_X: number = 102 + 2
    static P_RABBIT_HAND_0_POS_Y: number = 240 - 74
    static P_RABBIT_HAND_1_POS_X: number = 87 + 17 + 2
    static P_RABBIT_HAND_1_POS_Y: number = 240 - 66
    static P_RABBIT_FACE_POS_X: number = 87 - 2 + 2
    static P_RABBIT_FACE_POS_Y: number = 240 - 75
    static P_RABBIT_EYE_POS_X: number = 87 + 7 + 2
    static P_RABBIT_EYE_POS_Y: number = 240 - 59

    static P_HISCORE_POS_X: number = 5
    static P_HISCORE_POS_Y: number = 5
    static P_SCORE_POS_X: number = 5
    static P_SCORE_POS_Y: number = 19

    static P_HISCORE_NUM_POS_X: number = 85
    static P_HISCORE_NUM_POS_Y: number = 5
    static P_SCORE_NUM_POS_X: number = 85
    static P_SCORE_NUM_POS_Y: number = 19

    static P_HISCORE_M_POS_X: number = 129
    static P_HISCORE_M_POS_Y: number = 8
    static P_SCORE_M_POS_X: number = 129
    static P_SCORE_M_POS_Y: number = 22

    static P_GAMEOVER_POS_X: number = (this.DISP_W - 24 * 7) / 2
    static P_GAMEOVER_POS_Y: number = 110

    static P_GAMEOVER_SCORE_POS_X: number = 0
    static P_GAMEOVER_SCORE_POS_Y: number = 20
    static P_GAMEOVER_SCORE_POS_W: number = 240
    static P_GAMEOVER_SCORE_POS_H: number = 10

    // p5 keyCode
    // キーコード定義(p5にありそうだけど見つからなかったので独自に定義する)
    // https://keycode.info/
    static P5_KEY_NONE: number = 0 // Original for No push
    static P5_KEY_ANY: number = 1 // Original for any key
    // ------
    static P5_KEY_ENTER: number = 13
    static P5_KEY_SPACE: number = 32
    static P5_KEY_LEFT: number = 37
    static P5_KEY_UP: number = 38
    static P5_KEY_RIGHT: number = 39
    static P5_KEY_DOWN: number = 40
    static P5_KEY_A: number = 65
    static P5_KEY_G: number = 71
    static P5_KEY_H: number = 72
    static P5_KEY_I: number = 73
    static P5_KEY_O: number = 79
    static P5_KEY_S: number = 83
    static P5_KEY_T: number = 84
    static P5_KEY_X: number = 88
    static P5_KEY_Z: number = 90

    static TYPE_BG_NEAR = 0
    static TYPE_BG_FAR = 1
    static TYPE_BG_ALL = 2

    // enum みたいに定義
    static TYPE_ENEMY_BIRD = 0
    static TYPE_ENEMY_SHURI = 1
    static TYPE_ENEMY_DRONE = 2
    static TYPE_ENEMY_SHINOBI = 3
    static TYPE_ENEMY_UFO = 4
    static TYPE_ENEMY_ALL = 5

    static TYPE_BGOBJ_CLOUD = 0
    static TYPE_BGOBJ_STAR = 1
    static TYPE_BGOBJ_RAIN = 2
    static TYPE_BGOBJ_SNOW = 3
    static TYPE_BGOBJ_ALL = 4

    static SPEED_SP0 = 0
    static SPEED_SP1 = 1
    static SPEED_SP2 = 2
    static SPEED_SP3 = 3
    static SPEED_SP4 = 4
    static SPEED_SP5 = 5

    static NINJA_FLY_ANIM = [
        Img.NINJA_FLY_C,
        Img.NINJA_FLY_R,
        Img.NINJA_FLY_C,
        Img.NINJA_FLY_L,
    ]

    // 画像をいれる余裕がないので直接色を指定
    static BG_COLOR_RGBs = [
        // Lv1
        [0x75, 0xcd, 0xe8],
        [0x73, 0xcb, 0xe8],
        [0x6e, 0xc8, 0xe8],
        [0x6a, 0xc3, 0xe8],
        [0x65, 0xbf, 0xe8],
        [0x5e, 0xb9, 0xe8],
        [0x59, 0xb5, 0xe8],
        [0x54, 0xb0, 0xe8],
        [0x50, 0xab, 0xe8],
        [0x4a, 0xa5, 0xe8],
        [0x45, 0xa1, 0xe8],
        [0x40, 0x9b, 0xe8],

        // Lv2
        [0x3f, 0x98, 0xe8],
        [0x3f, 0x98, 0xe8],
        [0x3f, 0x98, 0xe8],
        [0x3f, 0x98, 0xe8],
        [0x3f, 0x98, 0xe8],
        [0x3f, 0x98, 0xe8],
        [0x3f, 0x98, 0xe8],
        [0x3f, 0x98, 0xe8],
        [0x3f, 0x97, 0xe6],
        [0x3a, 0x8e, 0xd9],
        [0x34, 0x83, 0xc7],

        // Lv3
        [0x25, 0x65, 0x9c],
        [0x1e, 0x57, 0x86],
        [0x18, 0x4a, 0x71],
        [0x12, 0x3f, 0x61],
        [0x0e, 0x35, 0x52],
        [0x0a, 0x2e, 0x45],
        [0x07, 0x28, 0x3a],
        [0x06, 0x23, 0x32],
        [0x04, 0x1f, 0x2b],
        [0x03, 0x1c, 0x26],
        [0x02, 0x1a, 0x1f],
        [0x01, 0x18, 0x1c],

        // Lv4
        [0x01, 0x18, 0x1b],
        [0x01, 0x18, 0x1b],
        [0x01, 0x18, 0x1b],
        [0x01, 0x18, 0x1b],
        [0x01, 0x18, 0x1b],
        [0x01, 0x18, 0x1b],
        [0x07, 0x1d, 0x20],
        [0x18, 0x2d, 0x2e],
        [0x2c, 0x3e, 0x3e],
        [0x48, 0x57, 0x55],
        [0x5e, 0x6a, 0x67],
        [0x7c, 0x84, 0x80],

        // Lv5
        [0x97, 0x9c, 0x96],
        [0xb2, 0xb3, 0xab],
        [0xc9, 0xc8, 0xbf],
        [0xde, 0xda, 0xd0],
        [0xed, 0xe8, 0xde],
        [0xf6, 0xf1, 0xe6],
        [0xf8, 0xf5, 0xeb],
        [0xf8, 0xf7, 0xee],
        [0xf8, 0xf7, 0xf1],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],

        // Lv6
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
        [0xf8, 0xf7, 0xf3],
    ]
}
