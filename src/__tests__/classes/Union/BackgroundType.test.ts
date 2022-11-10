import { BackgroundType } from "../../../scripts/classes/Union/BackgroundType"

// もっと良い方法ありそう。。。。
test("Check value", () => {
    expect(BackgroundType.NEAR).toBe(0)
    expect(BackgroundType.FAR).toBe(1)
    expect(BackgroundType.ALL).toBe(2)
})

test("setXxx and isXxx func", () => {
    let bgtype = new BackgroundType()
    expect(bgtype.isNear()).toBe(true)
    expect(bgtype.isFar()).toBe(false)

    bgtype.setNear()
    expect(bgtype.isNear()).toBe(true)
    expect(bgtype.isFar()).toBe(false)

    bgtype.setFar()
    expect(bgtype.isNear()).toBe(false)
    expect(bgtype.isFar()).toBe(true)
})
