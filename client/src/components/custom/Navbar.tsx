import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "@/context/thirdweb";
import { CustomButton } from "./";
import { logo, menu, search, thirdweb } from "@/assets";
import { navlinks } from "@/constants";
import { Icon, Icons } from "./Icons";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address, disconnect } = useStateContext();

  return (
    <div className="mb-[35px] flex flex-col-reverse justify-between gap-6 md:flex-row">
      <div className="ml-16 flex h-[52px] max-w-[458px] flex-row rounded-[100px] border border-white/40 bg-[#141025] py-2 pl-4 pr-2 lg:flex-1">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"
        />

        <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#406be9]">
          <img
            src={search}
            alt="search"
            className="h-[15px] w-[15px] object-contain"
          />
        </div>
      </div>

      <div className="hidden flex-row justify-end gap-4 sm:flex">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={"bg-transparent hover:bg-neutral-700/20"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />
      </div>

      {/* Small screen navigation */}
      <div className="relative flex items-center justify-between sm:hidden">
        <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]">
          <img
            src={logo}
            alt="user"
            className="h-[60%] w-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="h-[34px] w-[34px] cursor-pointer object-contain"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute left-0 right-0 top-[60px] z-10 rounded-md border border-white/30 bg-[#141025] py-4 ${
            !toggleDrawer ? "-translate-y-[120vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul>
            {navlinks.map((link, idx) => (
              <li
                key={link.name}
                className={`flex items-center p-3 ${
                  isActive === link.name && "bg-[#141025]"
                }`}
                onClick={async () => {
                  if (link.name === "Logout") return disconnect();
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <Icon
                  key={link.name}
                  {...link}
                  isActive={isActive}
                  handleClick={() => {
                    if (link.name === "Logout") return disconnect();
                    setIsActive(link.name);
                    navigate(link.link);
                  }}
                >
                  {Icons[idx]}
                </Icon>
                <p
                  className={`ml-[20px] font-epilogue text-base font-semibold ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="mx-4 flex">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={"bg-transparent hover:bg-neutral-700/20"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
