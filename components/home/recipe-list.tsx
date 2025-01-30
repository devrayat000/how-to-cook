import { Meal } from "@/lib/types/meal";
import { Link } from "expo-router";

type RecipeCardInfo = Pick<Meal, "id" | "name" | "image" | "category" | "area">;

type RecipesListProps = {
  recipes?: RecipeCardInfo[];
};

export default function RecipesList({ recipes }: RecipesListProps) {
  return (
    <div className="grid gap-4 py-4 px-2">
      {recipes?.map((meal) => (
        <Link
          key={meal.id}
          href={{ pathname: "/recipes/[id]", params: { id: meal.id } }}
        >
          <div className="p-0.5 rounded-xl bg-slate-100/50 border-2 border-slate-200">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full aspect-video object-cover rounded-t-xl"
            />
            <div className="p-2">
              <h2 className="text-xl font-semibold">{meal.name}</h2>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">{meal.category}</p>
                <p className="text-sm text-gray-500">{meal.area}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
