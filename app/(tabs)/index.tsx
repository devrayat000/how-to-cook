import RandomRecipes from "@/components/home/random-recipes";
import RecipeCategories from "@/components/home/recipe-categories";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
import { Div, Section } from "@expo/html-elements";
import Head from "@/components/ui/head";
import { ThemedH3 } from "@/components/ui/themed-text";
import { useTheme } from "@/hooks/useThemeColor";
import RecipeAreas from "@/components/home/recipe-areas";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";

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
      <Section className="mt-4">
        <Link href={{ pathname: "/(tabs)/search" }} asChild>
          <Pressable className="flex-row items-center justify-between gap-2 android:rounded-full ios:rounded-lg bg-slate-100 p-2">
            <AntDesign name="search1" className="!text-lg text-slate-600" />
            <Text className="flex-1 web:focus:outline-none text-base text-slate-600">
              Search...
            </Text>
          </Pressable>
        </Link>
      </Section>
      <Section>
        <ThemedH3
          className="text-2xl text-slate-800 mb-1"
          style={theme.fonts.medium}
        >
          Categories
        </ThemedH3>
        <RecipeCategories />
      </Section>
      <Section className="mt-4">
        <ThemedH3
          className="text-2xl text-slate-800 mb-1"
          style={theme.fonts.medium}
        >
          Areas
        </ThemedH3>
        <RecipeAreas />
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
