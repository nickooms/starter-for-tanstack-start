import { createFileRoute } from '@tanstack/react-router';
import fs from 'node:fs';
import type { Item } from '../../types/Item/Item';

export const Route = createFileRoute('/api/items')({
  server: {
    handlers: {
      GET: async () => {
        const items = await fs.promises
          .readFile('data/items.json', 'utf-8')
          .then(JSON.parse)
          .then((items) =>
            items.map(
              ({ id, title, photos, total_item_price, item_box }: any): Item => ({
                id,
                title,
                photos: photos.map((photo: any) => ({ id: photo.id, url: photo.url })),
                thumbnails: photos.map((photo: any) =>
                  photo.thumbnails.map((thumb: any) => thumb.url)
                ),
                lines: [item_box.first_line, item_box.second_line],
                price: total_item_price.amount,
              })
            )
          );
        return new Response(JSON.stringify(items), {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      },
    },
  },
});
