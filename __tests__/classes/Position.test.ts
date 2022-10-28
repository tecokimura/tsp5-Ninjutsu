import { Position } from "../../src/scripts/classes/Position"
import { Speed } from "../../src/scripts/classes/Speed"

test("constructor", () => {
  const pos = new Position(10, 20)
  expect(pos.getX()).toBe(10)
  expect(pos.getY()).toBe(20)
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
