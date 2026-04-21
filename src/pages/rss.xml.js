import rss from "@astrojs/rss";
import { getPosts } from "../sanity/queries/posts";

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: "Echoes",
    description: "A writing site offering works from various authors.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.publishedAt,
      link:
        post.category?.title === "One Shot"
          ? `/one-shots/${post.slug.current}/`
          : `/series/${post.series?.slug?.current}/${post.slug.current}/`,
    })),
  });
}
