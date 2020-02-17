import { TextStyle } from './text-style';

export class TextSpan {
  constructor({
    text,
    style,
    children,
  }: {
    text?: string,
    style?: TextStyle,
    children?: Array<TextSpan>,
  } = {}) {
    this.text = text;
    this.style = style;
    this.children = children;
  }

  readonly text: string;
  readonly style: TextStyle;
  readonly children: Array<TextSpan>;
}
