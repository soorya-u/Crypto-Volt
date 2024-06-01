import { PropsWithChildren } from "react";
import { ThirdwebProvider } from "thirdweb/react";

export default function ThirdWebProvider(props: PropsWithChildren) {
  return <ThirdwebProvider>{props.children}</ThirdwebProvider>;
}
