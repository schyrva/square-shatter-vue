import type { Point, Polygon } from '../types/types';

/**
 * Determines which side of a line (p1 → p2) a point p0 is on.
 * This is useful for polygon clipping and determining point containment.
 *
 * @param p1 - First point of the line
 * @param p2 - Second point of the line
 * @param p0 - The point to test
 * @returns
 *   - 1  → if p0 is to the left of the line.
 *   - -1 → if p0 is to the right of the line.
 *   - 0  → if p0 lies exactly on the line.
 */
export function lineSide(p1: Point, p2: Point, p0: Point): number {
  if (!p1 || !p2 || !p0) {
    console.warn('Invalid points provided to lineSide');
    return 0;
  }

  const result = (p2.x - p1.x) * (p0.y - p1.y) - (p2.y - p1.y) * (p0.x - p1.x);

  switch (true) {
    case result > 0:
      return 1;
    case result < 0:
      return -1;
    default:
      return 0;
  }
}

/**
 * Finds the intersection point of two line segments (p1 → p2) and (p3 → p4).
 * Uses the parametric form of the line equations to find the intersection.
 *
 * @param p1 - Start point of first line segment
 * @param p2 - End point of first line segment
 * @param p3 - Start point of second line segment
 * @param p4 - End point of second line segment
 * @returns The intersection point if segments intersect, null otherwise
 */
export function segmentIntersection(p1: Point, p2: Point, p3: Point, p4: Point): Point | null {
  if (!p1 || !p2 || !p3 || !p4) {
    console.warn('Invalid points provided to segmentIntersection');
    return null;
  }

  const denom = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);

  if (Math.abs(denom) < 1e-9) {
    return null; // Lines are parallel or coincident
  }

  const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denom;
  const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denom;

  // Check if intersection is within both line segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return null;
  }

  // Calculate the intersection point
  return {
    x: p1.x + ua * (p2.x - p1.x),
    y: p1.y + ua * (p2.y - p1.y),
  };
}

/**
 * Calculates the geometric center (centroid) of a polygon.
 * The centroid is the arithmetic mean of all vertices.
 *
 * @param polygon - Array of points representing the polygon vertices
 * @returns The centroid point of the polygon
 * @throws Will log a warning if polygon has less than 3 points
 */
export function computeCentroid(polygon: Polygon): Point {
  if (!polygon || polygon.length < 3) {
    console.warn(
      'Invalid polygon provided to computeCentroid. A polygon needs at least 3 vertices.'
    );
    return { x: 0, y: 0 };
  }

  let sumX = 0;
  let sumY = 0;

  for (const p of polygon) {
    sumX += p.x;
    sumY += p.y;
  }

  return {
    x: sumX / polygon.length,
    y: sumY / polygon.length,
  };
}

/**
 * Calculates the area of a polygon using the shoelace formula (also known as the surveyor's formula).
 * Works for any simple polygon (not self-intersecting).
 *
 * @param polygon - Array of points representing the polygon vertices
 * @returns The area of the polygon
 */
export function polygonArea(polygon: Polygon): number {
  if (!polygon || polygon.length < 3) {
    console.warn('Invalid polygon provided to polygonArea. A polygon needs at least 3 vertices.');
    return 0;
  }

  let area = 0;

  for (let i = 0; i < polygon.length; i++) {
    const j = (i + 1) % polygon.length;
    area += polygon[i].x * polygon[j].y - polygon[j].x * polygon[i].y;
  }

  return Math.abs(area) / 2;
}

/**
 * Splits a polygon into two parts using a line.
 * If the line does not intersect the polygon, returns the original polygon.
 *
 * @param polygon - The polygon to split
 * @param p1 - First point of the cutting line
 * @param p2 - Second point of the cutting line
 * @returns Array of resulting polygons after the cut (1 or 2 polygons)
 */
export function cutPolygonWithLine(polygon: Polygon, p1: Point, p2: Point): Polygon[] {
  if (!polygon || polygon.length < 3 || !p1 || !p2) {
    console.warn('Invalid parameters provided to cutPolygonWithLine');
    return [polygon];
  }

  const polyA: Polygon = [];
  const polyB: Polygon = [];

  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const next = polygon[(i + 1) % polygon.length];
    const sideCurrent = lineSide(p1, p2, current);

    switch (sideCurrent) {
      case 1:
        polyA.push(current);
        break;
      case -1:
        polyB.push(current);
        break;
      case 0:
        polyA.push(current);
        polyB.push(current);
        break;
    }

    const intersect = segmentIntersection(current, next, p1, p2);
    if (intersect) {
      polyA.push(intersect);
      polyB.push(intersect);
    }
  }

  // If either resulting polygon is empty, return the original
  if (polyA.length < 3 || polyB.length < 3) {
    return [polygon];
  }

  return [polyA, polyB];
}
