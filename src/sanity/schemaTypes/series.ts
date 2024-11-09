import { defineField, defineType } from "sanity";

export const seriesType = defineType({
  name: "series",
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
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "headerImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Header Image",
        },
      ],
    }),
    defineField({
      name: "posts",
      title: "Posts in Series",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      validation: (Rule) => Rule.unique(),
      description: "Add posts in the order they should appear in the series",
    }),
  ],
  preview: {
    select: {
      title: "title",
      posts: "posts",
    },
    prepare({ title, posts = [] }) {
      const postCount = posts?.length || 0;
      return {
        title,
        subtitle: `${postCount} post${postCount === 1 ? "" : "s"} in series`,
      };
    },
  },
});
