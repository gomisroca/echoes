import type { SanityDocument } from "@sanity/client";
import { sanityClient } from "sanity:client";

export default async function getPosts() {
  const POSTS_QUERY = `*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, mainImage}`;

  const posts = await sanityClient.fetch<SanityDocument[]>(POSTS_QUERY);
  return posts;
}
