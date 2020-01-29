import moment from 'moment';

export class DateFormat {
  constructor(pattern?: string) {
    this._pattern = pattern;
  }

  _pattern: string;

  get pattern() {
    return this._pattern;
  }

  addPattern = (pattern: string) => {
    this._pattern = pattern;
  }

  format = (date: Date) =>
    moment(date).format(this._pattern);

  parse = (inputString: string, utc = false) =>
    utc
    ? moment.utc(inputString, this._pattern)
    : moment(inputString, this._pattern);
}
