import { useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

type SendMessageFormType = {
  message: string;
};

const MessageInput = () => {
  const { sendMessage, loading, isSuccess } = useSendMessage();
  const { reset, register, handleSubmit } = useForm<SendMessageFormType>();

  const onSubmit = (data: { message: string }) => {
    sendMessage(data, reset)
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send message..."
          {...register("message", { minLength: 1 })}
        />

        <button
          type="submit"
          className={`absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer ${
            loading ? "opacity-5" : ""
          }`}
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
