import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';
import type { Box } from '../src/types';
import { readJson } from '.';

const BOXES_FILE = 'data/boxes.json';

export const readBoxes = readJson<Box>(BOXES_FILE);
// export function readBoxes() {
//   return createServerFn().handler(
//     async (): Promise<{
//       ids: string[];
//       items: Record<string, Box>;
//     }> => {
//       const boxes = JSON.parse(await fs.readFile(BOXES_FILE, 'utf-8'));
//       return {
//         ids: boxes.map((box: Box) => box.id),
//         items: Object.fromEntries(boxes.map((box: Box) => [box.id, box])),
//       };
//     }
//   );
// }
