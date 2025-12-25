import { readBox } from 'json-server/box';
import { Link, createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/NotFound';
import { PostErrorComponent } from '~/components/PostError';
import { ItemsGrid } from '~/components/ItemsGrid';

export const Route = createFileRoute('/boxes/$boxId')({
  loader: ({ params: { boxId } }) => readBox({ data: { boxId } }),
  component: RouteComponent,
  errorComponent: PostErrorComponent,
  notFoundComponent: () => <NotFound>Box not found</NotFound>,
});

function RouteComponent() {
  const box = Route.useLoaderData();

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const itemId = event.dataTransfer.getData('text/plain');
    if (!itemId || !box.id) return;
    items.items[itemId].box_id = box.id;
    box.itemIds.push(itemId);
    console.log(items.items[itemId]);
  };

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.style.backgroundColor = 'transparent';
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.preventDefault();
  };

  const itemsList = {
    ids: box.itemIds,
    items: Object.fromEntries(box.itemIds.map((itemId: number) => [itemId, items.items[itemId]])),
  };

  return (
    <div
      style={{ flex: 1 }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ItemsGrid items={itemsList} columns={[1, 2, 2]} gap="8px" />
    </div>
  );
}
