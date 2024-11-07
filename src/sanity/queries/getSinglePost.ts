import type { SanityDocument } from "@sanity/client";
import { sanityClient } from "sanity:client";

export async function getSinglePost(params: { slug: string }) {
  const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await sanityClient.fetch<SanityDocument>(POST_QUERY, params);

  return post;
}

export async function getStaticPostPaths(params: { slug: string }) {
  const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{
    "params": {"slug": slug.current}
  }`;
  return await sanityClient.fetch(SLUGS_QUERY, params);
}
