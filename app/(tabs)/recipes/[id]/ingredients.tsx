import useSWR from "swr";
import { Div, LI, UL } from "@expo/html-elements";
import { ThemedH6, ThemedP } from "@/components/ui/themed-text";
import { Image } from "expo-image";
import { getMealById } from "@/lib/services/query";
import { useGlobalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useThemeColor";

export default function IngredientsTab() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data, error } = useSWR(["/api/meal", id], getMealById);

  return (
    <UL className="web:flex-column gap-2 mt-4">
      {data?.recipe.ingredients.map((ingredient) => (
        <LI
          key={`${ingredient.item}-${ingredient.measure}`}
          className="web:flex flex-row justify-between items-stretch gap-3 rounded-xl p-2 pr-4 border-slate-200 border"
        >
          <Image
            source={`https://www.themealdb.com/images/ingredients/${ingredient.item}-Small.png`}
            alt={ingredient.item}
            className="w-10 aspect-square"
          />
          <Div className="web:flex flex-row flex-1 justify-between items-center">
            <ThemedP className="text-xs">{ingredient.item}</ThemedP>
            <ThemedP className="text-xs">{ingredient.measure}</ThemedP>
          </Div>
        </LI>
      ))}
    </UL>
  );
}
