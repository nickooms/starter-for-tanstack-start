import { createFileRoute } from '@tanstack/react-router';
import fs from 'node:fs';
import process from 'node:process';
import path from 'node:path';
// import type { Item } from '../../types/Box/Box';

export const Route = createFileRoute('/api/boxes')({
  server: {
    handlers: {
      GET: async () => {
        console.log('Current working directory:', process.cwd());
        const filePath = path.join(process.cwd(), 'data', 'boxes.json');
        const boxes = await fs.promises.readFile(filePath, 'utf-8').then(JSON.parse);
        return new Response(JSON.stringify(boxes), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
    },
  },
});
