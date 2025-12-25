import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';
import type { Item } from '../src/types';

const ITEMS_FILE = 'data/items.json';

export const readItems = createServerFn().handler(
  async (): Promise<{
    ids: string[];
    items: Record<string, Item>;
  }> => {
    let itemList: Item[] = [];
    try {
      itemList = JSON.parse(await fs.readFile(ITEMS_FILE, 'utf-8')) as Item[];
    } catch (e) {
      console.error('Error reading items file:', JSON.stringify(e, null, 2));
      throw e;
    }
    const ids = itemList.map((item: Item) => String(item.id));
    const items = Object.fromEntries(itemList.map((item: Item) => [item.id, item]));
    return { ids, items };
  }
);
