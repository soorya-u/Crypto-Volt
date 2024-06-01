import { PropsWithChildren } from "react";
import ReactRouterProvider from "./ReactRouter";
import ThirdWebProvider from "./ThirdWeb";
import { StateContextProvider } from "../context";

export default function Providers(props: PropsWithChildren) {
  return (
    <ThirdWebProvider>
      <ReactRouterProvider>
        <StateContextProvider>{props.children}</StateContextProvider>
      </ReactRouterProvider>
    </ThirdWebProvider>
  );
}
