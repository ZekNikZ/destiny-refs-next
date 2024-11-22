"use client";

import { AsideComponentProvider } from "@/components/AsideComponentContext";
import { useGlobalData } from "@/data/useGlobalData";
import { MantineProvider } from "@mantine/core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryCache, isServer } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Persister, PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

interface Props {
  children: React.ReactNode;
}

dayjs.extend(duration);
dayjs.extend(utc);

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24,
        queryFn: async ({ queryKey: [url], meta }) => {
          const headers: HeadersInit = {};

          if (meta?.includeApiKey) {
            headers["X-API-Key"] = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;
          }

          if ((url as string).includes("Manifest")) {
            useGlobalData.setState({
              bungieApiLoading: true,
            });
          }

          const data = await (
            await fetch(`${url}`, {
              headers,
            })
          ).json();

          if ((url as string).includes("Manifest")) {
            useGlobalData.setState({
              bungieApiLoading: false,
            });
          }

          return data;
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        console.error(error);
        useGlobalData.setState({ bungieApiError: true, bungieApiLoading: false });
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;
let browserPersister: Persister | undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}

function getPersister() {
  if (isServer) {
    return createSyncStoragePersister({
      storage: undefined,
    });
  } else {
    if (!browserPersister) {
      browserPersister = createSyncStoragePersister({
        storage: window.localStorage,
      });
    }
    return browserPersister;
  }
}

export default function Providers({ children }: Props) {
  const queryClient = getQueryClient();
  const persister = getPersister();

  return (
    <React.StrictMode>
      <AppRouterCacheProvider>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          <MantineProvider forceColorScheme="dark">
            <AsideComponentProvider>{children}</AsideComponentProvider>
          </MantineProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </PersistQueryClientProvider>
      </AppRouterCacheProvider>
    </React.StrictMode>
  );
}
