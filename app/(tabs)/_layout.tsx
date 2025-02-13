import { useTheme } from "@react-navigation/native";
import { Tabs } from "expo-router";

// const Tabs = withLayoutContext(MaterialTabs);
// Tabs.Screen = MaterialTabs.Screen;

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        sceneStyle: { backgroundColor: theme.colors.background },
        headerShown: false,
      }}
    />
  );
}
