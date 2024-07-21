import React from "react";

type FormFieldProps = {
  labelName: string;
  placeholder: string;
  inputType: string;
  isTextArea: boolean;
  value: string;
  isImage?: boolean;
  disabled?: boolean;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  isImage,
  disabled,
  handleChange,
}: Partial<FormFieldProps>) => {
  return (
    <label className="flex w-full flex-1 flex-col">
      {labelName && (
        <span className="mb-[10px] font-epilogue text-[14px] font-medium leading-[22px] text-[#808191]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required={!isImage}
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          disabled={disabled}
          className="rounded-[10px] border-[1px] border-[#3a3a43] bg-black/40 px-[15px] py-[15px] font-epilogue text-[14px] text-white outline-none backdrop-blur-sm placeholder:text-[#677087] hover:border-[#406be9]/60 focus:border-[#406be9] disabled:opacity-60 disabled:hover:border-[#3a3a43] sm:min-w-[300px] sm:px-[25px]"
        />
      ) : (
        <input
          required={!isImage}
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          disabled={disabled}
          className="rounded-[10px] border-[1px] border-[#3a3a43] bg-black/40 px-[15px] py-[15px] font-epilogue text-[14px] text-white outline-none backdrop-blur-sm placeholder:text-[#677087] hover:border-[#406be9]/60 focus:border-[#406be9] disabled:opacity-60 disabled:hover:border-[#3a3a43] sm:min-w-[300px] sm:px-[25px]"
        />
      )}
    </label>
  );
};

export default FormField;
