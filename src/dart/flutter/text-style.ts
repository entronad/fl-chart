export class TextStyle {
  constructor({
    color,
    backgroundColor,
    fontSize,
    fontWeight,
    fontFamily,
  }: {
    color?: string,
    backgroundColor?: string,
    fontSize?: number,
    fontWeight?: string,
    fontFamily?: string,
  } = {}) {
    this.color = color;
    this.backgroundColor = backgroundColor;
    this.fontSize = fontSize;
    this.fontWeight = fontWeight;
    this.fontFamily = fontFamily;
  }

  readonly color: string;
  readonly backgroundColor: string;
  readonly fontSize: number;
  readonly fontWeight: string;
  readonly fontFamily: string;
}