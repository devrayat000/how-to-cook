import { View, Text } from "react-native";
import React from "react";
import { ThemedP } from "@/components/ui/themed-text";
import useSWR from "swr";
import { getMealById } from "@/lib/services/query";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export default function instructions() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { data, error } = useSWR(["/api/meal", id], getMealById);

  return <ThemedP>{data?.recipe.instructions}</ThemedP>;
}
