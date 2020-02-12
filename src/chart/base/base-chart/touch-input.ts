import { Offset } from 'package:dart/ui';

export abstract class FlTouchInput {
  abstract getOffset(): Offset;
}

export abstract class FlTouchLongInput extends FlTouchInput {}

export class FlLongPressStart extends FlTouchLongInput {
  readonly localPosition: Offset;

  constructor(localPosition: Offset) {
    super();
    this.localPosition = localPosition;
  }

  getOffset = () => this.localPosition;
}

export class FlLongPressMoveUpdate extends FlTouchLongInput {
  readonly localPosition: Offset;

  constructor(localPosition: Offset) {
    super();
    this.localPosition = localPosition;
  }

  getOffset = () => this.localPosition;
}

export class FlLongPressEnd extends FlTouchLongInput {
  readonly localPosition: Offset;

  constructor(localPosition: Offset) {
    super();
    this.localPosition = localPosition;
  }

  getOffset = () => this.localPosition;
}

export abstract class FlTouchNormalInput extends FlTouchInput {}

export class FlPanStart extends FlTouchNormalInput {
  readonly localPosition: Offset;

  constructor(localPosition: Offset) {
    super();
    this.localPosition = localPosition;
  }

  getOffset = () => this.localPosition;
}

export class FlPanMoveUpdate extends FlTouchNormalInput {
  readonly localPosition: Offset;

  constructor(localPosition: Offset) {
    super();
    this.localPosition = localPosition;
  }

  getOffset = () => this.localPosition;
}

export class FlPanEnd extends FlTouchNormalInput {
  readonly localPosition: Offset;

  constructor(localPosition: Offset) {
    super();
    this.localPosition = localPosition;
  }

  getOffset = () => this.localPosition;
}

export class NonTouch extends FlTouchInput {
  getOffset = (): Offset => null;
}
