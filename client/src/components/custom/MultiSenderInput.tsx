import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormField from "./FormField";

type InputType = {
  address: string;
  amount: string;
  name: string;
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
  const handleChange = (
    type: "address" | "amount" | "name",
    newValue: string,
  ) => {
    setValue((prev) =>
      prev.map((item, index) =>
        index === idx ? { ...item, [type]: newValue } : item,
      ),
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setValue((prev) => prev.filter((_, index) => index !== idx));
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-6 p-2">
        <FormField
          inputType="text"
          placeholder="Enter the Name..."
          value={value.name}
          handleChange={(e) => handleChange("name", e.target.value)}
        />
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
          className="flex aspect-square items-center justify-center rounded-sm bg-red-500/80 outline-none hover:bg-red-500"
        >
          <FontAwesomeIcon className="size-4 flex-1 p-2" icon={faMinus} />
        </button>
      )}
    </div>
  );
}
