import { Position } from "./Position"
import { Speed } from "./Speed"

// TODO: 置き換えれるように頑張る
export abstract class Background {
  protected type: number = 0

  protected position: Position = new Position()
  protected speed: Speed = new Speed()

  constructor() {
    this.init()
  }

  init() {
    this.position = new Position()
    this.speed = new Speed()
  }
}
