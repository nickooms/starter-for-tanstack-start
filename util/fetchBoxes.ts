import type { Box } from '../types/Box/Box';

export const fetchBoxes = async (): Promise<Box[]> => {
  const res = await fetch('http://localhost:3000/api/boxes');
  if (!res.ok) throw new Error('Failed to fetch boxes');
  return res.json();
};
