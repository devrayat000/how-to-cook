import "@/lib/preprocess";

import "../global.css";
import { Slot } from "expo-router";
import { SWRConfig } from "swr";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <SWRConfig value={{ suspense: true }}>
        <Slot />
      </SWRConfig>
    </GluestackUIProvider>
  );
}
