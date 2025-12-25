import type { Item } from '~/types/Item/Item';

export const fetchItems = async (): Promise<Item[]> => {
  const res = await fetch('../api/items');
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};
