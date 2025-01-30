import { getMealCategories } from "@/lib/services/query";
import useSWR from "swr";
import { Link } from "expo-router";
import { RippleButton } from "../ui/ripple-button";
import { Box } from "../ui/box";

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
    <Box className="flex flex-row flex-nowrap w-full overflow-y-hidden overflow-x-auto gap-1 py-4 px-2">
      {data?.categories.map((category) => (
        <RippleButton
          key={category.id}
          rippleColor="#ADD8E6"
          // asChild
          className="shrink-0 w-24 rounded-xl border border-slate-200"
        >
          <Link
            href={{
              pathname: "/categories/[name]",
              params: {
                name: category.name,
                description: category.description,
                image: category.image,
              },
            }}
            className="p-0.5 block"
          >
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
          </Link>
        </RippleButton>
      ))}
    </Box>
  );
}
