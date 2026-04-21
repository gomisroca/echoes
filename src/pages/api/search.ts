import type { APIRoute } from "astro";
import { searchPosts } from "@/sanity/queries/posts";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const searchTerm = url.searchParams.get("q") ?? "";
  if (!searchTerm.trim()) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    });
  }
  const posts = await searchPosts(searchTerm);
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
};
