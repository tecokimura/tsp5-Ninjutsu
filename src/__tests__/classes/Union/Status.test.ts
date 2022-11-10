import { Status } from "../../../scripts/classes/Union/Status"

// もっと良い方法ありそう。。。。
test("Check value", () => {
    let count = -1
    expect(Status.OVER).toBe(count++)
    expect(Status.NONE).toBe(count++)
    expect(Status.PLAY).toBe(count++)
})

test("setXxx and isXxx func", () => {
    let st = new Status()
    expect(st.isOver()).toBe(false)
    expect(st.isNone()).toBe(true)
    expect(st.isPlay()).toBe(false)

    st.setOver()
    expect(st.isOver()).toBe(true)
    expect(st.isNone()).toBe(false)
    expect(st.isPlay()).toBe(false)

    st.setPlay()
    expect(st.isOver()).toBe(false)
    expect(st.isNone()).toBe(false)
    expect(st.isPlay()).toBe(true)

    st.setNone()
    expect(st.isOver()).toBe(false)
    expect(st.isNone()).toBe(true)
    expect(st.isPlay()).toBe(false)
})
