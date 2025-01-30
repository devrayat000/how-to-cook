import { getRandomMeals } from "@/lib/services/query";
import useSWR from "swr";
import { Link } from "expo-router";
import RandomRecipes from "@/components/home/random-recipes";
import RecipeCategories from "@/components/home/recipe-categories";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <RecipeCategories />
      </View>
      <View id="random-recipes">
        <RandomRecipes />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
