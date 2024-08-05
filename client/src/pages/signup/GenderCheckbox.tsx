import React from "react";
import { UseFormRegister } from "react-hook-form";
import InputErrorMessage from "../../components/inputErrorMessage/InputErrorMessage";

interface TSignUpInputs {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

interface GenderCheckboxProps {
  register: UseFormRegister<TSignUpInputs>;
  errorMessage: undefined | string;
}

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({
  register,
  errorMessage,
}) => {
  return (
    <div className="flex relative">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            {...register("gender", {
              required: { message: "Choose your gender", value: true },
            })}
            type="radio"
            value="male"
            className="radio border-slate-900"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            {...register("gender", {
              required: { message: "Choose your gender", value: true },
            })}
            type="radio"
            value="female"
            className="radio border-slate-900"
          />
        </label>
      </div>
        {errorMessage && <InputErrorMessage message={errorMessage} />}
    </div>
  );
};

export default GenderCheckbox;
