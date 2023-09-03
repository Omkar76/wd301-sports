import { createContext } from "react";
import { Sport } from "../api/types";

interface ISportsContext {
  sports: Sport[];
}

export const SportsContext = createContext<ISportsContext | null>(null);
