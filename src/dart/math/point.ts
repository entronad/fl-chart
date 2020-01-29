// A utility class for representing two-dimensional positions.
export class Point {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString = () => `Point(${this.x}, ${this.y})`;

  // A `Point` is only equal to another `Point` with the same coordinates.
  //
  // This point is equal to `other` if, and only if,
  // `other` is a `Point` with
  // [x] equal to `other.x` and [y] equal to `other.y`.
  equals = (other: any) =>
    (other instanceof Point && this.x === other.x && this.y === other.y);
  
  // Add [other] to `this`, as if both points were vectors.
  //
  // Returns the resulting "vector" as a Point.
  add = (other: Point) =>
    new Point(this.x + other.x, this.y + other.y);

  // Subtract [other] from `this`, as if both points were vectors.
  //
  // Returns the resulting "vector" as a Point.
  sub = (other: Point) =>
    new Point(this.x - other.x, this.y - other.y);

  // Scale this point by [factor] as if it were a vector.
  //
  // *Important* *Note*: This function accepts a `num` as its argument only so
  // that you can scale Point<double> objects by an `int` factor. Because the
  // star operator always returns the same type of Point that originally called
  // it, passing in a double [factor] on a `Point<int>` _causes_ _a_
  // _runtime_ _error_ in checked mode.
  scale = (factor: number) =>
    new Point(this.x * factor, this.y * factor);

  // Get the straight line (Euclidean) distance between the origin (0, 0) and
  // this point.
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // Returns the distance between `this` and [other].
  distanceTo = (other: Point) => {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Returns the squared distance between `this` and [other].
  //
  // Squared distances can be used for comparisons when the actual value is not
  // required.
  squaredDistanceTo = (other: Point) => {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return dx * dx + dy * dy;
  };
}
