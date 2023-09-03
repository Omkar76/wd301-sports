import { FormEvent, useEffect } from "react";
import { AuthResponse } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authContext?.signout();
  }, [authContext]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const loginData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      console.log("Login successful");

      const data: AuthResponse = await response.json();
      authContext?.signin(data);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="text-xl flex flex-col w-[500px] m-auto gap-2 border rounded p-4"
    >
      <h1 className="text-3xl font-bold mb-3">
        <span className="border-b-4 border-b-green-300">Login</span>
      </h1>

      <label>
        Email
        <input
          type="email"
          name="email"
          className="border block w-full outline-transparent p-2 rounded"
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          className="border block w-full outline-transparent p-2 rounded"
        />
      </label>

      <button className="block bg-green-500 p-3 text-white">Submit</button>
    </form>
  );
}
