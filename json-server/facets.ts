import { createServerFn } from '@tanstack/react-start';
import fs from 'node:fs/promises';
import { FACETS_FILE, ENCODING } from './constants';

export const readFacets = createServerFn().handler(async () =>
  JSON.parse(await fs.readFile(FACETS_FILE, ENCODING))
);

export const writeFacets = createServerFn({ method: 'POST' }).handler(async (facets: unknown) => {
  await fs.writeFile(FACETS_FILE, JSON.stringify(facets, null, 2), ENCODING);
});
