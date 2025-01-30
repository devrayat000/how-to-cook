import { useTheme } from "@/hooks/useThemeColor";
import { Meal } from "@/lib/types/meal";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "../ui/themed-text";

type RecipeCardInfo = Pick<Meal, "id" | "name" | "image" | "category" | "area">;

type RecipesListProps = {
  recipes?: RecipeCardInfo[];
};

export default function RecipesList({ recipes }: RecipesListProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {recipes?.map((recipe) => (
        <View
          key={recipe.id}
          style={[styles.card, { backgroundColor: theme.colors.card }]}
        >
          <Pressable
            android_ripple={{ color: theme.colors.surfaceDisabled }}
            style={[styles.cardPressable, { borderColor: theme.colors.border }]}
            onPress={() =>
              router.push({
                pathname: "/recipes/[id]",
                params: { id: recipe.id },
              })
            }
          >
            <View>
              <Image
                source={recipe.image}
                alt={recipe.name}
                style={[styles.image]}
              />
              <View style={[styles.captionContainer]}>
                <ThemedText
                  numberOfLines={1}
                  style={[
                    styles.label,
                    theme.fonts.bold,
                    { color: theme.colors.text },
                  ]}
                >
                  {recipe.name}
                </ThemedText>
                {(!!recipe.category || !!recipe.area) && (
                  <View style={[styles.featureContainer]}>
                    <ThemedText
                      style={[
                        styles.featureText,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      {recipe.category}
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.featureText,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                    >
                      {recipe.area}
                    </ThemedText>
                  </View>
                )}
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardPressable: {
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
  },
  captionContainer: {
    padding: 8,
  },
  label: {
    fontSize: 22,
  },
  featureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureText: {
    fontSize: 16,
  },
});
