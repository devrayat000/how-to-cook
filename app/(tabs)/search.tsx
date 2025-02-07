import { ScrollView, TextInput } from "react-native";
import { useDeferredValue } from "react";
import { Div, Section } from "@expo/html-elements";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import useSWR from "swr";
import { searchMeals } from "@/lib/services/query";
import { ThemedH3 } from "@/components/ui/themed-text";
import { useTheme } from "@/hooks/useThemeColor";
import RecipesList from "@/components/home/recipe-list";

type SearchScreenParams = {
  query: string;
};

export default function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { query } = useLocalSearchParams<SearchScreenParams>();
  const defQuery = useDeferredValue(query);
  const { data } = useSWR(["search", defQuery], searchMeals, {
    isPaused: () => !query,
    suspense: false,
    keepPreviousData: true,
  });

  function handleChange(query: string) {
    router.setParams({ query });
  }

  return (
    <ScrollView contentContainerClassName="p-2">
      <Section className="mt-4 mb-1.5">
        <Div className="flex-row items-center justify-between gap-2 android:rounded-full ios:rounded-lg bg-slate-100 p-2">
          <AntDesign name="search1" className="!text-lg text-slate-600" />
          <TextInput
            className="flex-1 web:focus:outline-none text-base text-slate-600"
            placeholder="Search..."
            value={query ?? ""}
            onChangeText={handleChange}
          />
        </Div>
      </Section>
      <Section id="random-recipes" className="mt-4">
        <ThemedH3
          className="text-2xl text-slate-800 mb-1"
          style={theme.fonts.medium}
        >
          {!query ? "Search for recipes" : `Showing results for "${query}"`}
        </ThemedH3>
        <RecipesList horizontal={false} recipes={data?.recipes} />
      </Section>
    </ScrollView>
  );
}
