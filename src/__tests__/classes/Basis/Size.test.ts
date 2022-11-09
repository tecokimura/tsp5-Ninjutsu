import { Size } from "../../../scripts/classes/Basis/Size"

test("constructor and get()", () => {
  const size = new Size(10, 20)
  expect(size.getWidth()).toBe(10)
  expect(size.getHeight()).toBe(20)
})

test("reset", () => {
  const size = new Size(10, 20)
  size.resetWidth(11)
  size.resetHeight(22)
  expect(size.getWidth()).toBe(11)
  expect(size.getHeight()).toBe(22)

  size.reset(12, 23)
  expect(size.getWidth()).toBe(12)
  expect(size.getHeight()).toBe(23)
})

test("under zero", () => {
  const size = new Size()
  size.resetWidth(0)
  size.resetHeight(0)
  expect(size.getWidth()).toBe(0)
  expect(size.getHeight()).toBe(0)

  size.resetWidth(-1)
  size.resetHeight(1)
  expect(size.getWidth()).toBe(0)
  expect(size.getHeight()).toBe(1)

  size.resetWidth(1)
  size.resetHeight(-1)
  expect(size.getWidth()).toBe(1)
  expect(size.getHeight()).toBe(1)

  size.reset()
  expect(size.getWidth()).toBe(0)
  expect(size.getHeight()).toBe(0)
})
