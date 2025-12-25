import type { Group } from '~/types';
import { readJson, writeJson } from '.';

export const readGroups = readJson<Group>('groups');

// export const writeGroups = writeJson('groups');
