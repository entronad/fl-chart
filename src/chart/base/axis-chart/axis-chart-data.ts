import { Offset } from 'package:dart/ui';

import {
  BaseChartData,
  FlBorderData,
  FlTouchData,
  FlAxisTitleData,
} from 'src/chart/base/base-chart/base-chart-data';

// This is the base class for axis base charts data
// that contains a [FlGridData] that holds data for showing grid lines,
// also we have [minX], [maxX], [minY], [maxY] values
// we use them to determine how much is the scale of chart,
// and calculate x and y according to the scale.
// each child have to set it in their constructor.
export abstract class AxisChartData extends BaseChartData {
  readonly gridData: FlGridData;
  readonly axisTitleData: FlAxisTitleData;
  readonly rangeAnnotations: RangeAnnotations;

  minX: number;
  maxX: number;
  minY: number;
  maxY: number;

  // clip the chart to the border (prevent draw outside the border)
  clipToBorder: boolean;

  // A background color which is drawn behind th chart.
  backgroundColor: string;

  constructor({
    gridData = new FlGridData(),
    borderData,
    touchData,
    axisTitleData,
    rangeAnnotations = new RangeAnnotations(),
    minX,
    maxX,
    minY,
    maxY,
    clipToBorder,
    backgroundColor,
  }: {
    gridData?: FlGridData,
    borderData?: FlBorderData,
    touchData?: FlTouchData,
    axisTitleData?: FlAxisTitleData,
    rangeAnnotations?: RangeAnnotations,
    minX?: number,
    maxX?: number,
    minY?: number,
    maxY?: number,
    clipToBorder?: boolean,
    backgroundColor?: string,
  } = {}) {
    super({borderData, touchData});
    this.gridData = gridData;
    this.axisTitleData = axisTitleData;
    this.rangeAnnotations = rangeAnnotations;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.clipToBorder = clipToBorder;
    this.backgroundColor = backgroundColor;
  }
}

/* Spot */

// this class represent a conceptual position of a spot in our chart
// they are based on bottom/left just like real life axises.
// we convert them to view x and y according to maxX and maxY
// based on the view's size
export class FlSpot {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copyWith = ({
    x,
    y,
  }: {
    x?: number,
    y?: number,
  } = {}) => new FlSpot(
    x ?? this.x,
    y ?? this.y,
  );
}

/* GridData */

// we use this typedef to determine which grid lines we should show,
// we pass the coord value, and receive a boolean to show that line in the grid.
export interface CheckToShowGrid {
  (value: number): boolean;
}

const showAllGrids = (value: number) => true;

// we use this typedef to determine how draw the grid line at specific position
interface GetDrawingGridLine {
  (value: number): FlLine;
}

export const defaultGridLine = (value: number) =>
  new FlLine({
    color: 'grey',
    strokeWidth: 0.5,
  });

// This class is responsible to hold grid data,
// the field names are descriptive and you can find out what they do.
export class FlGridData {
  readonly show: boolean;

  // Horizontal
  readonly drawHorizontalLine: boolean;
  readonly horizontalInterval: number;
  readonly getDrawingHorizontalLine: GetDrawingGridLine;
  readonly checkToShowHorizontalLine: CheckToShowGrid;

  // Vertical
  readonly drawVerticalLine: boolean;
  readonly verticalInterval: number;
  readonly getDrawingVerticalLine: GetDrawingGridLine;
  readonly checkToShowVerticalLine: CheckToShowGrid;

  constructor({
    show = true,
    drawHorizontalLine = true,
    horizontalInterval = 1.0,
    getDrawingHorizontalLine = defaultGridLine,
    checkToShowHorizontalLine = showAllGrids,
    drawVerticalLine = false,
    verticalInterval = 1.0,
    getDrawingVerticalLine = defaultGridLine,
    checkToShowVerticalLine = showAllGrids,
  }: {
    show?: boolean,
    drawHorizontalLine?: boolean,
    horizontalInterval?: number,
    getDrawingHorizontalLine?: GetDrawingGridLine,
    checkToShowHorizontalLine?: CheckToShowGrid,
    drawVerticalLine?: boolean,
    verticalInterval?: number,
    getDrawingVerticalLine?: GetDrawingGridLine,
    checkToShowVerticalLine?: CheckToShowGrid,
  } = {}) {
    this.show = show;
    this.drawHorizontalLine = drawHorizontalLine;
    this.horizontalInterval = horizontalInterval;
    this.getDrawingHorizontalLine = getDrawingHorizontalLine;
    this.checkToShowHorizontalLine = checkToShowHorizontalLine;
    this.drawVerticalLine = drawVerticalLine;
    this.verticalInterval = verticalInterval;
    this.getDrawingVerticalLine = getDrawingVerticalLine;
    this.checkToShowVerticalLine = checkToShowVerticalLine;
  }
}

// This class can be used wherever we want draw a straight line,
// and contains visual properties
// [dashArray]  A circular array of dash offsets and lengths.
// For example, the array `[5, 10]` would result in dashes 5 pixels long
// followed by blank spaces 10 pixels long.  The array `[5, 10, 5]` would
// result in a 5 pixel dash, a 10 pixel gap, a 5 pixel dash, a 5 pixel gap,
// a 10 pixel dash, etc.
export class FlLine {
  readonly color: string;
  readonly strokeWidth: number;
  readonly dashArray: Array<number>;

  constructor({
    color = '#000000',
    strokeWidth = 2,
    dashArray,
  }: {
    color?: string,
    strokeWidth?: number,
    dashArray?: Array<number>,
  } = {}) {
    this.color = color;
    this.strokeWidth = strokeWidth;
    this.dashArray = dashArray;
  }
}

// holds information about touched spot on the axis base charts
export abstract class TouchedSpot {
  readonly spot: FlSpot;
  readonly offset: Offset;

  constructor(sport: FlSpot, offset: Offset) {
    this.spot = sport;
    this.offset = offset;
  }

  abstract getColor(): string;
}

// HorizontalRangeAnnotation
export class HorizontalRangeAnnotation {
  readonly y1: number;
  readonly y2: number;
  readonly color: string;

  constructor({
    y1,
    y2,
    color = 'white',
  }: {
    y1?: number,
    y2?: number,
    color?: string,
  } = {}) {
    this.y1 = y1;
    this.y2 = y2;
    this.color = color;
  }
}

// VerticalRangeAnnotation
export class VerticalRangeAnnotation {
  readonly x1: number;
  readonly x2: number;
  readonly color: string;

  constructor({
    x1,
    x2,
    color = 'white',
  }: {
    x1?: number,
    x2?: number,
    color?: string,
  } = {}) {
    this.x1 = x1;
    this.x2 = x2;
    this.color = color;
  }
}

// RangeAnnotations
export class RangeAnnotations {
  readonly horizontalRangeAnnotations: Array<HorizontalRangeAnnotation>;
  readonly verticalRangeAnnotations: Array<VerticalRangeAnnotation>;

  constructor({
    horizontalRangeAnnotations = [],
    verticalRangeAnnotations = [],
  }: {
    horizontalRangeAnnotations?: Array<HorizontalRangeAnnotation>,
    verticalRangeAnnotations?: Array<VerticalRangeAnnotation>,
  } = {}) {
    this.horizontalRangeAnnotations = horizontalRangeAnnotations;
    this.verticalRangeAnnotations = verticalRangeAnnotations;
  }
}
