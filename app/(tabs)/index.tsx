import RandomRecipes from "@/components/home/random-recipes";
import RecipeCategories from "@/components/home/recipe-categories";
import { ScrollView, StyleSheet } from "react-native";
import { Section } from "@expo/html-elements";
import Head from "@/components/ui/head";
import { ThemedH3 } from "@/components/ui/themed-text";
import { useTheme } from "@/hooks/useThemeColor";

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <ScrollView contentContainerClassName="p-2">
      <Head>
        <title>How To Cook - Your One Stop For Cooking Recipes</title>
        <meta
          property="og:title"
          content="How To Cook - Your One Stop For Cooking Recipes"
        />
      </Head>
      <Section>
        <ThemedH3
          className="text-2xl text-slate-800 mb-1"
          style={theme.fonts.medium}
        >
          Categories
        </ThemedH3>
        <RecipeCategories />
      </Section>
      <Section id="random-recipes" className="mt-4">
        <ThemedH3
          className="text-2xl text-slate-800 mb-1"
          style={theme.fonts.medium}
        >
          Just For You
        </ThemedH3>
        <RandomRecipes />
      </Section>
    </ScrollView>
  );
}
