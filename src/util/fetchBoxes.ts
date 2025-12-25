import type { Box } from '../types/Box/Box';

export const fetchBoxes = async (): Promise<Box[]> => {
  const res = await fetch('../api/boxes');
  if (!res.ok) throw new Error('Failed to fetch boxes');
  return res.json();
};
