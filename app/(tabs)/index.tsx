import { getMealCategories, getRandomMeals } from "@/lib/services/query";
import useSWR from "swr";
import { Link } from "expo-router";

export default function HomeScreen() {
  const { data, error } = useSWR(["/api/category", 5], getRandomMeals);

  return (
    <div className="container">
      <div className="grid gap-4 h-[100vh] overflow-y-auto py-4 px-2">
        {data?.map((meal) => (
          <Link
            key={meal.id}
            href={{ pathname: "/meal/[id]", params: { id: meal.id } }}
          >
            <div className="p-1 rounded-xl border-2 border-slate-200">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full aspect-video object-cover rounded-t-xl"
              />
              <div>
                <h2 className="text-xl font-semibold mt-2">{meal.name}</h2>
                <p className="text-sm text-gray-500 mt-2">{meal.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
