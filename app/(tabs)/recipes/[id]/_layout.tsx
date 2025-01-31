import TopTabs from "@/components/ui/top-tabs";
import { useLocalSearchParams } from "expo-router";
import useSWR from "swr";
import { getMealById } from "@/lib/services/query";
import { ScrollView } from "react-native";
import { Div, LI, Section, UL } from "@expo/html-elements";
import { ThemedH2, ThemedH6, ThemedP } from "@/components/ui/themed-text";
import { Image } from "expo-image";
import { useTheme } from "@/hooks/useThemeColor";
import YoutubePlayer from "@/components/ui/youtube-player";
import Head from "expo-router/head";
import { formatYoutubeUrl } from "@/lib/functions";
import CustomTabBar from "@/components/ui/tab-bar";
import colors from "tailwindcss/colors";
import {} from "nativewind/theme";

export default function RecipeDetailLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, error } = useSWR(["/api/meal", id], getMealById);
  const theme = useTheme();

  return (
    <Div className="flex-1 bg-orange-50">
      <Head>
        <title>{data?.recipe.name} - Recipe</title>
        <meta name="description" content={data?.recipe?.instructions} />
        <meta property="og:title" content={`${name} - How To Cook`} />
        <meta property="og:description" content={data?.recipe?.instructions} />
        <meta property="og:image" content={data?.recipe?.image} />
      </Head>

      <Div>
        <Image
          source={data?.recipe.image}
          alt={data?.recipe.name}
          className="web:block w-full aspect-video object-cover"
        />
        <Div>
          <ThemedH2
            className="text-3xl mt-2 text-center"
            style={theme.fonts.medium}
          >
            {data?.recipe.name}
          </ThemedH2>
        </Div>
      </Div>
      <Div className="flex-1 p-2 bg-white rounded-t-xl overflow-hidden">
        <Div className="flex-1">
          <TopTabs
            initialRouteName="ingredients"
            screenLayout={(props) => (
              <ScrollView className="pb-1">{props.children}</ScrollView>
            )}
            screenOptions={{
              sceneStyle: {
                backgroundColor: colors.white,
              },
              tabBarStyle: {
                borderRadius: 9999,
                backgroundColor: colors.orange[100],
                shadowColor: "transparent",
              },
              tabBarLabelStyle: { padding: 0 },
              tabBarIndicatorContainerStyle: {
                padding: 4,
              },
              tabBarIndicatorStyle: {
                borderRadius: 9999,
                height: "100%",
                backgroundColor: colors.orange[200],
                position: "static",
                width: "31.8%",
              },
              tabBarInactiveTintColor: colors.orange[900],
              // tabBarActiveTintColor: twTheme.theme.colors.orange[800],
            }}
          >
            <TopTabs.Screen name="details" redirect />
            <TopTabs.Screen name="ingredients" />
            <TopTabs.Screen name="instructions" />
          </TopTabs>
        </Div>
      </Div>
    </Div>
  );
}
