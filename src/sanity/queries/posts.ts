import type { SanityDocument } from "@sanity/client";
import { sanityClient } from "sanity:client";

export async function getPosts(category?: string) {
  const QUERY = `*[
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
    category->{title},
    series->{
      slug,
      title
    },
    publishedAt,
    body
  }`;

  const posts = await sanityClient.fetch<SanityDocument[]>(QUERY);
  return posts;
}

export async function getLatestPosts() {
  const QUERY = `*[
  _type == "post"][0..4]
  | order(publishedAt desc)
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
    category->{title},
    series->{
      slug,
      title
    },
    publishedAt,
    body
  }`;

  const posts = await sanityClient.fetch<SanityDocument[]>(QUERY);
  return posts;
}

export async function getSinglePost(params: { slug: string }) {
  const QUERY = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await sanityClient.fetch<SanityDocument>(QUERY, params);

  return post;
}

export async function getStaticPostPaths(params: { slug: string }) {
  const QUERY = `*[_type == "post" && defined(slug.current)]{
    "params": {"slug": slug.current}
  }`;
  return await sanityClient.fetch(QUERY, params);
}

export async function searchPosts(searchTerm: string) {
  const QUERY = `*[_type == "post" && title match "${searchTerm}*"] | order(publishedAt desc) [0...10]
    {
      title, 
      slug, 
      category->{title},
      series->{
        slug,
        title
      },
      mainImage{
        asset->{
          url
        },
        alt
      },
      publishedAt,
    }`;

  const posts = await sanityClient.fetch<SanityDocument[]>(QUERY);
  return posts;
}
