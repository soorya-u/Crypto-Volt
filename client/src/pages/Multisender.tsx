import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useStateContext } from "@/context/thirdweb";
import { CustomButton, MultiSenderInput } from "@/components/custom";

type InputType = {
  name: string;
  address: string;
  amount: string;
};

export default function Multisender() {
  const { multiSenderEqually, multiSenderByValue } = useStateContext();

  const [isEqualAmount, setIsEqualAmount] = useState(false);
  const [sent, setSent] = useState(false);
  const [input, setInput] = useState<InputType[]>([
    { name: "", address: "", amount: "" },
  ]);

  useEffect(() => {
    if (!sent) return;
    setInput([{ name: "", address: "", amount: "" }]);
    const t = setTimeout(() => setSent(false), 3000);

    return () => clearTimeout(t);
  }, [sent]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setInput((prev) => [...prev, { name: "", address: "", amount: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allName = input.map((i) => i.name);
    const allAddress = input.map((i) => i.address);
    const allAmount = input.map((i) => i.amount);

    const data = isEqualAmount
      ? await multiSenderEqually(allAddress, allAmount[0])
      : await multiSenderByValue(allAddress, allAmount);

    if (data.receipt.confirmations === 1) {
      setSent(true);
    }
  };

  return (
    <>
      <div className="relative flex flex-col gap-y-4 my-2">
        <h1 className="pl-4 font-epilogue font-semibold text-[18px] text-white text-left">
          Multi-Sender
        </h1>

        <h3 className="pl-4 font-epilogue font-semibold text-[16px] text-white text-left">
          Enter the Credentials and Amount to be Sent
        </h3>

        <label htmlFor="isEqualSender" className="flex pl-4 items-center">
          <input
            value={`${isEqualAmount}`}
            onChange={() => setIsEqualAmount((prev) => !prev)}
            type="checkbox"
            name="isEqualSender"
            className="accent-[#406be9] outline-none"
          />
          <h3 className="pl-4 font-epilogue font-semibold text-[16px] text-white text-left">
            Send the Money Equally
          </h3>
        </label>
        {sent && (
          <div className="absolute z-40 -top-20 left-0 right-0 mx-auto bg-[#406ae986] opacity-90 border-[2px] border-white w-[80%] h-16 rounded-lg flex justify-center items-center">
            <p className="font-epilogue font-semibold text-[16px] leading-[26px] text-white">
              Transaction has been Completed
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="w-full flex flex-col gap-4">
          {input.map((val, idx) => (
            <MultiSenderInput
              key={idx}
              idx={idx}
              total={input.length}
              value={val}
              setValue={setInput}
              isEqualAmount={isEqualAmount}
            />
          ))}
          <div className="flex items-center gap-8 py-4">
            <CustomButton
              title="Send ETH"
              btnType="submit"
              styles="bg-[#406be9]/80 outline-none hover:bg-[#406be9]"
            />
            <button
              onClick={handleClick}
              className="size-10 flex justify-center items-center aspect-square rounded-sm bg-[#406be9]/80 hover:bg-[#406be9] outline-none"
            >
              <FontAwesomeIcon className="flex-1 size-4 p-2" icon={faPlus} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
