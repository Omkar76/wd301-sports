import { Preferences } from "./types";
import { API_ENDPOINT } from "../constants";

export const preferenceFetcher = async () => {
  const token = localStorage.getItem("authToken");

  if(!token){
    return { hasPreferences:false} as Preferences;
  }
  const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  const { preferences } = await res.json();
  return preferences as Preferences;
};

export const preferenceUpdater = async (newPreferences: Preferences) => {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      preferences: newPreferences,
    }),
  });

  const { preferences } = await res.json();
  return preferences as Preferences;
};
