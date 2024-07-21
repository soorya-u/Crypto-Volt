import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { navlinks } from "@/constants";
import { useStateContext } from "@/context/thirdweb";
import { Icon, Icons } from "./Icons";

import logo from "@/assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Home");
  const { disconnect } = useStateContext();

  return (
    <div className="group sticky top-5 flex h-[93vh] flex-col items-center justify-start">
      <Link to="/">
        <img
          className="size-[52px] rounded-md bg-transparent hover:bg-[#000]/30"
          src={logo}
        />
      </Link>

      <div className="mt-12 flex w-[76px] -translate-x-[15vw] flex-col items-center justify-between rounded-[20px] bg-transparent py-4 transition-all duration-700 group-hover:translate-x-0">
        <div className="flex flex-col items-center justify-center gap-3">
          {navlinks.map((link, idx) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (link.name === "Logout") return disconnect();
                setIsActive(link.name);
                navigate(link?.link);
              }}
            >
              {Icons[idx]}
            </Icon>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
