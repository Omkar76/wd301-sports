import { useQuery } from "react-query";
import { teamsFetcher } from "../api/teams";

export const useTeams = () =>
  useQuery(["teams"], teamsFetcher, {
    refetchOnMount: false,
  });
