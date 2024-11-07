import { defineField, defineType } from "sanity";

export const tagType = defineType({
  name: "tag",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
  ],
});
