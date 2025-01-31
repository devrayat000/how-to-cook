import { View, Text } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { getMealById } from "@/lib/services/query";
import useSWR from "swr";
import { ThemedH2, ThemedP } from "@/components/ui/themed-text";
import { Div, Section } from "@expo/html-elements";
import YoutubePlayer from "@/components/ui/youtube-player";
import { formatYoutubeUrl } from "@/lib/functions";
import { Image } from "expo-image";

export default function RecipeDetails() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data, error } = useSWR(["/api/meal", id], getMealById);

  return (
    <Div>
      <Section className="flex-row justify-between">
        <ThemedP className="text-lg text-slate-800 mt-2">
          {data?.recipe.category}
        </ThemedP>
        <Image
          source={`https://www.themealdb.com/images/category/${data?.recipe.category.toLowerCase()}.png`}
          alt={data?.recipe.category}
          className="w-32 aspect-[4/3]"
        />
      </Section>
      {!!data?.recipe.youtube && (
        <Div className="mt-4">
          <YoutubePlayer source={formatYoutubeUrl(data.recipe.youtube)} />
        </Div>
      )}
    </Div>
  );
}
