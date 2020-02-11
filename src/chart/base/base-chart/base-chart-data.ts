import { Border, BorderStyle } from 'package:dart/ui';

// This class holds all data needed to [BaseChartPainter],
// in this phase just the [FlBorderData] provided
// to drawing chart border line,
// see inherited samples:
// [LineChartData], [BarChartData], [PieChartData]
export abstract class BaseChartData {
  borderData: FlBorderData;
  touchData: FlTouchData;

  constructor({
    borderData,
    touchData,
  }: {
    borderData?: FlBorderData,
    touchData?: FlTouchData,
  } = {}) {
    this.borderData = borderData ?? new FlBorderData();
    this.touchData = touchData;
  }
}

/* BorderData */

// Border Data that contains
// used the [Border] class to draw each side of border.
export class FlBorderData {
  readonly show: boolean;
  border: Border;

  constructor({
    show = true,
    border,
  }: {
    show?: boolean,
    border?: Border,
  } = {}) {
    this.show = show;
    this.border = border ?? Border.all({
      color: '#000000',
      width: 1,
      style: BorderStyle.solid,
    });
  }
}

/* TouchData */

// holds information about touch on the chart
export class FlTouchData {
  // determines enable or disable the touch in the chart
  readonly enabled: boolean;

  // determines that charts should respond to normal touch events or not
  readonly enableNormalTouch: boolean;

  constructor(enabled: boolean, enableNormalTouch: boolean) {
    this.enabled = enabled;
    this.enableNormalTouch = enableNormalTouch;
  }
}
