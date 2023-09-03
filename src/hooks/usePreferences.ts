import { useQuery } from "react-query";
import { preferenceFetcher } from "../api/preferences";

export const usePreferences = () =>
  useQuery(["preferences"], preferenceFetcher, {
    refetchOnMount: false,
  });
