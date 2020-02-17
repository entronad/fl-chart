import { Paint, PaintingStyle, Canvas, Size } from 'package:dart/ui';
import { TextSpan } from 'package:dart/flutter';

import { BaseChartPainter } from 'src/chart/base/base-chart/base-chart-painter';

import { AxisChartData } from './axis-chart-data';

/// This class is responsible to draw the grid behind all axis base charts.
/// also we have two useful function [getPixelX] and [getPixelY] that used
/// in child classes -> [BarChartPainter], [LineChartPainter]
/// [data] is the currently showing data (it may produced by an animation using lerp function),
/// [targetData] is the target data, that animation is going to show (if animating)
export abstract class AxisChartPainter<D extends AxisChartData> extends BaseChartPainter<D> {
  gridPaint: Paint;
  backgroundPaint: Paint;

  /// [rangeAnnotationPaint] draws range annotations;
  rangeAnnotationPaint: Paint;

  constructor(data: D, targetData: D, {textScale}: {textScale?: number} = {}) {
    super(data,  targetData, {textScale});
    const paint1 = new Paint();
    paint1.style = PaintingStyle.stroke;
    this.gridPaint = paint1;

    const paint2 = new Paint();
    paint2.style = PaintingStyle.fill;
    this.backgroundPaint = paint2;

    const paint3 = new Paint();
    paint3.style = PaintingStyle.fill;
    this.rangeAnnotationPaint = paint3;
  }

  paint = (canvas: Canvas, size: Size) => {
    super.paint(canvas, size);

    this.drawBackground(canvas, size);
    this.drawRangeAnnotation(canvas, size);
    this.drawGrid(canvas, size);
  }

  /// allow descendants of the class to call the superclass
  superBorderPaint = (canvas: Canvas, size: Size) => {
    super.paint(canvas, size);
  };

  darawAxisTitles = (canvas: Canvas, viewSize: Size) => {
    if (!this.data.axisTitleData.show) {
      return;
    }
    viewSize = this.getChartUsableDrawSize(viewSize);

    const axisTitles = this.data.axisTitleData;

    // Left Title
    const leftTitle = axisTitles.leftTitle;
    if (leftTitle.showTitle) {
      const span = new TextSpan({style: leftTitle.textStyle, text: leftTitle.titleText});
      
    }
  }
}