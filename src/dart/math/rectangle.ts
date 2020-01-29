import { assert } from 'package:dart/core';
import { Point } from './point';

// A base class for representing two-dimensional axis-aligned rectangles.
//
// This rectangle uses a left-handed Cartesian coordinate system, with x
// directed to the right and y directed down, as per the convention in 2D
// computer graphics.
//
// See also:
//    [W3C Coordinate Systems Specification](http://www.w3.org/TR/SVG/coords.html#InitialCoordinateSystem).
//
// The rectangle is the set of points with representable coordinates greater
// than or equal to left/top, and with distance to left/top no greater than
// width/height (to the limit of the precision of the coordinates).
abstract class _RectangleBase {
  // The x-coordinate of the left edge.
  abstract get left(): number;

  // The y-coordinate of the top edge.
  abstract get top(): number;

  // The width of the rectangle.
  abstract get width(): number;

  // The height of the rectangle.
  abstract get height(): number;

  // The x-coordinate of the right edge.
  get right() {
    return this.left + this.width;
  }

  // The y-coordinate of the bottom edge.
  get bottom() {
    return this.top + this.height;
  }

  toString = () => `Rectangle (${this.left}, ${this.top}) ${this.width} x ${this.height}`;

  equals = (other: any) =>
    // Can't change argument type to `Object` since subclasses inherit it
    // and uses their argument dynamically.
    (other instanceof Rectangle &&
    this.left === other.left &&
    this.top === other.top &&
    this.right === other.right &&
    this.bottom === other.bottom);

  // Computes the intersection of `this` and [other].
  //
  // The intersection of two axis-aligned rectangles, if any, is always another
  // axis-aligned rectangle.
  //
  // Returns the intersection of this and `other`, or `null` if they don't
  // intersect.
  intersection = (other: Rectangle) => {
    const x0 = Math.max(this.left, other.left);
    const x1 = Math.min(this.left + this.width, other.left + other.width);

    if (x0 <= x1) {
      const y0 = Math.max(this.top, other.top);
      const y1 = Math.min(this.top + this.height, other.top + other.height);

      if (y0 <= y1) {
        return new Rectangle(x0, y0, x1-x0, y1 - y0);
      }
    }
    return null;
  };

  // Returns true if `this` intersects [other].
  intersects = (other: Rectangle) =>
    (this.left <= other.left + other.width &&
    other.left <= this.left + this.width &&
    this.top <= other.top + other.height &&
    other.top <= this.top + this.height);
  
  // Returns a new rectangle which completely contains `this` and [other].
  boundingBox = (other: Rectangle) => {
    const right = Math.max(this.left + this.width, other.left + other.width);
    const bottom = Math.max(this.top + this.height, other.top + other.height);

    const left = Math.min(this.left, other.left);
    const top = Math.min(this.top, other.top);

    return new Rectangle(left, top, right - left, bottom - top);
  };

  // Tests whether `this` entirely contains [another].
  containsRectangle = (another: Rectangle) =>
    (this.left <= another.left &&
    this.left + this.width >= another.left + another.width &&
    this.top <= another.top &&
    this.top + this.height >= another.top + another.height);
  
  // Tests whether [another] is inside or along the edges of `this`.
  containsPoint = (another: Point) =>
    (another.x >= this.left &&
    another.x <= this.left + this.width &&
    another.y >= this.top &&
    another.y <= this.top + this.height);
  
  get topLeft() {
    return new Point(this.left, this.top);
  }

  get topRight() {
    return new Point(this.left + this.width, this.top);
  }

  get bottomRight() {
    return new Point(this.left + this.width, this.top + this.height);
  }

  get bottomLeft() {
    return new Point(this.left, this.top + this.height);
  }
}

// A class for representing two-dimensional rectangles whose properties are
// immutable.
export class Rectangle extends _RectangleBase {
  readonly left: number;
  readonly top: number;
  readonly width: number;
  readonly height: number;

