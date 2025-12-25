/// <reference types="vite/client" />
import React from 'react';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import fontsourceVariableRobotoCss from '@fontsource-variable/roboto?url';
import { theme } from '~/setup/theme';
import { Header } from '~/components/Header';
import { fetchItems } from '~/util/fetchItems';
import { fetchBoxes } from '~/util/fetchBoxes';
import { Item } from '~/types/Item/Item';
import { Box } from '~/types/Box/Box';

interface MyRouterContext {
  items: Item[];
  boxes: Box[];
  // queryClient: QueryClient;
  // fetchItems: typeof fetchItems;
  // fetchBoxes: typeof fetchBoxes;
}

// const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    links: [
      { rel: 'stylesheet', href: fontsourceVariableRobotoCss },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    ],
  }),
  // context: { fetchItems, fetchBoxes },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const emotionCache = createCache({ key: 'css' });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <Providers>
          <Header />

          <Container component="main">{children}</Container>
        </Providers>

        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
