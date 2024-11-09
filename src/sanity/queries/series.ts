import { sanityClient } from "sanity:client";

export async function getAllSeries() {
  const QUERY = `*[_type == "series"]{
    title,
    headerImage{
      asset->{
        url
      },
      alt
    },
    slug,
    description,
  }`;
  const series = await sanityClient.fetch(QUERY);
  return series;
}

export async function getSingleSeries(params: { slug: string }) {
  const { slug } = params;
  const QUERY = `
    *[_type == "series" && slug.current == $slug]{
    title,
    "posts": *[_type == "post" && _id in ^.posts[]._ref] | order(seriesOrder asc) {
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
    }
  }[0]`;
  const series = await sanityClient.fetch(QUERY, { slug });
  return series;
}

export async function getStaticSeriesPaths(params: { slug: string }) {
  const QUERY = `*[_type == "series" && defined(slug.current)]{
    "params": {"slug": slug.current}
  }`;
  return await sanityClient.fetch(QUERY, params);
}
