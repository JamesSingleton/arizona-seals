import {
  defineBlueprint,
  defineSyncTagInvalidateFunction,
} from "@sanity/blueprints";

// Lives at the repo root next to pnpm-lock.yaml so the Blueprints CLI detects
// pnpm (catalog:/workspace: protocols). Run all `sanity blueprints` and
// `sanity functions` commands from the repo root.
// https://www.sanity.io/docs/blueprints/project-layout-and-monorepos
export default defineBlueprint({
  resources: [
    defineSyncTagInvalidateFunction({
      name: "cache-invalidate",
      src: "./apps/functions/cache-invalidate",
      event: {
        resource: {
          type: "dataset",
          id: "nck2qq2n.production",
        },
      },
    }),
  ],
});
