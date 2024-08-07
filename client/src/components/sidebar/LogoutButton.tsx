
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout, loading } = useLogout();

  const logoutHandle = () => logout();

  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner" />
      ) : (
        <button
          className="w-6 h-6 cursor-pointer text-white"
          onClick={logoutHandle}
        >
          <BiLogOut />
        </button>
      )}
    </div>
  );
};

export default LogoutButton;
