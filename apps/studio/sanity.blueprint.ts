import {
  defineBlueprint,
  defineSyncTagInvalidateFunction,
} from "@sanity/blueprints";

export default defineBlueprint({
  resources: [
    defineSyncTagInvalidateFunction({
      event: {
        resource: {
          id: "nck2qq2n.production",
          type: "dataset",
        },
      },
      name: "cache-invalidate",
    }),
  ],
});
