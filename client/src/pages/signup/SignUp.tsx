import React from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import InputErrorMessage from "../../components/inputErrorMessage/InputErrorMessage";
import useSingUp from "../../hooks/useSignUp";

export type TSignUpInputs = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
};

const SignUp: React.FC = () => {
  const { signUp, isSuccess, loading } = useSingUp();
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TSignUpInputs>();

  const onSubmit: SubmitHandler<TSignUpInputs> = (data) => {
    signUp(data);
    if (isSuccess) {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative pb-2">
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              {...register("fullName", {
                required: { message: "The field can't be empty)", value: true },
                minLength: 2,
              })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="John Doe"
            />
            {errors.fullName?.message && (
              <InputErrorMessage message={errors.fullName.message} />
            )}
          </div>
          <div className="relative pb-2">
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              {...register("username", {
                required: { message: "The field can't be empty)", value: true },
                minLength: 2,
              })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="johndoe"
            />
            {errors.username?.message && (
              <InputErrorMessage message={errors.username.message} />
            )}
          </div>
          <div className="relative pb-2">
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: {
                  message: "The minimum length is 8 symbol)",
                  value: true,
                },
                minLength: 8,
              })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter password"
            />
            {errors.password?.message && (
              <InputErrorMessage message={errors.password.message} />
            )}
          </div>
          <div className="relative pb-2">
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              {...register("confirmPassword", {
                required: {
                  message: "The minimum length is 8 symbol)",
                  value: true,
                },
                minLength: 8,
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter password"
            />
            {errors.confirmPassword?.message && (
              <InputErrorMessage message={errors.confirmPassword.message} />
            )}
          </div>

          <GenderCheckbox
            register={register}
            errorMessage={errors.gender?.message}
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block transition-all"
          >
            Already have an account?
          </Link>

  
            <button
              className={`btn btn-block btn-sm mt-2 ${
                loading ? "opacity-5" : ""
              }`}
              disabled={loading}
            >
              Sign Up {loading && <span className="loading loading-spinner" />}
            </button>
      
        </form>
      </div>
    </div>
  );
};

export default SignUp;
