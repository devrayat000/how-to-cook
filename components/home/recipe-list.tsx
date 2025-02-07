import { useTheme } from "@/hooks/useThemeColor";
import { Meal } from "@/lib/types/meal";
import { FlatList } from "react-native";
import { ThemedH4, ThemedP } from "../ui/themed-text";
import { Div, Section } from "@expo/html-elements";
import ThemedLink from "../ui/link";
import { AnimatedImage } from "../ui/animated";
import { cn } from "@/lib/utils";

type RecipeCardInfo = Pick<Meal, "id" | "name" | "image" | "category" | "area">;

type RecipesListProps = {
  recipes?: RecipeCardInfo[];
  horizontal?: boolean;
};

export default function RecipesList({
  recipes,
  horizontal = true,
}: RecipesListProps) {
  const theme = useTheme();

  return (
    <FlatList
      data={recipes}
      contentContainerClassName="gap-2 py-1"
      horizontal={horizontal}
      renderItem={({ item: recipe }) => {
        return (
          <ThemedLink
            key={recipe.id}
            className={cn(
              "web:block rounded-xl overflow-hidden border border-slate-200 bg-white",
              {
                "w-[90vw]": horizontal,
              }
            )}
            href={{
              pathname: "/(tabs)/recipes/[id]/ingredients",
              params: { id: recipe.id },
            }}
          >
            <AnimatedImage
              source={recipe.image}
              alt={recipe.name}
              className="web:block w-full aspect-video rounded-xl"
              sharedTransitionTag={`recipe-image:${recipe.image}`}
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
        );
      }}
    />
  );
}
