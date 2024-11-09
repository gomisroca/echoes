import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
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
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "category",
      type: "reference",
      to: { type: "category" },
    }),
    defineField({
      name: "relatedPosts",
      type: "array",
      of: [{ type: "reference", to: { type: "post" } }],
      hidden: ({ parent, value }) => {
        return (
          parent?.category?._ref !== "605aeca9-bd29-4f35-a7eb-98ed764e93de"
        );
      },
    }),
    defineField({
      name: "series",
      type: "reference",
      to: { type: "series" },
      hidden: ({ parent, value }) => {
        return (
          parent?.category?._ref === "605aeca9-bd29-4f35-a7eb-98ed764e93de"
        );
      },
    }),
    defineField({
      name: "seriesOrder",
      type: "number",
      title: "Order in Series",
      description: "Position of this post in the series (optional)",
      validation: (Rule) => Rule.integer().positive(),
      hidden: ({ document }) => !document?.series,
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
      seriesTitle: "series.title",
      seriesOrder: "seriesOrder",
      categoryTitle: "category.title",
    },
    prepare(selection) {
      const { author, seriesTitle, seriesOrder, categoryTitle } = selection;
      const subtitle = [
        author && `by ${author}`,
        categoryTitle === "One Shot" && "One Shot",
        seriesTitle && seriesOrder && `Part ${seriesOrder} of ${seriesTitle}`,
      ]
        .filter(Boolean)
        .join(" • ");
      return { ...selection, subtitle };
    },
  },
});
