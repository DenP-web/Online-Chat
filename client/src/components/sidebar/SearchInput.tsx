import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConvesation";
import useGetConversation from "../../hooks/useGetConversation";

type SearchFormType = {
  search: string
}

const SearchInput = () => {
  const {conversations} = useGetConversation()
  const {setSelectedConversation} = useConversation()

  const {
    register,
    handleSubmit,
  } = useForm<SearchFormType>({
    mode: 'onChange'
  });

  const search = (searchText: string) => {
    return conversations?.find(c => c.fullName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
  }

  const onSubmit = (data: {search: string}) => {
    if(data.search.length < 3) {
      return toast.error('Write more then 3 symbol', {duration: 1200})
    }
    const searchedConversation = search(data.search)
    if(searchedConversation) {
      setSelectedConversation(searchedConversation)
    }else toast.error('Conversation is not found')
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        {...register("search" )}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
