import moment from 'moment';

export class Duration {
  constructor({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  } = {}) {
    this._duration = moment.duration({
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    });
  }

  readonly _duration: moment.Duration;

  abs = () => this._duration.abs();

  compareTo = (other: Duration) =>
    this._duration.milliseconds() - other._duration.milliseconds();
}