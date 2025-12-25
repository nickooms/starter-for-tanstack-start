import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';
import type { Box } from '../src/types';

const BOXES_FILE = 'data/boxes.json';

export const readBoxes = createServerFn().handler(
  async (): Promise<{
    ids: string[];
    items: Record<string, Box>;
  }> => {
    const boxes = JSON.parse(await fs.readFile(BOXES_FILE, 'utf-8'));
    const ids = boxes.map((box: Box) => box.id);
    const items = Object.fromEntries(boxes.map((box: Box) => [box.id, box]));
    return { ids, items };
  }
);
