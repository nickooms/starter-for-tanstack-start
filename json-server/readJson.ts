import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';

const ENCODING = 'utf-8';

export function readJson<T extends { id: string }>(filePath: string) {
  return createServerFn().handler(async () => {
    const array = JSON.parse(await fs.readFile(filePath, ENCODING));
    return {
      ids: array.map((item: T) => item.id),
      items: Object.fromEntries(array.map((item: T) => [item.id, item])),
    };
  });
}
