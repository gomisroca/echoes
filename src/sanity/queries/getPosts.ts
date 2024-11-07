import type { SanityDocument } from "@sanity/client";
import { sanityClient } from "sanity:client";

export default async function getPosts(category?: string) {
  console.log("Fetching posts with category:", category);
  const POSTS_QUERY = `*[
  _type == "post" 
  ${category ? `&& references(*[_type == "category" && title ==  "${category}"]._id)` : ""}]
  {
    title,
    slug,
    author->{
      name
    },
    mainImage{
      asset->{
        url
      },
      alt
    },
    publishedAt,
    body
  }`;

  const posts = await sanityClient.fetch<SanityDocument[]>(POSTS_QUERY);
  console.log("Retrieved posts:", posts);
  return posts;
}
