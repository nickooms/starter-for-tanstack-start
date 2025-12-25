import { createFileRoute } from '@tanstack/react-router';
import { readGroup, readBoxes } from '../../../json-server';
// import type { Group as GroupType } from '../api/groups';
// import type { Box as BoxType } from '../api/boxes';
import { GroupCard } from '../../components/GroupCard';

export const Route = createFileRoute('/groups/$groupId')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const [group, boxes] = await Promise.all([readGroup(params.groupId), readBoxes()]);
    return { group, boxes };
  },
});

function RouteComponent() {
  const { group, boxes } = Route.useLoaderData();
  const { id, name, boxIds } = group || {};

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="py-6 px-6 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <GroupCard id={id!} name={name!} boxIds={boxIds!} boxes={boxes} />
          {/* <div
            key={id}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
            title={`Group ${id} ${name}`}
          >
            <div className="flex">
              <h3 className="flex-1 text-xl font-semibold text-cyan-500/50 mb-3">
                {name}
              </h3>
              {boxIds && (
                <h4 className="text-right flex-1 text-large text-gray-400 mb-2">
                  {boxIds.length} Dozen
                </h4>
              )}
            </div>
            <p>
              <ul>
                {boxIds?.map(getBoxById).map(
                  (box) =>
                    (box && (
                      <li className="text-gray-200" key={box.id}>
                        {box.name}
                      </li>
                    )) ??
                    null,
                )}
              </ul>
            </p>
          </div> */}
        </div>
      </section>
    </div>
  );
}
