import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { navlinks } from "@/constants";
import { useStateContext } from "@/context/thirdweb";
import { Icon, Icons } from "./Icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const { disconnect } = useStateContext();

  return (
    <div className="flex justify-start items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        {/* <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} /> */}
      </Link>

      <div className="flex flex-col justify-between items-center bg-transparent rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link, idx) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

{
  /* {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )} */
}
