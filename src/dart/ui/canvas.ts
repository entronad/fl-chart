import { Offset } from './geometry';
import { Paint } from './paint';

export class Canvas {
  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  readonly _context: CanvasRenderingContext2D;

  _applyPaint = (paint: Paint) => {
    this._context.fillStyle = paint.color;
    this._context.strokeStyle = paint.color;
    this._context.globalCompositeOperation = paint.blendMode;
    this._context.lineCap = paint.strokeCap;
    this._context.lineJoin = paint.strokeJoin;
    this._context.miterLimit = paint.strokeMiterLimit;
    this._context.lineWidth = paint.strokeWidth;
  }

  drawLine = (p1: Offset, p2: Offset, paint: Paint) => {
    this._applyPaint(paint);
    this._context.beginPath();
    this._context.moveTo(p1.dx, p1.dy);
    this._context.lineTo(p2.dx, p2.dy);
    this._context.stroke();
  }
}