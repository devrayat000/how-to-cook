import { getRandomMeals } from "@/lib/services/query";
import useSWR from "swr";
import { Link } from "expo-router";
import RecipesList from "./recipe-list";

export default function RandomRecipes() {
  const { data, error } = useSWR(["/api/random", 5], getRandomMeals, {
    revalidateOnFocus: false,
    // refreshInterval: Number.MAX_SAFE_INTEGER,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateIfStale: false,
  });

  return <RecipesList recipes={data?.recipes} />;
}
