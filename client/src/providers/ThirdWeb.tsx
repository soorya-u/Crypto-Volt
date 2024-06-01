import { PropsWithChildren } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function ThirdWebProvider(props: PropsWithChildren) {
  const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;
  const sdkOptions = {
    readonlySettings: {
      rpcUrl: "http://127.0.0.1:7545",
      chainId: 1337,
    },
  };
  return (
    <ThirdwebProvider
      sdkOptions={sdkOptions}
      activeChain="localhost"
      clientId={clientId}
    >
      {props.children}
    </ThirdwebProvider>
  );
}
