import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
export function Header() {
  const authContext = useContext(AuthContext);
  return (
    <header className="flex items-baseline justify-between">
      <h1>
        <Link to="/">Sports Center</Link>
      </h1>
      <div>
        {authContext?.isAuthenticated && (
          <Link to="/preferences">Preferences</Link>
        )}

        {!authContext?.isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}
