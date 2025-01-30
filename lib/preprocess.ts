import { LogBox } from "react-native";

if (__DEV__) {
  LogBox.ignoreLogs(["Unexpected token Ident"]);
} else {
  LogBox.ignoreAllLogs();
}
