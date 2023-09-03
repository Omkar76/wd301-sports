import { useContext } from "react";
import { Link, NavLink, NavLinkProps } from "react-router-dom";
import { AuthContext } from "../context/auth";
export function Header() {
  const authContext = useContext(AuthContext);

  const activeClass : NavLinkProps['className'] = ({isActive , isPending})=>{
    return isPending ? "" : isActive ? "text-xl text-green-500 border-b border-green-500" : "text-xl text-green-500"
  }

  return (
    <header className="flex items-baseline justify-between border-b border-green-400  mb-4 py-2 gap-4">
      <h1 className="text-5xl font-bold text-green-600 border-2">
        <Link to="/">.sportify</Link>
      </h1>
      <div className="flex gap-4">
        {authContext?.isAuthenticated && (
          <>
          <NavLink  className={activeClass}  to="/preferences">Preferences</NavLink>
          <NavLink  className={activeClass}  to="/login">Logout</NavLink>
          </>
        )}

        {!authContext?.isAuthenticated && (
          <>
            <NavLink className={activeClass}  to="/login">Login</NavLink>
            <NavLink className={activeClass}  to="/signup">Signup</NavLink>
          </>
        )}
      </div>
    </header>
  );
}
