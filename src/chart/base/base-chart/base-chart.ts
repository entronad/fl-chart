import { BaseChartData } from 'src';

import { BaseChartPainter } from './base-chart-painter';

// BaseChart is a base class for our charts,
// each chart should extends this class and implement the [painter] method.
// and the Painter should extends from [BaseChartPainter].
// the painter content will be painted on the [FlChart] class.
// you can find concrete examples here :
// [LineChart], [BarChart], [PieChart]
export abstract class BaseChart {
  // [baseChartData] is the currently showing data (it may produced by an animation using lerp function),
  // [targetBaseChartData] is the target data, that animation is going to show (if animating)
  abstract painter({
    baseChartData,
    targetBaseChartData,
  }: {
    baseChartData?: BaseChartData,
    targetBaseChartData?: BaseChartData,
  }): BaseChartPainter<BaseChartData>;

  // get the data of the concrete chart
  abstract getData(): BaseChartData;
}

