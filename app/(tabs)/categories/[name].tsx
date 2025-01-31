import RecipesList from "@/components/home/recipe-list";
import { ThemedH1, ThemedP } from "@/components/ui/themed-text";
import { useTheme } from "@/hooks/useThemeColor";
import { getCategoryByName, getMealsByCategory } from "@/lib/services/query";
import { Main, Section } from "@expo/html-elements";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import Head from "expo-router/head";
import { ScrollView, StyleSheet } from "react-native";
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
  const { data: recipeData } = useSWR(
    ["/api/category", name],
    getMealsByCategory,
    {
      isPaused: () => !categoryData,
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
          <Image
            source={categoryData?.category?.image}
            alt={name}
            className="web:block w-full aspect-video object-cover rounded-md"
          />
          <ThemedP className="text-base">
            {categoryData?.category?.description}
          </ThemedP>
        </Section>
      </Main>
      <Section>
        <RecipesList recipes={recipeData?.recipes} />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 8,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  description: {
    fontSize: 14,
  },
});
