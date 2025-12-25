import { readItems } from '../../../json-server/items';
import { createFileRoute } from '@tanstack/react-router';
import CSS from './items.css?url';
import { ItemsGrid } from '~/components/ItemsGrid';
import { Item } from '~/types';

export const Route = createFileRoute('/items/')({
  head: () => ({
    links: [{ rel: 'stylesheet', href: CSS }],
  }),
  loader: async () => await readItems(),
  component: RouteComponent,
});

function RouteComponent() {
  const items = Route.useLoaderData();

  return (
    <div className="min-h-screen">
      <ItemsGrid items={items} />
    </div>
  );
}
