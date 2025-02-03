import { ThemedP } from "@/components/ui/themed-text";
import useSWR from "swr";
import { getMealById } from "@/lib/services/query";
import { useGlobalSearchParams } from "expo-router";

export default function instructions() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data, error } = useSWR(["/api/meal", id], getMealById);

  return <ThemedP>{data?.recipe.instructions}</ThemedP>;
}
