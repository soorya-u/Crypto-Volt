import { BigNumber } from "ethers";

export type FormType = {
  name: string;
  title: string;
  description: string;
  target: BigNumber;
  deadline: string;
  image: string;
};

export type CampaignType = {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
  name: string;
};

export type DonationType = {
  donatorAddress: string;
  donatorName: string;
  donation: string;
};
