import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import InputErrorMessage from "../../components/inputErrorMessage/InputErrorMessage";

export type TLoginInputsValues = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { isSuccess, loading, login } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLoginInputsValues>();

  const onSubmit = (data: TLoginInputsValues) => {
    login(data);
    if (isSuccess) {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative pb-2">
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              {...register("username", {
                required: { value: true, message: "The field is required" },
              })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter username"
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
                  value: true,
                  message: "The field is required min 8 symbol",
                },
              })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter password"
            />
            {errors.password?.message && (
              <InputErrorMessage message={errors.password.message} />
            )}
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block transition-all"
          >
            Don't have an account?
          </Link>
          <div>
          <button
              className={`btn btn-block btn-sm mt-2 ${
                loading ? "opacity-5" : ""
              }`}
              disabled={loading}
            >
              Login{" "}{loading && <span className="loading loading-spinner" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
