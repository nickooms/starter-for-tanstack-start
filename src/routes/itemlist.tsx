import { createFileRoute } from '@tanstack/react-router';
import { ItemList } from '~/components/Item/ItemList';
import { fetchItems } from '~/util/fetchItems';
import { fetchBoxes } from '~/util/fetchBoxes';

export const RouteComponent = () => {
  const items = Route.useLoaderData();
  if (!items) return <div>Loading...</div>;
  return <ItemList items={items} columns={[3, 5, 8]} gap="16px" />;
};

export const Route = createFileRoute('/itemlist')({
  beforeLoad: async ({ context: { items = [], boxes = []} }) => ({
    items: items.length === 0 ? await fetchItems() : items,
    boxes: boxes.length === 0 ? await fetchBoxes() : boxes,
  }),
  loader: async ({ context }) => context.items,
  component: RouteComponent,
});
