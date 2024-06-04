import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

type NavLinks = {
  name: string;
  imgUrl: string;
  link: string;
  disabled?: boolean;
};

export const navlinks: NavLinks[] = [
  {
    name: "Dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "MultiSender",
    imgUrl: payment,
    link: "/multi-sender",
  },
  {
    name: "Withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "Logout",
    imgUrl: logout,
    link: "/",
  },
];
