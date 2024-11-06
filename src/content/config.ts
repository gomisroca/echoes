import { defineCollection, reference, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(false),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    author: reference("authors").optional(),
  }),
});
const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    blogs: z.array(reference("blog")),
  }),
});

export const collections = { blog, authors };
