import "./global.css";
import { Slot } from "expo-router";
import { SWRConfig } from "swr";

export default function RootLayout() {
  return (
    <SWRConfig value={{ suspense: true }}>
      <Slot />
    </SWRConfig>
  );
}
