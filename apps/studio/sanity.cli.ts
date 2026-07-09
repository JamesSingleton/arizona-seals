import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
// const host = process.env.HOST_NAME;

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  studioHost: "arizona-seals",
  typegen: {
    path: "../../packages/sanity/src/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../../packages/sanity/src/sanity.types.ts",
    overloadClientMethods: true,
  },

  deployment: {
    autoUpdates: false,
  },
});
