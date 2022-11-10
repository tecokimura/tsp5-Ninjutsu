import { Status } from "../../../scripts/classes/Basis/Status"

// もっと良い方法ありそう。。。。
test("not equals", () => {
    let count = -1
    expect(Status.OVER).toBe(count++)
    expect(Status.NONE).toBe(count++)
    expect(Status.PLAY).toBe(count++)
})
