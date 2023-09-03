import { PropsWithChildren, createContext, useState } from "react";
import { Preferences } from "../api/types";
interface IPreferenceContext {
  preferences: Preferences;
  setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
}

export const PreferencesContext = createContext<IPreferenceContext | null>(
  null
);

const defaultPreferences: Preferences = {
  hasPreferences: false,
  favorateSportsIds: [],
  favorateTeamsIds: [],
};

export function PreferencesProvider(props: PropsWithChildren) {
  const [preferences, setPreferences] = useState(defaultPreferences);

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {props.children}
    </PreferencesContext.Provider>
  );
}

// export function updatePreferences(dispatch : React.Dispatch<React.SetStateAction<Preferences>>, preferences : Preferences){
//     fetch(`{API_ENDPOINT}/user/preferences`)
//     .then(res => res.json())
//     .then(preferences => dispatch(preferences));
// }

// type AddSport = { type: "SPORT_ADD", sport: Sport }
// type RemoveSport = { type: "SPORT_REMOVE", sportId: Sport['id'] }

// type AddTeam = { type: "TEAM_ADD", team: Team }
// type RemoveTeam = { type: "TEAM_REMOVE", teamId: Team['id'] }

// type PreferenceAction = AddSport | RemoveSport | AddTeam | RemoveTeam;

// const reducer = (state: Preferences, action: PreferenceAction): Preferences => {
//     switch (action.type) {
//         case "SPORT_ADD":
//             return { ...state, favorateSports: [...state.favorateSports, action.sport] }

//         case "SPORT_REMOVE":
//             return { ...state, favorateSports: state.favorateSports.filter(sport => sport.id != action.sportId) }

//         case "TEAM_ADD":
//             return { ...state, favorateTeams: [...state.favorateTeams, action.team] }

//         case "TEAM_REMOVE":
//             return { ...state, favorateTeams: state.favorateTeams.filter(Team => Team.id != action.teamId) }
//     }
// }
