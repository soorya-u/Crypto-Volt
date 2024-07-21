import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useStateContext } from "@/context/thirdweb";
import { CountBox, CustomButton, Loader } from "@/components/custom";
import { calculateBarPercentage, daysLeft } from "@/utils";
import { thirdweb } from "@/assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [donators, setDonators] = useState<any[]>([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, name, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="mt-10 flex w-full flex-col gap-[30px] md:flex-row">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="h-[410px] w-full rounded-xl object-cover"
          />
          <div className="relative mt-2 h-[5px] w-full bg-[#3a3a43]">
            <div
              className="absolute h-full bg-[#406be9]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected,
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex w-full flex-wrap justify-between gap-[30px] md:w-[150px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-[2] flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row flex-wrap items-center gap-[14px]">
              <div className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full bg-[#2c2f32]">
                <img
                  src={thirdweb}
                  alt="user"
                  className="h-[60%] w-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="break-all font-epilogue text-[14px] font-semibold text-white">
                  {state.name} - {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue text-[12px] font-normal text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="text-justify font-epilogue text-[16px] font-normal leading-[26px] text-[#808191]">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex items-center justify-between gap-4"
                  >
                    {/* TODO: Add Donator Name */}
                    <p className="break-ll font-epilogue text-[16px] font-normal leading-[26px] text-[#b2b3bd]">
                      {index + 1}. {item.donatorName} - {item.donatorAddress}
                    </p>
                    <p className="break-ll font-epilogue text-[16px] font-normal leading-[26px] text-[#808191]">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-justify font-epilogue text-[16px] font-normal leading-[26px] text-[#808191]">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue text-[18px] font-semibold uppercase text-white">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col rounded-[10px] border border-white/40 bg-[#141025] p-4">
            <p className="fount-medium text-center font-epilogue text-[20px] leading-[30px] text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px] flex flex-col gap-4">
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-[10px] border-[1px] border-[#3a3a43] bg-transparent px-[15px] py-[10px] font-epilogue text-[18px] leading-[30px] text-white outline-none placeholder:text-[#4b5264] sm:px-[20px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full rounded-[10px] border-[1px] border-[#3a3a43] bg-transparent px-[15px] py-[10px] font-epilogue text-[18px] leading-[30px] text-white outline-none placeholder:text-[#4b5264] sm:px-[20px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#406be9]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
