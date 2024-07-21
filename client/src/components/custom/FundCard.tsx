import { tagType, thirdweb } from "@/assets";
import { daysLeft } from "@/utils";

type FundCardProps = {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: string;
  image: string;
  handleClick: () => void;
};
const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}: FundCardProps) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="w-full cursor-pointer rounded-[15px] border border-white/40 bg-[#141025] shadow shadow-white/40 sm:w-[288px]"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="h-[158px] w-full rounded-[15px] object-cover"
      />

      <div className="flex flex-col p-4">
        <div className="mb-[18px] flex flex-row items-center">
          <img
            src={tagType}
            alt="tag"
            className="h-[17px] w-[17px] object-contain"
          />
          <p className="ml-[12px] mt-[2px] font-epilogue text-[12px] font-medium text-[#808191]">
            Education
          </p>
        </div>

        <div className="block">
          <h3 className="truncate text-left font-epilogue text-[16px] font-semibold leading-[26px] text-white">
            {title}
          </h3>
          <p className="mt-[5px] truncate text-left font-epilogue font-normal leading-[18px] text-[#808191]">
            {description}
          </p>
        </div>

        <div className="mt-[15px] flex flex-wrap justify-between gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue text-[14px] font-semibold leading-[22px] text-[#b2b3bd]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] truncate font-epilogue text-[12px] font-normal leading-[18px] text-[#808191] sm:max-w-[120px]">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue text-[14px] font-semibold leading-[22px] text-[#b2b3bd]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] truncate font-epilogue text-[12px] font-normal leading-[18px] text-[#808191] sm:max-w-[120px]">
              Days Left
            </p>
          </div>
        </div>

        <div className="mt-[20px] flex items-center gap-[12px]">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#13131a]">
            <img
              src={thirdweb}
              alt="user"
              className="h-1/2 w-1/2 object-contain"
            />
          </div>
          <p className="flex-1 truncate font-epilogue text-[12px] font-normal text-[#808191]">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
