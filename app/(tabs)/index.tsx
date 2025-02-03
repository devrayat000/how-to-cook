import RandomRecipes from "@/components/home/random-recipes";
import RecipeCategories from "@/components/home/recipe-categories";
import { ScrollView, StyleSheet } from "react-native";
import { Section } from "@expo/html-elements";
import Head from "@/components/ui/head";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Head>
        <title>How To Cook - Your One Stop For Cooking Recipes</title>
        <meta
          property="og:title"
          content="How To Cook - Your One Stop For Cooking Recipes"
        />
      </Head>
      <Section>
        <RecipeCategories />
      </Section>
      <Section id="random-recipes">
        <RandomRecipes />
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
