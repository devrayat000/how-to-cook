import RecipesList from "@/components/home/recipe-list";
import ThemedText from "@/components/ui/themed-text";
import { useTheme } from "@/hooks/useThemeColor";
import { getCategoryByName, getMealsByCategory } from "@/lib/services/query";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View, Text } from "react-native";
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
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View>
        <View>
          <ThemedText style={[styles.title, theme.fonts.bold]}>
            {name}
          </ThemedText>
        </View>
        <View>
          <Image
            source={categoryData?.category?.image}
            alt={name}
            style={[styles.image]}
          />
          <ThemedText style={[styles.description]}>
            {categoryData?.category?.description}
          </ThemedText>
        </View>
      </View>
      <View>
        <RecipesList recipes={recipeData?.recipes} />
      </View>
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
