import { getMealCategories } from "@/lib/services/query";
import useSWR from "swr";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useTheme } from "@/hooks/useThemeColor";
import ThemedText from "../ui/themed-text";

export default function RecipeCategories() {
  const { data, error } = useSWR(["/api/category"], getMealCategories, {
    revalidateOnFocus: false,
    // refreshInterval: Number.MAX_SAFE_INTEGER,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateIfStale: false,
  });
  const router = useRouter();
  const theme = useTheme();

  return (
    <FlatList
      horizontal
      data={data?.categories}
      contentContainerStyle={styles.scrollContainer}
      renderItem={({ item: category }) => (
        <View
          key={category.id}
          style={[styles.card, { backgroundColor: theme.colors.card }]}
        >
          <Pressable
            android_ripple={{ color: theme.colors.surfaceDisabled }}
            style={[styles.cardPressable, { borderColor: theme.colors.border }]}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/categories/[name]",
                params: category,
              })
            }
          >
            <View>
              <Image
                source={category.image}
                alt={category.name}
                style={[styles.image]}
              />
              <ThemedText numberOfLines={1} style={[styles.label]}>
                {category.name}
              </ThemedText>
            </View>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    gap: 8,
    paddingVertical: 8,
  },
  card: {
    width: 100,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardPressable: {
    borderWidth: 2,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    padding: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  label: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 8,
  },
});
