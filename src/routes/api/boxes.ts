import { createFileRoute } from '@tanstack/react-router';
import fs from 'node:fs';
// import type { Item } from '../../types/Box/Box';

export const Route = createFileRoute('/api/boxes')({
  server: {
    handlers: {
      GET: async () => {
        const boxes = await fs.promises.readFile('./data/boxes.json', 'utf-8').then(JSON.parse);
        return new Response(JSON.stringify(boxes), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
    },
  },
});
