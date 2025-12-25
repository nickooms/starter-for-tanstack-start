import fs from 'node:fs/promises';
// import { createFileRoute } from '@tanstack/react-router';
// import { createServerFn } from '@tanstack/react-start';

export interface Group {
  id: string;
  name: string;
  boxIds: string[];
}

const GROUPS_FILE = 'data/groups.json';

export const readGroup = async (groupId: string): Promise<Group | null> => {
  const groups: Group[] = JSON.parse(await fs.readFile(GROUPS_FILE, 'utf-8'));
  return groups.find((group) => group.id === groupId) || null;
};

// export const Route = createFileRoute('/api/group')({
//   server: {
//     handlers: {
//       GET: async ({ params }: { params: { groupId: string } }) =>
//         await readGroup(params.groupId),
//     },
//   },
// });
