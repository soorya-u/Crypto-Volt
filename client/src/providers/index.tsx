import { PropsWithChildren } from "react";
import ReactRouterProvider from "./ReactRouter";
import ThirdWebProvider from "./ThirdWeb";
import { StateContextProvider } from "../context/thirdweb";
import { ThemeProvider } from "@/context/theme";

export default function Providers(props: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ThirdWebProvider>
        <ReactRouterProvider>
          <StateContextProvider>{props.children}</StateContextProvider>
        </ReactRouterProvider>
      </ThirdWebProvider>
    </ThemeProvider>
  );
}
