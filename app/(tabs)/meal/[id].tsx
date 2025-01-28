import { useLocalSearchParams } from "expo-router";
import useSWR from "swr";
import { getMealById } from "@/lib/services/query";

export default function MealDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, error } = useSWR(["/api/meal", id], getMealById);

  return (
    <div className="container h-screen overflow-y-auto">
      {/* This is the meal details page */}
      <div className="p-1">
        <div>
          <h2 className="text-4xl font-semibold mt-2">{data?.name}</h2>
          <p className="text-lg text-gray-500 mt-2">{data?.category}</p>
        </div>
        <img
          src={data?.image}
          alt={data?.name}
          className="w-full aspect-video object-cover rounded-md"
        />
        <div>
          <h6 className="text-lg font-medium">Ingredients</h6>
          <ul>
            {data?.ingredients.map((ingredient) => (
              <li key={ingredient.item}>
                {ingredient.item} - {ingredient.measure}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h6 className="text-lg font-medium">Instructions</h6>
          <p>{data?.instructions}</p>
        </div>
        <div>
          <iframe
            src="https://www.youtube.com/embed/EHKNu93MSx4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="aspect-video w-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
