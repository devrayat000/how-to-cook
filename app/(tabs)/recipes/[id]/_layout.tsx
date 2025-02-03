import TopTabs from "@/components/ui/top-tabs";
import { useLocalSearchParams } from "expo-router";
import useSWR from "swr";
import { getMealById } from "@/lib/services/query";
import { ScrollView } from "react-native";
import { Div } from "@expo/html-elements";
import { ThemedH2 } from "@/components/ui/themed-text";
import { useTheme } from "@/hooks/useThemeColor";
import colors from "tailwindcss/colors";
import {} from "nativewind/theme";
import { AnimatedImage, Universal } from "@/components/ui/animated";
import { SlideInDown, SlideOutDown } from "react-native-reanimated";
import Head from "@/components/ui/head";

export default function RecipeDetailLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, error } = useSWR(["/api/meal", id], getMealById);
  const theme = useTheme();

  return (
    <Div className="flex-1 bg-orange-50 relative">
      <Head>
        <title>{data?.recipe.name} - Recipe</title>
        <meta name="description" content={data?.recipe?.instructions} />
        <meta property="og:title" content={`${name} - How To Cook`} />
        <meta property="og:description" content={data?.recipe?.instructions} />
        <meta property="og:image" content={data?.recipe?.image} />
      </Head>

      <Div>
        <AnimatedImage
          source={data?.recipe.image}
          alt={data?.recipe.name}
          className="web:block w-full aspect-video object-cover"
          sharedTransitionTag={`recipe-image:${data?.recipe.image}`}
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
      <Universal.Div
        entering={SlideInDown.springify()
          .delay(100)
          .damping(30)
          .mass(5)
          .stiffness(10)
          .overshootClamping(2)
          .restDisplacementThreshold(1)
          .restSpeedThreshold(5)}
        exiting={SlideOutDown.springify()
          .damping(30)
          .mass(5)
          .stiffness(10)
          .overshootClamping(2)
          .restDisplacementThreshold(1)
          .restSpeedThreshold(5)}
        className="p-2 flex-1 bg-white rounded-t-xl overflow-hidden"
      >
        <Div className="flex-1 mt-1">
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
            <TopTabs.Screen name="details" />
            <TopTabs.Screen name="ingredients" />
            <TopTabs.Screen name="instructions" />
          </TopTabs>
        </Div>
      </Universal.Div>
    </Div>
  );
}
