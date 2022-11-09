import { Position } from "../Position"
import { Speed } from "../Speed"
import { Size } from "../Size"

// status, type, alpha time のクラス化検討する
export abstract class Base {
  protected status: number = 0
  protected type: number = 0
  protected time: number = 0
  protected alpha: number = 255

  protected position: Position = new Position()
  protected speed: Speed = new Speed()
  protected size: Size = new Size()

  constructor() {
    this.init()
  }

  init() {
    this.position = new Position()
    this.speed = new Speed()
    this.size = new Size()
  }
}
