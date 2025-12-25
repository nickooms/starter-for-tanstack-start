import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';

const GROUPS_FILE = 'data/groups.json';
const ENCODING = 'utf-8';

export const readGroups = createServerFn().handler(async () =>
  JSON.parse(await fs.readFile(GROUPS_FILE, ENCODING)),
);

export const writeGroups = createServerFn({ method: 'POST' }).handler(
  async (groups: unknown) => {
    await fs.writeFile(GROUPS_FILE, JSON.stringify(groups, null, 2), ENCODING);
  },
);
