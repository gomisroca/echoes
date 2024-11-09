import { type SanityDocument } from "@sanity/client";
import { useState } from "react";
import { sanityClient } from "sanity:client";
import SanityImage from "./SanityImage.astro";
import { searchPosts } from "@/sanity/queries/posts";

interface FormState {
  isSubmitting: boolean;
  message: string;
}

const INITIAL_FORMSTATE: FormState = {
  isSubmitting: false,
  message: "",
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SanityDocument[]>([]);
  const [formState, setFormState] = useState<FormState>(INITIAL_FORMSTATE);

  const handleSearch = async () => {
    setFormState((prev) => ({ ...prev, isSubmitting: true }));
    const data = await searchPosts(searchTerm);
    setResults(data);
    if (data.length === 0) {
      setFormState((prev) => ({ ...prev, message: "No results found" }));
    } else {
      setFormState((prev) => ({ ...prev, message: "" }));
    }
    setSearchTerm("");
    setFormState((prev) => ({ ...prev, isSubmitting: false }));
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="mx-auto w-full rounded-xl bg-zinc-100 p-4 ring-2 ring-emerald-200 transition duration-200 ease-in-out focus-visible:scale-105 focus-visible:shadow-lg focus-visible:shadow-emerald-600/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-300/25 lg:w-1/3 dark:bg-zinc-900"
      />
      <button
        onClick={() => handleSearch()}
        disabled={formState.isSubmitting}
        className="mx-auto w-full rounded-xl p-4 ring-2 ring-emerald-300 duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/20 hover:ring-emerald-400 active:scale-110 active:shadow-emerald-600/40 active:duration-100 lg:w-1/3"
      >
        Search
      </button>
      {<p>{formState.message}</p>}
      <div className="flex w-full flex-col gap-4">
        {results.map((post) => (
          <div key={post._id}>
            <a
              href={
                post.category.title === "One Shot"
                  ? `/one-shots/${post.slug.current}`
                  : post.series
                    ? `/series/${post.series.slug.current}/${post.slug.current}`
                    : "/"
              }
              className="group relative mx-auto flex flex-row items-center justify-center rounded-xl ring-2 ring-emerald-300 duration-200 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/20 hover:ring-emerald-400 active:scale-110 active:shadow-emerald-600/40 active:duration-100"
            >
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                width={500}
                height={500}
                className="absolute left-0 top-0 h-full w-full rounded-xl object-cover object-center"
              />
              <div className="z-10 m-2 flex h-full flex-1 flex-col items-start justify-start gap-2 rounded-xl bg-zinc-100/60 p-4 backdrop-blur-sm duration-200 ease-in-out group-hover:bg-zinc-100 dark:bg-zinc-900/60 dark:group-hover:bg-zinc-900">
                <h2>{post.title}</h2>
                <div>
                  {post.category.title === "One Shot" ? (
                    <p className="font-semibold">One Shot</p>
                  ) : (
                    <p className="font-semibold">{post.series.title}</p>
                  )}
                  <p className="text-sm">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
