import { mapKeys, parseIngredients } from "../functions";
import { ICategory } from "../types/category";
import { Meal } from "../types/meal";

export async function getMealCategories() {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/categories.php`);
  const data = (await res.json()) as { categories: ICategory[] };

  const newData = {
    categories: data.categories.map((category) =>
      mapKeys(category, {
        strCategory: "name",
        idCategory: "id",
        strCategoryThumb: "image",
        strCategoryDescription: "description",
      })
    ),
  };
  return newData;
}

export async function getCategoryByName([_, name]: [_: string, name: string]) {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/categories.php`);
  const data = (await res.json()) as { categories: ICategory[] };

  const categoryMap = new Map(
    data.categories.map((category) => [category.strCategory, category])
  );

  const category = categoryMap.get(name);

  if (!category) {
    return { category: null };
  }

  return {
    category: mapKeys(category, {
      strCategory: "name",
      idCategory: "id",
      strCategoryThumb: "image",
      strCategoryDescription: "description",
    }),
  };
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

  return { recipes: Array.from(meals.values()) };
}

export async function getMealsByCategory([_, name]: [_: string, name: string]) {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/filter.php?c=${name}`
  );
  const data = await res.json();
  const meals = data.meals.map(parseIngredients);

  return { recipes: meals as Meal[] };
}

export async function getMealById([_, id]: [_: string, id: string]) {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/lookup.php?i=${id}`
  );
  const data = await res.json();
  const meal = data.meals.at(0);

  return { recipe: parseIngredients(meal) };
}
