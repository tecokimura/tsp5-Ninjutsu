import { Position } from "../../src/scripts/classes/Position";

test("constructor", () => {
    const pos = new Position(10 ,20);
    expect(pos.getX()).toBe(10);
    expect(pos.getY()).toBe(20);
});

test("move", () => {
    const pos = new Position(10 ,20);
    expect(pos.getX()).toBe(10);
    expect(pos.getY()).toBe(20);
});
