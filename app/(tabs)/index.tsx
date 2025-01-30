import { getRandomMeals } from "@/lib/services/query";
import useSWR from "swr";
import { Link } from "expo-router";
import RandomRecipes from "@/components/home/random-recipes";
import RecipeCategories from "@/components/home/recipe-categories";

export default function HomeScreen() {
  return (
    <div className="container">
      <main className="h-screen overflow-y-auto">
        <section>
          <RecipeCategories />
        </section>
        <section id="random-recipes">
          <RandomRecipes />
        </section>
      </main>
    </div>
  );
}
