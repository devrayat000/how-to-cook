import { getMealCategories } from "@/lib/services/query";
import useSWR from "swr";
import { Link } from "expo-router";

export default function RecipeCategories() {
  const { data, error } = useSWR(["/api/category"], getMealCategories, {
    revalidateOnFocus: false,
    // refreshInterval: Number.MAX_SAFE_INTEGER,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateIfStale: false,
  });

  return (
    <div className="flex flex-nowrap w-full overflow-y-hidden overflow-x-auto gap-1 py-4 px-2">
      {data?.categories.map((category) => (
        <Link
          key={category.id}
          href={{
            pathname: "/categories/[name]",
            params: {
              name: category.name,
              description: category.description,
              image: category.image,
            },
          }}
        >
          <div className="w-24 p-0.5 rounded-xl border border-slate-200">
            <img
              src={category.image}
              alt={category.name}
              className="w-full aspect-video object-contain rounded-t-xl"
            />
            <div className="p-2">
              <h2 className="text-sm text-center line-clamp-1">
                {category.name}
              </h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
