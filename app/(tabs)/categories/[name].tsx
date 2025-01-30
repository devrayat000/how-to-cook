import RecipesList from "@/components/home/recipe-list";
import { getCategoryByName, getMealsByCategory } from "@/lib/services/query";
import { useLocalSearchParams } from "expo-router";
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

  return (
    <main className="container">
      <section className="p-4">
        <section>
          <h1 className="text-3xl font-bold">{name}</h1>
        </section>
        <figure>
          <img
            src={categoryData?.category?.image}
            alt={name}
            className="w-full aspect-w-16 aspect-h-9 object-cover"
          />
          <figcaption>{categoryData?.category?.description}</figcaption>
        </figure>
      </section>
      <section>
        <RecipesList recipes={recipeData?.recipes} />
      </section>
    </main>
  );
}
