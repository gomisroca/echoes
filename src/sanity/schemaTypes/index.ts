import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./author";
import { blockContentType } from "./blockContent";
import { categoryType } from "./category";
import { postType } from "./post";
import { tagType } from "./tag";
import { seriesType } from "./series";
import { referenceType } from "./reference";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    blockContentType,
    categoryType,
    tagType,
    seriesType,
    postType,
    referenceType,
  ],
};
