import { CustomPainter } from 'package:dart/flutter';
import {
  Size,
  Paint,
  PaintingStyle,
  Offset,
  Canvas,
} from 'package:dart/ui';

import { BaseChartData, BaseTouchResponse } from './base-chart-data';
import { FlTouchInput } from './touch-input';

// this class is base class of our painters and
// it is responsible to draw borders of charts.
// concrete samples :
// [LineChartPainter], [BarChartPainter], [PieChartPainter]
// there is a data [D] that extends from [BaseChartData],
// that contains needed data to draw chart border in this phase.
// [data] is the currently showing data (it may produced by an animation using lerp function),
// [targetData] is the target data, that animation is going to show (if animating)
export class BaseChartPainter<D extends BaseChartData> extends CustomPainter {
  readonly data: D;
  readonly targetData: D;
  borderPaint: Paint;
  textScale: number;

  constructor(data: D, targetData: D, {textScale = 1}: {textScale?: number} = {}) {
    super();
    this.data = data;
    this.targetData = targetData;
    this.textScale = textScale;
    const paint = new Paint();
    paint.style = PaintingStyle.stroke;
    this.borderPaint = paint;
  }

  paint = (canvas: Canvas, size: Size) => {
    this.drawViewBorder(canvas, size);
  };

  drawViewBorder = (canvas: Canvas, viewSize: Size) => {
    if (!this.data.borderData.show) {
      return;
    }

    const chartViewSize = this.getChartUsableDrawSize(viewSize);

    const topLeft = new Offset(
      this.getLeftOffsetDrawSize(),
      this.getTopOffsetDrawSize(),
    );
    const topRight = new Offset(
      this.getLeftOffsetDrawSize() + chartViewSize.width,
      this.getTopOffsetDrawSize(),
    );
    const bottomLeft = new Offset(
      this.getLeftOffsetDrawSize(),
      this.getTopOffsetDrawSize() + chartViewSize.height,
    );
    const bottomRight = new Offset(
      this.getLeftOffsetDrawSize() + chartViewSize.width,
      this.getTopOffsetDrawSize() + chartViewSize.height,
    );

    // Draw Top Line
    const topBorder = this.data.borderData.border.top;
    if (topBorder.width !== 0) {
      this.borderPaint.color = topBorder.color;
      this.borderPaint.strokeWidth = topBorder.width;
      canvas.drawLine(topLeft, topRight, this.borderPaint);
    }

    // Draw Right Line
    const rightBorder = this.data.borderData.border.right;
    if (rightBorder.width !== 0) {
      this.borderPaint.color = rightBorder.color;
      this.borderPaint.strokeWidth = rightBorder.width;
      canvas.drawLine(topRight, bottomRight, this.borderPaint);
    }

    // Draw Bottom Line
    const bottomBorder = this.data.borderData.border.bottom;
    if (bottomBorder.width !== 0) {
      this.borderPaint.color = bottomBorder.color;
      this.borderPaint.strokeWidth = bottomBorder.width;
      canvas.drawLine(bottomRight, bottomLeft, this.borderPaint);
    }

    // Draw Left Line
    const leftBorder = this.data.borderData.border.left;
    if (leftBorder.width !== 0) {
      this.borderPaint.color = leftBorder.color;
      this.borderPaint.strokeWidth = leftBorder.width;
      canvas.drawLine(bottomLeft, topLeft, this.borderPaint);
    }
  };

  // calculate the size that we can draw our chart.
  // [getExtraNeededHorizontalSpace] and [getExtraNeededVerticalSpace]
  // is the needed space to draw horizontal and vertical
  // stuff around our chart.
  // then we subtract them from raw [viewSize]
  getChartUsableDrawSize = (viewSize: Size) => {
    const usableWidth = viewSize.width - this.getExtraNeededHorizontalSpace();
    const usableHeight = viewSize.height - this.getExtraNeededVerticalSpace();
    return new Size(usableWidth, usableHeight);
  }

  // extra needed space to show horizontal contents around the chart,
  // like: left, right padding, left, right titles, and so on,
  // each child class can override this function.
  getExtraNeededHorizontalSpace = () => 0;

  // extra needed space to show vertical contents around the chart,
  // like: tob, bottom padding, top, bottom titles, and so on,
  // each child class can override this function.
  getExtraNeededVerticalSpace = () => 0;

  // left offset to draw the chart
  // we should use this to offset our x axis when we drawing the chart,
  // and the width space we can use to draw chart is[getChartUsableDrawSize.width]
  getLeftOffsetDrawSize = () => 0;

  // top offset to draw the chart
  // we should use this to offset our y axis when we drawing the chart,
  // and the height space we can use to draw chart is[getChartUsableDrawSize.height]
  getTopOffsetDrawSize = () => 0;
}

export abstract class TouchHandler<T extends BaseTouchResponse> {
  handleTouch = (
    touchInput: FlTouchInput,
    size: Size,
  ): T => {
    throw new Error(`not implemented ${touchInput} ${size}`);
  }
}
