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
  const QUERY = `*[
    _type == "post"
    && references(*[_type == "series" && slug.current == $slug]._id)
  ]{
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
  const SERIES_QUERY = `*[_type == "series" && slug.current == $slug][0]{
    title,
    description,
  }`;
  const posts = await sanityClient.fetch(QUERY, { slug });
  const series = await sanityClient.fetch(SERIES_QUERY, { slug });
  return { title: series.title, description: series.description, posts };
}

export async function getStaticSeriesPaths(params: { slug: string }) {
  const QUERY = `*[_type == "series" && defined(slug.current)]{
    "params": {"slug": slug.current}
  }`;
  return await sanityClient.fetch(QUERY, params);
}
