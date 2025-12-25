import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';

const ENCODING = 'utf-8';

export const writeJson = (fileName: string) => (data: any) =>
  createServerFn({ method: 'POST' }).handler(async (data: unknown) => {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2), ENCODING);
  });
