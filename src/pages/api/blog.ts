import type { APIRoute } from "astro";
import supabase from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const title = data.get("title");
  const author = data.get("author");
  const content = data.get("content");

  if (!title || !author || !content) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("Post")
    .insert([{ title: title, author: author, content: content }]);

  if (error) {
    console.error("Error inserting data:", error.message);
    return new Response(
      JSON.stringify({
        message: "Error inserting data",
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};