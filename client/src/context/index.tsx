import { useContext, createContext, PropsWithChildren } from "react";

import {
  useAddress,
  useContract,
  useConnect,
  useContractWrite,
  metamaskWallet,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const metamaskConfig = metamaskWallet();

const defaultArgs: any = {};

const StateContext = createContext(defaultArgs);

export const StateContextProvider = (props: PropsWithChildren) => {
  const contractId = import.meta.env.VITE_CONTRACT_ID;
  const { data: contract } = useContract(`${contractId}`);

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    // @ts-ignore
    "createCampaign"
  );

  const address = useAddress();
  const connect = useConnect();

  const metaMaskConnect = () => connect(metamaskConfig);

  type FormType = {
    name: string;
    title: string;
    description: string;
    target: string;
    deadline: string;
    image: string;
  };

  const publishCampaign = async (form: FormType) => {
    try {
      const data = await createCampaign({
        args: [
          address, //owner,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("Contract call success", data);
    } catch (err) {
      console.log("Contract call failed", err);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract?.call("getCampaigns");

    const parsedCampaigns = campaigns.map((c: any, idx: number) => ({
      owner: c.owner,
      title: c.title,
      description: c.description,
      target: ethers.utils.formatEther(c.target.toString()),
      deadline: c.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(c.amountCollected.toString()),
      image: c.image,
      pId: idx,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (c: any) => c.owner === address
    );
    return filteredCampaigns;
  };

  const donate = async (pId: string, amount: string) => {
    const value = ethers.utils.parseEther(amount);

    const data = await contract?.call("donateToCampaign", [+pId], {
      value,
    });

    return data;
  };

  const getDonations = async (pId: string) => {
    console.log(+pId);
    const donations = await contract?.call("getDonators", [+pId]);

    const parsedDonations = donations.map((d: any) => ({
      donator: d.donator,
      donation: ethers.utils.formatEther(d.amount).toString(),
    }));

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        createCampaign: publishCampaign,
        contract,
        connect: metaMaskConnect,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
