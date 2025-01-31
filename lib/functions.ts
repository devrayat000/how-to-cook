import type { IMeal } from "@/lib/types/meal";

export const mealRenameKeys = Object.freeze({
  idMeal: "id",
  strMeal: "name",
  strCategory: "category",
  strMealThumb: "image",
  strYoutube: "youtube",
  strInstructions: "instructions",
  strArea: "area",
  dateModified: "dateModified",
  strCreativeCommonsConfirmed: "creativeCommonsConfirmed",
  strDrinkAlternate: "drinkAlternate",
  strImageSource: "imageSource",
  strSource: "source",
  strTags: "tags",
  ingredients: "ingredients",
});

export function parseIngredients(meal: any) {
  const ingredients: { item: string; measure: string }[] = [];
  const newMeal = { ingredients } as any;
  for (const key in meal) {
    if (key.startsWith("strIngredient")) {
      const i = parseInt(key.replace("strIngredient", ""));

      if (meal[key]?.trim()) {
        ingredients[i] = { ...ingredients[i], item: meal[key] };
      }
    } else if (key.startsWith("strMeasure")) {
      const i = parseInt(key.replace("strMeasure", ""));
      if (meal[key]?.trim()) {
        ingredients[i] = { ...ingredients[i], measure: meal[key] };
      }
    } else {
      newMeal[key] = meal[key];
    }
  }

  newMeal.ingredients = ingredients.filter((i) => !!i);

  return mapKeys(newMeal as IMeal, mealRenameKeys);
}

export function makeSlug(payload: string): string {
  return (
    payload
      .trim()
      .replace(/([()'"&,])/g, "")
      // .replace(/(\(|\)|'|"|&|,)/g, '')
      .replace(/([\s-_]+)/g, "_")
      // .replace(/(\s|-|_)+/g, "_")
      .replace(/(?<!\s|_|-)(?!^)([A-Z])/g, "_$1")
      .toLocaleLowerCase()
  );
}

export function extractIdFromSlug(payload: string): string {
  const [match] = /(?<=_)(\d+){5}$/.exec(payload.trim())!;
  return match;
}

export type RenameKeys<
  T extends object,
  M extends Partial<Record<keyof T, string>>
> = {
  [K in keyof T as K extends keyof M ? NonNullable<M[K]> : K]: T[K];
};

export function mapKeys<
  T extends object,
  M extends Partial<Record<keyof T, string>>
>(obj: T, keyMap: M): RenameKeys<T, M> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      keyMap[key as keyof T] ?? key,
      value,
    ])
  ) as any;
}

export function formatYoutubeUrl(url: string) {
  const videoId = url.split("v=").pop();
  return `https://www.youtube.com/embed/${videoId}`;
}
