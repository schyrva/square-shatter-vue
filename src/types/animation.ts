/**
 * Animation type definitions
 */

import { Point } from './geometry';

// Represents a fragment of the shattered square
export interface Fragment {
  vertices: Point[];
  centroid: Point;
  localOffsets: Point[];
  color: string;
}
