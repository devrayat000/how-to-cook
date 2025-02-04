import RecipesList from "@/components/home/recipe-list";
import Head from "@/components/ui/head";
import { ThemedH1 } from "@/components/ui/themed-text";
import { useTheme } from "@/hooks/useThemeColor";
import { getMealsByArea } from "@/lib/services/query";
import { Main, Section } from "@expo/html-elements";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import useSWR from "swr";

type AreaParams = {
  name: string;
  image?: string;
  description?: string;
};

export default function AreaScreen() {
  const { name } = useLocalSearchParams<AreaParams>();
  const theme = useTheme();

  return (
    <ScrollView contentContainerClassName="p-2">
      <Head>
        <title>{name} - Area</title>
      </Head>
      <Main>
        <Section>
          <ThemedH1 className="text-3xl" style={theme.fonts.bold}>
            {name}
          </ThemedH1>
        </Section>
      </Main>
      <Section className="mt-4">
        <Suspense fallback={<ActivityIndicator />}>
          <RecipesUnderArea name={name} />
        </Suspense>
      </Section>
    </ScrollView>
  );
}

function RecipesUnderArea({ name }: { name?: string }) {
  const { data: recipeData } = useSWR(
    ["/api/area/meals", name],
    getMealsByArea,
    {
      isPaused: () => !name,
    }
  );

  return <RecipesList recipes={recipeData?.recipes} />;
}
