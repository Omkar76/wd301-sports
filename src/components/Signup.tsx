import { useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../constants";
import { AuthResponse } from "../context/auth";
import useAuth from "../hooks/useAuth";

export default function Signup() {
  const authContext = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    authContext?.signout();
  }, [authContext]);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const signupData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(`${API_ENDPOINT}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error("Sinpup failed");
      }

      console.log("Sinpup successful");

      const data: AuthResponse = await response.json();
      authContext?.signin(data);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Sinpup failed:", error);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="text-xl flex flex-col w-[500px] m-auto gap-2 border rounded p-4"
    >
      <h1 className="text-3xl font-bold mb-3">
        <span className="border-b-4 border-b-green-300">Signup</span>
      </h1>

      <label>
        Name
        <input
          type="text"
          name="name"
          className="border block w-full outline-transparent p-2 rounded"
        />
      </label>

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
