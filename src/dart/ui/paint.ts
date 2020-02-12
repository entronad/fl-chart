export enum PaintingStyle {
  fill,
  stroke,
}

export class Paint {
  // fillStyle | strokeStyle
  style: PaintingStyle;
  color: string;

  // globalCompositeOperation
  blendMode: string;
  
  // lineCap
  strokeCap: CanvasLineCap;

  // lineJoin
  strokeJoin: CanvasLineJoin;

  // miterLimit
  strokeMiterLimit: number;

  // lineWidth
  strokeWidth: number;
}