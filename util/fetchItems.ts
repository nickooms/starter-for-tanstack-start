import type { Item } from '~/types/Item/Item';

export const fetchItems = async (): Promise<Item[]> => {
  const res = await fetch('http://localhost:3000/api/items');
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
};
