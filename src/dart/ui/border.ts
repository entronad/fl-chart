import { assert } from 'package:dart/core';

import { BorderSide, BorderStyle } from './border-side';

export class Border {
  constructor({
    top = BorderSide.none,
    right = BorderSide.none,
    bottom = BorderSide.none,
    left = BorderSide.none,
  }: {
    top?: BorderSide,
    right?: BorderSide,
    bottom?: BorderSide,
    left?: BorderSide,
  } = {}) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    assert(this.top != null);
    assert(this.right != null);
    assert(this.bottom != null);
    assert(this.left != null);
  }

  static fromBorderSide(side: BorderSide) {
    assert(side != null);
    return new Border({
      top: side,
      right: side,
      bottom: side,
      left: side,
    });
  }

  static all({
    color = '#000000',
    width = 1,
    style = BorderStyle.solid,
  }: {
    color?: string,
    width?: number,
    style?: BorderStyle,
  } = {}) {
    const side = new BorderSide({color, width, style});
    return Border.fromBorderSide(side);
  }

  readonly top: BorderSide;

  readonly right: BorderSide;

  readonly bottom: BorderSide;

  readonly left: BorderSide;
}