import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBillTransfer,
  faBullhorn,
  faFileInvoiceDollar,
  faUser,
  faBorderAll,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren } from "react";

export const Icons = [
  <FontAwesomeIcon className="size-[1.35rem]" icon={faBorderAll} />,
  <FontAwesomeIcon className="size-[1.35rem]" icon={faBullhorn} />,
  <FontAwesomeIcon className="size-[1.35rem]" icon={faMoneyBillTransfer} />,
  <FontAwesomeIcon className="size-[1.35rem]" icon={faFileInvoiceDollar} />,
  <FontAwesomeIcon className="size-[1.35rem]" icon={faUser} />,
  <FontAwesomeIcon className="size-[1.35rem]" icon={faArrowRightFromBracket} />,
];

type IconProps = {
  styles: string;
  name: string;
  isActive: string;
  disabled: boolean;
  handleClick: () => void;
};

export const Icon = ({
  styles,
  name,
  isActive,
  disabled,
  handleClick,
  children,
}: Partial<IconProps & PropsWithChildren>) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32] [&_path]:fill-green-500"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {children}
  </div>
);
