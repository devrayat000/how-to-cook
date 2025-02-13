import { getMealCategories } from "@/lib/services/query";
import useSWR from "swr";
import { FlatList } from "react-native";
// import { Image } from "expo-image";
import { ThemedH6 } from "../ui/themed-text";
import ThemedLink from "../ui/link";
import Image from "../ui/image";
// import { AnimatedImage } from "../ui/animated";

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
    <FlatList
      horizontal
      data={data?.categories}
      keyExtractor={(category) => category.id}
      contentContainerClassName="gap-2 py-2"
      renderItem={({ item: category }) => (
        <ThemedLink
          href={{
            pathname: "/(tabs)/categories/[name]",
            params: category,
          }}
          className="web:block w-24 p-2 rounded-xl overflow-hidden border border-slate-200 bg-white"
        >
          <Image
            source={category.image}
            alt={category.name}
            className="web:block w-full aspect-video"
            // style={{ width: "100%", aspectRatio: 16 / 9 }}
            // sharedTransitionTag={`category-image:${category.image}`}
          />
          <ThemedH6
            numberOfLines={1}
            className="mt-1 my-0 text-sm text-slate-600 text-center"
          >
            {category.name}
          </ThemedH6>
        </ThemedLink>
      )}
    />
  );
}
