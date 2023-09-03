import { Sport } from "./types";
import { API_ENDPOINT } from "../constants";

export const sportsFetcher = async () => {
  const res = await fetch(`${API_ENDPOINT}/sports`);
  const { sports } = await res.json();
  return sports as Sport[];
};
