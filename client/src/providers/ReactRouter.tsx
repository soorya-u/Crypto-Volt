import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

export default function ReactRouterProvider(props: PropsWithChildren) {
  return <BrowserRouter>{props.children}</BrowserRouter>;
}
