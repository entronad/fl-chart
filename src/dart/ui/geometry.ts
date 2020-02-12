abstract class OffsetBase {
  constructor(dx: number, dy: number) {
    this._dx = dx;
    this._dy = dy;
  }

  readonly _dx: number;
  readonly _dy: number;

  get dx() {
    return this._dx;
  }

  get dy() {
    return this._dy;
  }
}

export class Offset extends OffsetBase {}

export class Size extends OffsetBase {
  get width() {
    return this._dx;
  }

  get height() {
    return this._dy;
  }
}
