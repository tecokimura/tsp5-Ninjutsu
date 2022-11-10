import { Time } from "../../../scripts/classes/Basis/Time"

test("constructor and get", () => {
    const time = new Time()
    expect(time.getCount()).toBe(0)
})

test("reset", () => {
    const time = new Time()
    time.reset(10)
    expect(time.getCount()).toBe(10)
})

test("counting", () => {
    const time = new Time()

    for (let i = 0; i < 100; i++) {
        time.counting()
    }

    expect(time.getCount()).toBe(100)
})
