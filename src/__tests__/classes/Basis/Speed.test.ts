import { Speed } from "../../../scripts/classes/Basis/Speed"

test("constructor and get()", () => {
  const sp = new Speed(10, 20)
  expect(sp.getX()).toBe(10)
  expect(sp.getY()).toBe(20)
})

test("reset", () => {
  const sp = new Speed(10, 20)
  expect(sp.getX()).toBe(10)
  expect(sp.getY()).toBe(20)
  sp.resetX(11)
  expect(sp.getX()).toBe(11)
  expect(sp.getY()).toBe(20)
  sp.resetY(22)
  expect(sp.getX()).toBe(11)
  expect(sp.getY()).toBe(22)
  sp.reset(0, 0)
  expect(sp.getX()).toBe(0)
  expect(sp.getY()).toBe(0)
})

test("add", () => {
  const sp = new Speed(10, 20)
  const vsp = new Speed(5, 10)

  sp.add(vsp)

  expect(sp.getX()).toBe(10 + 5)
  expect(sp.getY()).toBe(20 + 10)
})
