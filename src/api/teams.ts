import { Team } from "./types";
import { API_ENDPOINT } from "../constants";

export const teamsFetcher = async () => {
  const res = await fetch(`${API_ENDPOINT}/teams`);
  return (await res.json()) as Team[];
};
