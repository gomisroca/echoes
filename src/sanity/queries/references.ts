import type { SanityDocument } from "@sanity/client";
import { sanityClient } from "sanity:client";

export async function getReference(params: { slug: string }) {
  const QUERY = `*[_type == "ref" && slug.current == $slug][0]{
    title,
    slug,
    body
  }`;
  const ref = await sanityClient.fetch<SanityDocument>(QUERY, params);
  return ref;
}

export async function getStaticRefPaths(params: { slug: string }) {
  const QUERY = `*[_type == "ref" && defined(slug.current)]{
    "params": {"slug": slug.current}
  }`;
  return await sanityClient.fetch(QUERY, params);
}
