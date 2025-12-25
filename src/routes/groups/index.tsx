import { createFileRoute, Link } from '@tanstack/react-router';
import { readGroups, readBoxes } from '../../../json-server';
import type { Group as GroupType } from '../../types';
import { GroupCard } from '../../components/GroupCard';
import './groups.css';

export const Route = createFileRoute('/groups/')({
  // head: () => ({
  //   links: [{ rel: 'stylesheet', href: 'groups.css?url' }],
  // }),
  loader: async () => {
    const [groups, boxes, items] = await Promise.all([readGroups(), readBoxes(), readItems()]);
    return { groups, boxes, items };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { groups, boxes, items } = Route.useLoaderData();

  if (!boxes || !groups || !items) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-0 px-0 mx-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {groups.map(({ id, name, boxIds }: GroupType) => (
          <GroupCard key={id} id={id} name={name} boxIds={boxIds} boxes={boxes} />
        ))}
      </div>
    </section>
  );
}
