import { Speed } from "../../src/scripts/classes/Speed";

test("constructor and get()", () => {
    const sp = new Speed(10 ,20);
    expect(sp.getX()).toBe(10);
    expect(sp.getY()).toBe(20);
});

test("reset", () => {
    const pos = new Speed(10 ,20);
    pos.resetX(11);
    pos.resetY(22);
    expect(pos.getX()).toBe(11);
    expect(pos.getY()).toBe(22);
});

test("add", () => {
    const sp = new Speed(10 ,20);
    const vsp = new Speed(5 ,10);

    sp.add(vsp);

    expect(sp.getX()).toBe(10+5);
    expect(sp.getY()).toBe(20+10);
});
