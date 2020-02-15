import { BaseChart } from 'src/chart/base/base-chart/base-chart';

// This class is suitable for axis base charts
// in the axis base charts we have a grid behind the charts
// the direct subclasses are [LineChart], [BarChart]
export abstract class AxisChart extends BaseChart {}
