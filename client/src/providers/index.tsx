import { PropsWithChildren } from "react";
import ReactRouterProvider from "./ReactRouter";
import ThirdWebProvider from "./ThirdWeb";

export default function Providers(props: PropsWithChildren) {
  return (
    <ThirdWebProvider>
      <ReactRouterProvider>{props.children}</ReactRouterProvider>
    </ThirdWebProvider>
  );
}
