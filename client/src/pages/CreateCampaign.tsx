import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers, type BigNumber } from "ethers";

import { useStateContext } from "@/context/thirdweb";
import { money } from "@/assets";
import { CustomButton, FormField, Loader } from "@/components/custom";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (
    fieldName: string,
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const f = form;

    if (f.image === "")
      f.image =
        "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjIxMWJhdGNoMTEta2liLTMwNC1jaGFyaXR5XzIuanBn.jpg";

    setIsLoading(true);
    await createCampaign({
      ...f,
      target: ethers.utils.parseUnits(f.target, 18),
    });
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-10">
      {isLoading && <Loader />}
      <div className="flex items-center justify-center p-[16px] sm:min-w-[380px]">
        <h1 className="font-epilogue text-[18px] font-bold leading-[38px] text-white sm:text-[25px]">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-[10px] flex w-full flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <FormField
          isImage
          labelName="Campaign image (optional)"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="mt-[40px] flex items-center justify-center">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#406be9]/80 outline-none hover:bg-[#406be9]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
