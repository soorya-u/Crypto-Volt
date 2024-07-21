type ButtonProps = {
  btnType: "submit" | "reset" | "button" | undefined;
  title: string;
  handleClick: () => void;
  styles: string;
};

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
}: Partial<ButtonProps>) => {
  return (
    <button
      type={btnType}
      className={`min-h-[52px] rounded-[10px] px-4 font-epilogue text-[16px] font-semibold leading-[26px] text-white transition-all ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
