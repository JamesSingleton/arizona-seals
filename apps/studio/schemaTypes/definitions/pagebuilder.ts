import { defineArrayMember, defineType } from "sanity";

import { pageBuilderBlocks } from "../blocks";

export const pagebuilderBlockTypes = pageBuilderBlocks.map(({ name }) => ({
  type: name,
}));

const BLOCK_PREVIEW_IMAGES: Record<string, string> = {
  hero: "/hero.png",
  cta: "/cta.png",
};

export const pageBuilder = defineType({
  name: "pageBuilder",
  type: "array",
  of: pagebuilderBlockTypes.map((block) => defineArrayMember(block)),
  options: {
    insertMenu: {
      views: [
        {
          name: "grid",
          previewImageUrl: (schemaTypeName) =>
            BLOCK_PREVIEW_IMAGES[schemaTypeName],
        },
        { name: "list" },
      ],
    },
  },
});
