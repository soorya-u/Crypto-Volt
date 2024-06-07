import { useContext, createContext, PropsWithChildren, ReactNode } from "react";
import {
  useAddress,
  useContract,
  useConnect,
  useContractWrite,
  metamaskWallet,
  useDisconnect,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

import { CampaignType, DonationType, FormType } from "@/types/context";

const metamaskConfig = metamaskWallet();

interface StateContextProps {
  address: string | undefined;
  createCampaign: (form: FormType) => Promise<void>;
  contract: any;
  connect: () => void;
  disconnect: () => void;
  getCampaigns: () => Promise<CampaignType[]>;
  getUserCampaigns: () => Promise<CampaignType[]>;
  donate: (pId: string, name: string, amount: string) => Promise<any>;
  getDonations: (pId: string) => Promise<DonationType[]>;
  multiSenderByValue: (addresses: string[], amounts: string[]) => Promise<any>;
  multiSenderEqually: (addresses: string[], amount: string) => Promise<any>;
}

const defaultArgs: StateContextProps = {
  address: undefined,
  createCampaign: async () => {},
  contract: null,
  connect: () => {},
  disconnect: () => {},
  getCampaigns: async () => [],
  getUserCampaigns: async () => [],
  donate: async () => {},
  getDonations: async () => [],
  multiSenderByValue: async () => {},
  multiSenderEqually: async () => {},
};

const StateContext = createContext<StateContextProps>(defaultArgs);

export const StateContextProvider = ({
  children,
}: PropsWithChildren<ReactNode>) => {
  const contractId = import.meta.env.VITE_CONTRACT_ID;
  const { data: contract } = useContract(`${contractId}`);

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();

  const metaMaskConnect = () => connect(metamaskConfig);

  const publishCampaign = async (form: FormType) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("Contract call success", data);
    } catch (err) {
      console.error("Contract call failed", err);
    }
  };

  const getCampaigns = async (): Promise<CampaignType[]> => {
    try {
      const campaigns = await contract?.call("getCampaigns");
      return campaigns.map((c: any, idx: number) => ({
        owner: c.owner,
        title: c.title,
        description: c.description,
        target: ethers.utils.formatEther(c.target.toString()),
        deadline: c.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(c.amountCollected.toString()),
        image: c.image,
        pId: idx,
      }));
    } catch (error) {
      console.error("Failed to fetch campaigns", error);
      return [];
    }
  };

  const getUserCampaigns = async (): Promise<CampaignType[]> => {
    const allCampaigns = await getCampaigns();
    return allCampaigns.filter((c) => c.owner === address);
  };

  const donate = async (pId: string, name: string, amount: string) => {
    try {
      const value = ethers.utils.parseEther(amount);
      const data = await contract?.call("donateToCampaign", [+pId, name], {
        value,
      });
      return data;
    } catch (error) {
      console.error("Donation failed", error);
    }
  };

  const getDonations = async (pId: string): Promise<DonationType[]> => {
    try {
      const donations = await contract?.call("getDonators", [+pId]);
      return donations.map((d: any) => ({
        donatorAddress: d.donator,
        donatorName: d.name,
        donation: ethers.utils.formatEther(d.amount).toString(),
      }));
    } catch (error) {
      console.error("Failed to fetch donations", error);
      return [];
    }
  };

  const multiSenderByValue = async (addresses: string[], amounts: string[]) => {
    try {
      const value = amounts.map((v) => ethers.utils.parseEther(`${v}`));
      const sum = amounts.reduce((acc, curr) => acc + +curr, 0);
      const totalSum = ethers.utils.parseEther(`${sum}`);

      const data = await contract?.call(
        "multiSenderByValue",
        [addresses, value],
        { value: totalSum }
      );
      return data;
    } catch (error) {
      console.error("Multi-sender by value failed", error);
    }
  };

  const multiSenderEqually = async (addresses: string[], amount: string) => {
    try {
      const totalSum = ethers.utils.parseEther(`${+amount * addresses.length}`);
      const data = await contract?.call("multiSenderEqually", [addresses], {
        value: totalSum,
      });
      return data;
    } catch (error) {
      console.error("Multi-sender equally failed", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        createCampaign: publishCampaign,
        contract,
        connect: metaMaskConnect,
        disconnect,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        multiSenderByValue,
        multiSenderEqually,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
