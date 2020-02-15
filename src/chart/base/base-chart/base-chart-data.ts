import { Border, BorderStyle } from 'package:dart/ui';
import { TextStyle } from 'package:dart/flutter/text-style';

import { FlTouchInput } from './touch-input';

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

//* AxisTitleData */

// This class holds data about the description for each axis of the chart.
export class FlAxisTitleData {
  readonly show: boolean;

  readonly leftTitle: AxisTitle;
  readonly topTitle: AxisTitle;
  readonly rightTitle: AxisTitle;
  readonly bottomTitle: AxisTitle;

  constructor({
    show = true,
    leftTitle = new AxisTitle({reservedSize: 16}),
    topTitle = new AxisTitle({reservedSize: 16}),
    rightTitle = new AxisTitle({reservedSize: 16}),
    bottomTitle = new AxisTitle({reservedSize: 16}),
  }: {
    show?: boolean,
    leftTitle?: AxisTitle,
    topTitle?: AxisTitle,
    rightTitle?: AxisTitle,
    bottomTitle?: AxisTitle,
  } = {}) {
    this.show = show;
    this.leftTitle = leftTitle;
    this.topTitle = topTitle;
    this.rightTitle = rightTitle;
    this.bottomTitle = bottomTitle;
  }
}

// specify each axis titles data
export class AxisTitle {
  readonly showTitle: boolean;
  readonly reservedSize: number;
  readonly textStyle: TextStyle;
  readonly textAlign: string;
  readonly margin: number;
  readonly titleText: string;

  constructor({
    showTitle = false,
    reservedSize = 14,
    textStyle = new TextStyle({
      color: 'black',
      fontSize: 11,
    }),
    textAlign = 'center',
    margin = 4,
    titleText = '',
  }: {
    showTitle?: boolean,
    reservedSize?: number,
    textStyle?: TextStyle,
    textAlign?: string,
    margin?: number,
    titleText?: string,
  } = {}) {
    this.showTitle = showTitle;
    this.reservedSize = reservedSize;
    this.textStyle = textStyle;
    this.textAlign = textAlign;
    this.margin = margin;
    this.titleText = titleText;
  }
}

/* TitlesData */

// we use this typedef to determine which titles
// we should show (according to the value),
// we pass the value and get a boolean to show the title for that value.
export interface GetTitleFunction {
  (value: number): string;
}

export const defaultGetTitle = (value: number) => `${value}`;

// This class is responsible to hold data about showing titles.
// titles show on the each side of chart
export class FlTitlesData {
  readonly show: boolean;

  readonly leftTitles: SideTitles;
  readonly topTitles: SideTitles;
  readonly rightTitles: SideTitles;
  readonly bottomTitles: SideTitles;

  constructor({
    show = true,
    leftTitles = new SideTitles({
      reservedSize: 40,
      showTitles: true,
    }),
    topTitles = new SideTitles({
      reservedSize: 6,
    }),
    rightTitles = new SideTitles({
      reservedSize: 40,
    }),
    bottomTitles = new SideTitles({
      reservedSize: 22,
      showTitles: true,
    }),
  }: {
    show?: boolean,
    leftTitles?: SideTitles;
    topTitles?: SideTitles;
    rightTitles?: SideTitles;
    bottomTitles?: SideTitles;
  } = {}) {
    this.show = show;
    this.leftTitles = leftTitles;
    this.topTitles = topTitles;
    this.rightTitles = rightTitles;
    this.bottomTitles = bottomTitles;
  }
}

// specify each side titles data
export class SideTitles {
  readonly showTitles: boolean;
  readonly getTitles: GetTitleFunction;
  readonly reservedSize: number;
  readonly textStyle: TextStyle;
  readonly margin: number;
  readonly interval: number;
  readonly rotateAngle: number;

  constructor({
    showTitles = false,
    getTitles = defaultGetTitle,
    reservedSize = 22,
    textStyle = new TextStyle({
      color: 'black',
      fontSize: 11,
    }),
    margin = 6,
    interval = 1,
    rotateAngle = 0,
  }: {
    showTitles?: boolean,
    getTitles?: GetTitleFunction,
    reservedSize?: number,
    textStyle?: TextStyle,
    margin?: number,
    interval?: number,
    rotateAngle?: number,
  } = {}) {
    this.showTitles = showTitles;
    this.getTitles = getTitles;
    this.reservedSize = reservedSize;
    this.textStyle = textStyle;
    this.margin = margin;
    this.interval = interval;
    this.rotateAngle = rotateAngle;
  }
}

// this class holds the touch response details,
// specific touch details should be hold on the concrete child classes
export class BaseTouchResponse {
  readonly touchInput: FlTouchInput;

  constructor(touchInput: FlTouchInput) {
    this.touchInput = touchInput;
  };
}
