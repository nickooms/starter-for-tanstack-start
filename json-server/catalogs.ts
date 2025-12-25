import fs from 'node:fs/promises';
import { createServerFn } from '@tanstack/react-start';
import { CATALOGS_FILE, FACETS_FILE, ENCODING } from './constants';
import { CatalogItem } from '~/types';

const traverse = (
  obj: CatalogItem,
  fn: (node: CatalogItem, parent?: CatalogItem | null) => unknown,
  parent?: CatalogItem | null
) => {
  fn(obj, parent);
  if (typeof obj === 'object' && obj !== null) {
    if (!Array.isArray(obj)) {
      if (obj.catalogs !== null) {
        if (Array.isArray(obj.catalogs)) {
          for (const child of obj.catalogs) {
            traverse(child, fn, obj);
          }
        }
      }
    }
  }
};

export const readCatalogs = createServerFn().handler(async () => {
  console.clear();
  const catalogs = JSON.parse(await fs.readFile(CATALOGS_FILE, ENCODING));
  const { catalogs: facets } = JSON.parse(await fs.readFile(FACETS_FILE, ENCODING));
  traverse(catalogs, (catalog, parent) => {
    // console.log((catalog as any).code);
    const facet = facets.find((facet: { id: number; count: number }) => facet.id === catalog.id);
    // const count = facet ? facet.count : 0;
    // if (facet) {
    //   console.log(facet.count);
    //   (catalog as any).count = facet.count;
    // }
    const count = (catalog.count ?? 0) + (facet?.count ?? 0);
    catalog.count = count;
    if (parent) {
      parent.count = (parent.count ?? 0) + count;
    }
    // return count;
  });
  // console.log(JSON.stringify(catalogs, null, 2));
  return catalogs;
});

export const writeCatalogs = createServerFn({ method: 'POST' }).handler(
  async (catalogs: unknown) => {
    await fs.writeFile(CATALOGS_FILE, JSON.stringify(catalogs, null, 2), ENCODING);
  }
);
