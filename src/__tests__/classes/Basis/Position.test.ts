import { Position } from "../../../scripts/classes/Basis/Position"
import { Speed } from "../../../scripts/classes/Basis/Speed"

test("constructor", () => {
  const pos = new Position(10, 20)
  expect(pos.getX()).toBe(10)
  expect(pos.getY()).toBe(20)
})

test("reset", () => {
  const pos = new Position(11, 22)
  expect(pos.getX()).toBe(11)
  expect(pos.getY()).toBe(22)

  pos.reset()

  expect(pos.getX()).toBe(0)
  expect(pos.getY()).toBe(0)

  pos.resetX(1)
  expect(pos.getX()).toBe(1)
  expect(pos.getY()).toBe(0)
  pos.resetY(10)
  expect(pos.getX()).toBe(1)
  expect(pos.getY()).toBe(10)
})

test("move", () => {
  const pos = new Position(10, 20)
  const sp = new Speed(1, 2)

  pos.move(sp)

  expect(pos.getX()).toBe(11)
  expect(pos.getY()).toBe(22)

  //
  sp.resetX(-1)
  sp.resetY(-2)

  pos.move(sp)

  expect(pos.getX()).toBe(10)
  expect(pos.getY()).toBe(20)
})
