import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
// import { fetchItems } from './util/fetchItems';
// import { fetchBoxes } from './util/fetchBoxes';

export function getRouter() {
  const router = createRouter({
    context: { items: [], boxes: [] },
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: (err) => <p>{err.error.stack}</p>,
    defaultNotFoundComponent: () => <p>not found</p>,
    scrollRestoration: true,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
