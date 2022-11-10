import p5 from "p5"

const sketch = (p5js: p5) => {
    p5js.setup = () => {}

    p5js.preload = () => {}

    p5js.keyPressed = () => {}

    p5js.keyReleased = () => {}

    p5js.draw = () => {
        // sample
        p5js.fill(120, 120, 255)
        p5js.rect(0, 0, 240, 240)
        p5js.fill(255, 100, 100)
        p5js.rect(20, 20, 10, 10)
    }
}

new p5(sketch)
