import { useLocalSearchParams } from "expo-router";
import useSWR from "swr";
import { getMealById } from "@/lib/services/query";
import { ScrollView } from "react-native";
import { Div, LI, UL } from "@expo/html-elements";
import { ThemedH2, ThemedH6, ThemedP } from "@/components/ui/themed-text";
import { Image } from "expo-image";
import { useTheme } from "@/hooks/useThemeColor";
import { Fragment } from "react";
import YoutubePlayer from "@/components/ui/youtube-player";
import Head from "expo-router/head";
import { formatYoutubeUrl } from "@/lib/functions";

export default function MealDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, error } = useSWR(["/api/meal", id], getMealById);
  const theme = useTheme();

  return (
    <ScrollView contentContainerClassName="p-2">
      <Head>
        <title>{data?.recipe.name} - Recipe</title>
        <meta name="description" content={data?.recipe?.instructions} />
        <meta property="og:title" content={`${name} - How To Cook`} />
        <meta property="og:description" content={data?.recipe?.instructions} />
        <meta property="og:image" content={data?.recipe?.image} />
      </Head>
      <Div>
        <Div>
          <ThemedH2 className="text-3xl mt-2" style={theme.fonts.medium}>
            {data?.recipe.name}
          </ThemedH2>
          <ThemedP className="text-lg text-gray-500 mt-2">
            {data?.recipe.category}
          </ThemedP>
        </Div>
        <Image
          source={data?.recipe.image}
          alt={data?.recipe.name}
          className="web:block w-full aspect-video object-cover rounded-md"
        />
        <Div className="mt-4">
          <ThemedH6 className="text-xl" style={theme.fonts.medium}>
            Ingredients
          </ThemedH6>
          <UL>
            {data?.recipe.ingredients.map((ingredient) => (
              <LI key={ingredient.item}>
                <Fragment>
                  {ingredient.item} - {ingredient.measure}
                </Fragment>
              </LI>
            ))}
          </UL>
        </Div>
        <Div className="mt-4">
          <ThemedH6 className="text-xl" style={theme.fonts.medium}>
            Instructions
          </ThemedH6>
          <ThemedP>{data?.recipe.instructions}</ThemedP>
        </Div>
        {!!data?.recipe.youtube && (
          <Div>
            <YoutubePlayer source={formatYoutubeUrl(data.recipe.youtube)} />
          </Div>
        )}
      </Div>
    </ScrollView>
  );
}
