import { useQuery } from "react-query";
import { matchFetcher, matchesFetcher } from "../api/matches";
import { Match, MatchDetails } from "../api/types";

export const useMatches = () => useQuery(["matches"], matchesFetcher);

export const useMatch = (matchId: Match["id"], placeholderMatchData: Match) => {
  return useQuery(["match", matchId], () => matchFetcher(matchId), {
    placeholderData: placeholderMatchData as MatchDetails,
  });
};
