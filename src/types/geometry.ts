/**
 * Geometry type definitions
 */

// Represents a 2D point with x and y coordinates
export interface Point {
  x: number;
  y: number;
}

// Represents a polygon as an array of points
export type Polygon = Point[];

// Represents a line segment defined by two points
export type Line = [Point, Point];
