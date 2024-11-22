import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { Activity } from "./types";
import { LootJson, RotationsJson } from "./json-types";

interface GlobalState {
  bungieApiError: boolean;
  bungieApiLoading: boolean;
  activities: Activity[];
  rotations: RotationsJson;
  loot: LootJson;
}

export const useGlobalData = create<GlobalState>()(
  devtools(
    persist(
      (_set) => ({
        bungieApiError: false,
        bungieApiLoading: false,
        activities: [],
        rotations: {
          activityRotations: [],
          challengeRotations: [],
        },
        loot: {
          sharedLoot: {
            loot: {},
            pools: {},
            sets: {},
          },
          doubleLootOverrides: [],
        },
      }),
      {
        name: "global-data",
      }
    )
  )
);
