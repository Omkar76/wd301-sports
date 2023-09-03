import { Preferences } from "./types";
import { API_ENDPOINT } from "../constants";

export const preferenceFetcher = async () => {
  const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });

  const { preferences } = await res.json();
  return preferences as Preferences;
};

export const preferenceUpdater = async (newPreferences: Preferences) => {
  const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      preferences: newPreferences,
    }),
  });

  const { preferences } = await res.json();
  return preferences as Preferences;
};
