import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';

const BOXES_FILE = 'data/boxes.json';

export const readBox = createServerFn()
  .inputValidator((data: { boxId: string }) => data)
  .handler(async ({ data: { boxId } }) => {
    const boxes = JSON.parse(await fs.readFile(BOXES_FILE, 'utf-8'));
    return boxes.find((box: { id: string }) => box.id == boxId);
  });
