type CountBoxProps = {
  title: string;
  value: number | string;
};
const CountBox = ({ title, value }: CountBoxProps) => {
  return (
    <div className="flex flex-col items-center w-[150px] border border-white/20 rounded-lg ">
      <h4 className="font-epilogue font-bold text-[30px] text-white p-3 bg-[#141025] rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="flex-1 flex justify-center items-center font-epilogue font-normal text-[16px] text-[#fff] bg-white/10 px-3 py-2 w-full rouned-b-[10px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
