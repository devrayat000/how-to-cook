import { createStore } from "jotai";
import { createJSONStorage } from "jotai/utils";

export const store = createStore();

export const storage = createJSONStorage(() => localStorage);
