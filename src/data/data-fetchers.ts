import { ActivitiesJson, ActivityJson, LootJson, RotationsJson } from "./json-types";
import { promises as fs } from "fs";
import { applyLootRefs, generateActivityMetadata } from "./data-helpers";
import { cwd } from "process";

async function readJsonFile<T>(path: string): Promise<T> {
  const fileContents = await fs.readFile(path, "utf8");
  return JSON.parse(fileContents);
}

export async function getActivity(activityId: string): Promise<ActivityJson> {
  return await readJsonFile(`${cwd()}/src/data/json/activities/${activityId}.json`);
}

export async function getLoot(): Promise<LootJson> {
  return await readJsonFile(`${cwd()}/src/data/json/loot.json`);
}

export async function getRotations(): Promise<RotationsJson> {
  return await readJsonFile(`${cwd()}/src/data/json/rotations.json`);
}

export async function getActivities(): Promise<ActivitiesJson> {
  return await readJsonFile(`${cwd()}/src/data/json/activities.json`);
}

export async function getAllData() {
  const [rotations, loot, activitiesJson] = await Promise.all([
    getRotations(),
    getLoot(),
    getActivities(),
  ]);

  const activities = await Promise.all(
    activitiesJson.activities.map((id) =>
      getActivity(id)
        .then((json) => applyLootRefs(json.activity, loot.sharedLoot))
        .then(generateActivityMetadata)
    )
  );

  return {
    activities,
    rotations,
    loot,
  };
}
