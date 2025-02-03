import RecipesList from "@/components/home/recipe-list";
import { AnimatedImage } from "@/components/ui/animated";
import Head from "@/components/ui/head";
import { ThemedH1, ThemedP } from "@/components/ui/themed-text";
import { useTheme } from "@/hooks/useThemeColor";
import { getCategoryByName, getMealsByCategory } from "@/lib/services/query";
import { Main, Section } from "@expo/html-elements";
import { useLocalSearchParams } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import useSWR from "swr";

type CategoryParams = {
  name: string;
  image?: string;
  description?: string;
};

export default function CategoryScreen() {
  const { name, ...params } = useLocalSearchParams<CategoryParams>();
  const { data: categoryData } = useSWR(
    ["/api/category/[name]", name],
    getCategoryByName,
    {
      // @ts-ignore
      fallbackData:
        !params.description || !params.image
          ? undefined
          : {
              category: {
                id: "0",
                name,
                ...params,
              },
            },
    }
  );

  const theme = useTheme();

  return (
    <ScrollView contentContainerClassName="p-2">
      <Head>
        <title>{name} - Category</title>
        <meta
          name="description"
          content={categoryData?.category?.description}
        />
        <meta property="og:title" content={`${name} - How To Cook`} />
        <meta
          property="og:description"
          content={categoryData?.category?.description}
        />
        <meta property="og:image" content={categoryData?.category?.image} />
      </Head>
      <Main>
        <Section>
          <ThemedH1 className="text-3xl" style={theme.fonts.bold}>
            {name}
          </ThemedH1>
        </Section>
        <Section>
          <AnimatedImage
            source={categoryData?.category?.image}
            alt={name}
            className="web:block w-full aspect-video object-cover rounded-md"
            sharedTransitionTag={`category-image:${categoryData?.category?.image}`}
          />
          <ThemedP className="text-base">
            {categoryData?.category?.description}
          </ThemedP>
        </Section>
      </Main>
      <Section className="mt-4">
        <Suspense fallback={<ActivityIndicator />}>
          <RecipesUnderCategory name={categoryData?.category?.name} />
        </Suspense>
      </Section>
    </ScrollView>
  );
}

function RecipesUnderCategory({ name }: { name?: string }) {
  const { data: recipeData } = useSWR(
    ["/api/category/meals", name],
    getMealsByCategory,
    {
      isPaused: () => !name,
    }
  );

  return <RecipesList recipes={recipeData?.recipes} />;
}
