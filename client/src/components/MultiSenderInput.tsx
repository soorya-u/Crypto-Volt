import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormField from "./FormField";

type InputType = {
  address: string;
  amount: string;
};

type MultiSenderProps = {
  value: InputType;
  setValue: React.Dispatch<React.SetStateAction<InputType[]>>;
  idx: number;
  total: number;
  isEqualAmount?: boolean;
};

export default function MultiSenderInput({
  idx,
  setValue,
  value,
  total,
  isEqualAmount,
}: MultiSenderProps) {
  const handleChange = (type: "address" | "amount", newValue: string) => {
    setValue((prev) =>
      prev.map((item, index) =>
        index === idx ? { ...item, [type]: newValue } : item
      )
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setValue((prev) => prev.filter((_, index) => index !== idx));
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex justify-center items-center gap-y-6 gap-x-3 p-2 flex-wrap">
        <FormField
          inputType="text"
          placeholder="Enter the Address..."
          value={value.address}
          handleChange={(e) => handleChange("address", e.target.value)}
        />
        <FormField
          disabled={isEqualAmount && idx > 0}
          inputType="number"
          placeholder="Enter the Amount..."
          value={value.amount}
          handleChange={(e) => handleChange("amount", e.target.value)}
        />
      </div>
      {total > 1 && (
        <button
          onClick={handleClick}
          className="flex outline-none justify-center items-center aspect-square rounded-sm bg-red-500/80 hover:bg-red-500"
        >
          <FontAwesomeIcon className="flex-1 size-4 p-2" icon={faMinus} />
        </button>
      )}
    </div>
  );
}
