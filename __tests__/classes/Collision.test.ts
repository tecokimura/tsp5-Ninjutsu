import { Collision } from "../../src/scripts/classes/Collision"
import { Position } from "../../src/scripts/classes/Position"
import { Speed } from "../../src/scripts/classes/Speed"

test("Constructor", () => {
  const init_x: number = 10
  const init_y: number = 20
  const init_w: number = 30
  const init_h: number = 40

  const col = new Collision(init_x, init_y, init_w, init_h)
  expect(col.getX()).toBe(init_x)
  expect(col.getY()).toBe(init_y)
  expect(col.getWidth()).toBe(init_w)
  expect(col.getHeight()).toBe(init_h)

  col.resetWidth(-1)
  col.resetWidth(-10)
  expect(col.getWidth()).toBe(init_w)
  col.resetWidth(0)
  expect(col.getWidth()).toBe(0)

  col.resetHeight(-1)
  col.resetHeight(-10)
  expect(col.getHeight()).toBe(init_h)
  col.resetHeight(0)
  expect(col.getHeight()).toBe(0)
})

test("isOverlap is true", () => {
  const col1 = new Collision(0, 0, 5, 5)
  const col2 = new Collision(2, 2, 5, 5)
  expect(col1.isOverlap(col2)).toBe(true)

  col2.resetX(5)
  col2.resetY(5)
  expect(col1.isOverlap(col2)).toBe(true)

  col2.resetX(6)
  col2.resetY(6)
  expect(col1.isOverlap(col2)).toBe(false)

  col1.resetWidth(10)
  col1.resetHeight(10)
  expect(col1.isOverlap(col2)).toBe(true)
})

test("isOverlap is false", () => {})
