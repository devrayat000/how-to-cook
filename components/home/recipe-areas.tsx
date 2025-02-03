import { getMealAreas } from "@/lib/services/query";
import useSWR from "swr";
import { FlatList, Text } from "react-native";
import ThemedLink from "../ui/link";

export default function RecipeAreas() {
  const { data, error } = useSWR(["/api/area"], getMealAreas, {
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
      data={data?.areas}
      keyExtractor={(area) => area.area}
      contentContainerClassName="gap-2 py-2"
      renderItem={({ item: { area } }) => (
        <ThemedLink
          href={{
            pathname: "/(tabs)/areas/[name]",
            params: area,
          }}
          className="web:block py-2 px-3 rounded-xl overflow-hidden border border-slate-200 bg-white justify-center items-center"
        >
          <Text className="web:block text-center">{area}</Text>
        </ThemedLink>
      )}
    />
  );
}
