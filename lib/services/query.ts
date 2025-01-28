import { parseIngredients } from "../functions";
import { Meal } from "../types/meal";

export async function getMealCategories() {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/categories.php`);
  const data = await res.json();

  return data;
}

export async function getRandomMeals([_, count]: [_: string, count: number]) {
  const meals = new Map<string, Meal>();
  for (let i = 0; i < count; i++) {
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/random.php`);
    const data = await res.json();
    const meal = data.meals.at(0);
    const parsedMeal = parseIngredients(meal);

    if (meals.has(parsedMeal.id)) {
      i--;
      continue;
    }

    meals.set(parsedMeal.id, parsedMeal);
  }

  return Array.from(meals.values());
}

export async function getMealById([_, id]: [_: string, id: string]) {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/lookup.php?i=${id}`
  );
  const data = await res.json();
  const meal = data.meals.at(0);

  return parseIngredients(meal);
}
