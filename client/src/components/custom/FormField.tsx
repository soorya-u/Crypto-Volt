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
      | React.ChangeEvent<HTMLInputElement>
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
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
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
          className="py-[15px] sm:px-[25px] px-[15px] bg-gray-700/20 outline-none border-[1px] border-[#3a3a43]  font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] hover:border-green-500/60 focus:border-green-500 disabled:opacity-60 disabled:hover:border-[#3a3a43]"
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
          className="py-[15px] sm:px-[25px] px-[15px] bg-gray-700/20 outline-none border-[1px] border-[#3a3a43]  font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] hover:border-green-500/60 focus:border-green-500 disabled:opacity-60 disabled:hover:border-[#3a3a43]"
        />
      )}
    </label>
  );
};

export default FormField;
