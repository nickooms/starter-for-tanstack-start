import { createFileRoute } from '@tanstack/react-router';
import { BoxList } from '~/components/Box/BoxList';
// import type {Box as BoxType} from '~/types/Box/Box';
import { fetchBoxes } from '~/util/fetchBoxes';

export const Route = createFileRoute('/boxlist')({
  loader: async (/* { context: { fetchBoxes } }*/) => fetchBoxes(),
  component: RouteComponent,
});

export function RouteComponent() {
  const boxes = Route.useLoaderData();
  return <BoxList boxes={boxes} columns={[3, 5, 8]} gap="16px" />;
}
