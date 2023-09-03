import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext, AuthResponse } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";

export default function Login() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    authContext?.signout();
  }, [authContext]);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      console.log("Sign-in successful");

      const data: AuthResponse = await response.json();
      authContext?.signin(data);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
