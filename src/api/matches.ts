import { Match, MatchDetails } from "./types";
import { API_ENDPOINT } from "../constants";

export const matchesFetcher = async () => {
  const res = await fetch(`${API_ENDPOINT}/matches`);
  const { matches } = await res.json();
  return matches as Match[];
};

export const matchFetcher = async (matchId: Match["id"]) => {
  const res = await fetch(`${API_ENDPOINT}/matches/${matchId}`);
  return (await res.json()) as MatchDetails;
};
