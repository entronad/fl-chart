import { assert } from 'package:dart/core';

export enum BorderStyle {
  none,
  solid,
}

export class BorderSide {
  static readonly none = new BorderSide({width: 0, style: BorderStyle.none});

  constructor({
    color = '#000000',
    width = 1,
    style = BorderStyle.solid,
  }: {
    color?: string,
    width?: number,
    style?: BorderStyle,
  } = {}) {
    this.color = color;
    this.width = width;
    this.style = style;
    assert(this.color != null);
    assert(this.width != null);
    assert(this.width >= 0);
    assert(this.style != null);
  }

  readonly color: string;

  readonly width: number;

  readonly style: BorderStyle;
}
