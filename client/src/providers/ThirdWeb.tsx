import { PropsWithChildren } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function ThirdWebProvider(props: PropsWithChildren) {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const rpcUrl = import.meta.env.VITE_RPC_URL;
  const chainId = import.meta.env.VITE_CHAIN_ID;
  const sdkOptions = {
    readonlySettings: {
      rpcUrl: rpcUrl,
      chainId: +chainId,
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
