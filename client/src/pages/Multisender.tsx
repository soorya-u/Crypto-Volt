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
      <div className="relative my-2 flex flex-col gap-y-4">
        <h1 className="pl-4 text-left font-epilogue text-[18px] font-semibold text-white">
          Multi-Sender
        </h1>

        <h3 className="pl-4 text-left font-epilogue text-[16px] font-semibold text-white">
          Enter the Credentials and Amount to be Sent
        </h3>

        <label htmlFor="isEqualSender" className="flex items-center pl-4">
          <input
            value={`${isEqualAmount}`}
            onChange={() => setIsEqualAmount((prev) => !prev)}
            type="checkbox"
            name="isEqualSender"
            className="accent-[#406be9] outline-none"
          />
          <h3 className="pl-4 text-left font-epilogue text-[16px] font-semibold text-white">
            Send the Money Equally
          </h3>
        </label>
        {sent && (
          <div className="absolute -top-20 left-0 right-0 z-40 mx-auto flex h-16 w-[80%] items-center justify-center rounded-lg border-[2px] border-white bg-[#406ae986] opacity-90">
            <p className="font-epilogue text-[16px] font-semibold leading-[26px] text-white">
              Transaction has been Completed
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col">
        <div className="flex w-full flex-col gap-4">
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
              className="flex aspect-square size-10 items-center justify-center rounded-sm bg-[#406be9]/80 outline-none hover:bg-[#406be9]"
            >
              <FontAwesomeIcon className="size-4 flex-1 p-2" icon={faPlus} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
