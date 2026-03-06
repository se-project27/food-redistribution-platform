import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Food Redistribution</h1>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;