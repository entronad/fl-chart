import { Size, Canvas } from 'package:dart/ui';

export abstract class CustomPainter {
  abstract paint(context: Canvas, size: Size): void;
}