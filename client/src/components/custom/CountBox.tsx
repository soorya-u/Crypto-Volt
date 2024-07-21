type CountBoxProps = {
  title: string;
  value: number | string;
};
const CountBox = ({ title, value }: CountBoxProps) => {
  return (
    <div className="flex w-[150px] flex-col items-center rounded-lg border border-white/20">
      <h4 className="w-full truncate rounded-t-[10px] bg-[#141025] p-3 text-center font-epilogue text-[30px] font-bold text-white">
        {value}
      </h4>
      <p className="rouned-b-[10px] flex w-full flex-1 items-center justify-center bg-white/10 px-3 py-2 text-center font-epilogue text-[16px] font-normal text-[#fff]">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