  // Create a rectangle spanned by `(left, top)` and
  // `(left+width, top+height)`.
  //
  // The rectangle contains the points
  // with x-coordinate between `left` and `left + width`, and
  // with y-coordinate between `top` and `top + height`, both inclusive.
  //
  // The `width` and `height` should be non-negative.
  // If `width` or `height` are negative, they are clamped to zero.
  //
  // If `width` and `height` are zero, the "rectangle" comprises only the
  // single point `(left, top)`.
  constructor(left: number, top: number, width: number, height: number) {
    super();
    this.left = left;
    this.top = top;
    this.width = (width < 0) ? -width * 0 : width; // Inline _clampToZero.
    this.height = (height < 0) ? -height * 0 : height;
  }

  // Create a rectangle spanned by the points [a] and [b];
  //
  // The rectangle contains the points
  // with x-coordinate between `a.x` and `b.x`, and
  // with y-coordinate between `a.y` and `b.y`, both inclusive.
  //
  // If the distance between `a.x` and `b.x` is not representable
  // (which can happen if one or both is a double),
  // the actual right edge might be slightly off from `max(a.x, b.x)`.
  // Similar for the y-coordinates and the bottom edge.
  static fromPoints = (a: Point, b: Point) => {
    const left = Math.min(a.x, b.x);
    const width = Math.max(a.x, b.x) - left;
    const top = Math.min(a.y, b.y);
    const height = Math.max(a.y, b.y) - top;
    return new Rectangle(left, top, width, height);
  };
}

// A class for representing two-dimensional axis-aligned rectangles with
// mutable properties.
export class MutableRectangle extends _RectangleBase implements Rectangle {
  // The x-coordinate of the left edge.
  //
  // Setting the value will move the rectangle without changing its width.
  left: number;

  // The y-coordinate of the left edge.
  //
  // Setting the value will move the rectangle without changing its height.
  top: number;

  _width: number;
  _height: number;

  // Create a mutable rectangle spanned by `(left, top)` and
  // `(left+width, top+height)`.
  //
  // The rectangle contains the points
  // with x-coordinate between `left` and `left + width`, and
  // with y-coordinate between `top` and `top + height`, both inclusive.
  //
  // The `width` and `height` should be non-negative.
  // If `width` or `height` are negative, they are clamped to zero.
  //
  // If `width` and `height` are zero, the "rectangle" comprises only the
  // single point `(left, top)`.
  constructor(left: number, top: number, width: number, height: number) {
    super();
    this.left = left;
    this.top = top;
    this._width = (width < 0) ? _clampToZero(width) : width;
    this._height = (height < 0) ? _clampToZero(height) : height;
  }

  // Create a mutable rectangle spanned by the points [a] and [b];
  //
  // The rectangle contains the points
  // with x-coordinate between `a.x` and `b.x`, and
  // with y-coordinate between `a.y` and `b.y`, both inclusive.
  //
  // If the distance between `a.x` and `b.x` is not representable
  // (which can happen if one or both is a double),
  // the actual right edge might be slightly off from `max(a.x, b.x)`.
  // Similar for the y-coordinates and the bottom edge.
  static fromPoints = (a: Point, b: Point) => {
    const left = Math.min(a.x, b.x);
    const width = Math.max(a.x, b.x) - left;
    const top = Math.min(a.y, b.y);
    const height = Math.max(a.y, b.y) - top;
    return new MutableRectangle(left, top, width, height);
  };

  get width() {
    return this._width;
  }

  // Sets the width of the rectangle.
  //
  // The width must be non-negative.
  // If a negative width is supplied, it is clamped to zero.
  //
  // Setting the value will change the right edge of the rectangle,
  // but will not change [left].
  set width(width: number) {
    if (width < 0) {
      width = _clampToZero(width);
    }
    this._width = width;
  }

  get height() {
    return this._height;
  }

  // Sets the height of the rectangle.
  //
  // The height must be non-negative.
  // If a negative height is supplied, it is clamped to zero.
  //
  // Setting the value will change the bottom edge of the rectangle,
  // but will not change [top].
  set height(height: number) {
    if (height < 0) {
      height = _clampToZero(height);
    }
    this._height = height;
  }
}

// Converts a negative [int] or [double] to a zero-value of the same type.
//
// Returns `0` if value is int, `0.0` if value is double.
const _clampToZero = (value: number) => {
  assert(value < 0);
  return -value * 0;
};
