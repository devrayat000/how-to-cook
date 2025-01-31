import { useTheme } from "@/hooks/useThemeColor";
import { Meal } from "@/lib/types/meal";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText, { ThemedH4, ThemedP } from "../ui/themed-text";
import { Article, Div, Section } from "@expo/html-elements";
import ThemedButton from "../ui/button";
import ThemedLink from "../ui/link";

type RecipeCardInfo = Pick<Meal, "id" | "name" | "image" | "category" | "area">;

type RecipesListProps = {
  recipes?: RecipeCardInfo[];
};

export default function RecipesList({ recipes }: RecipesListProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Section className="gap-2">
      {recipes?.map((recipe) => (
        <ThemedLink
          key={recipe.id}
          className="web:block rounded-xl overflow-hidden border border-slate-200 bg-white"
          // onPress={() =>
          //   router.push({
          //     pathname: "/recipes/[id]",
          //     params: { id: recipe.id },
          //   })
          // }
          href={{
            pathname: "/recipes/[id]",
            params: { id: recipe.id },
          }}
        >
          <Image
            source={recipe.image}
            alt={recipe.name}
            className="web:block w-full aspect-video rounded-xl"
          />
          <Div className="web:block p-2">
            <ThemedH4
              numberOfLines={1}
              className="text-2xl text-slate-900"
              style={theme.fonts.bold}
            >
              {recipe.name}
            </ThemedH4>
            {(!!recipe.category || !!recipe.area) && (
              <Section className="flex web:flex-row justify-between">
                <ThemedP
                  className="text-base"
                  style={[{ color: theme.colors.onSurfaceVariant }]}
                >
                  {recipe.category}
                </ThemedP>
                <ThemedP
                  className="text-base"
                  style={[{ color: theme.colors.onSurfaceVariant }]}
                >
                  {recipe.area}
                </ThemedP>
              </Section>
            )}
          </Div>
        </ThemedLink>
      ))}
    </Section>
  );
}
