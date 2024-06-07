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
      className={` transition-all font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
