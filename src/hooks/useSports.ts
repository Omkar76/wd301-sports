import { useQuery } from "react-query";
import { sportsFetcher } from "../api/sports";

export const useSports = () =>
  useQuery(["sports"], sportsFetcher, { refetchOnMount: false });
