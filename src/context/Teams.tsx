import { createContext } from "react";
import { Team } from "../api/types";

interface ITeamsContext {
  teams: Team[];
}

export const TeamsContext = createContext<ITeamsContext | null>(null);
