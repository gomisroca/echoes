import { type SanityDocument } from "@sanity/client";
import { useState } from "react";
import { sanityClient } from "sanity:client";
import SanityImage from "./SanityImage.astro";

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
    const query = `*[_type == "post" && title match "${searchTerm}*"] | order(publishedAt desc) [0...10]
    {
      title, 
      slug, 
      series->{slug}, 
      category,
      mainImage{
        asset->{
          url
        },
        alt
      },
      publishedAt,
    }`;
    const data = await sanityClient.fetch<SanityDocument[]>(query);
    setResults(data);
    console.log(data);
    if (data.length === 0) {
      setFormState((prev) => ({ ...prev, message: "No results found" }));
    } else {
      setFormState((prev) => ({ ...prev, message: "" }));
    }
    setFormState((prev) => ({ ...prev, isSubmitting: false }));
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="bg-zinc-100 dark:bg-zinc-900 p-4 ring-2 ring-emerald-200 rounded-xl w-1/3 mx-auto"
      />
      <button
        onClick={() => handleSearch()}
        disabled={formState.isSubmitting}
        className="w-1/3 mx-auto ring-2 ring-emerald-300 rounded-xl p-4 duration-200 hover:ring-emerald-400 hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-110 active:shadow-emerald-600/40 active:duration-100"
      >
        Search
      </button>
      {<p>{formState.message}</p>}
      <div className="flex flex-col gap-4 w-full">
        {results.map((post) => (
          <div key={post._id}>
            <a
              href={
                post.category === "One Shot"
                  ? `/one-shots/${post.slug.current}`
                  : `/series/${post.series.slug.current}/${post.slug.current}`
              }
              className="group relative rounded-xl ring-2 ring-emerald-300 flex flex-row justify-center items-center mx-auto duration-200 hover:ring-emerald-400 hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-110 active:shadow-emerald-600/40 active:duration-100"
            >
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                width={500}
                height={500}
                className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-xl"
              />
              <div className="p-4 flex flex-col justify-start items-start h-full flex-1 gap-4 z-10 m-4 rounded-xl bg-zinc-100/60 dark:bg-zinc-900/60 backdrop-blur-sm group-hover:bg-zinc-100 dark:group-hover:bg-zinc-900 duration-200">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
