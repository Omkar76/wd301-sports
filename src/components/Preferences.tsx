import Error from "./common/Error";
import Loading from "./common/Loading";
import { usePreferences } from "../hooks/usePreferences";
import { useSports } from "../hooks/useSports";
import { useTeams } from "../hooks/useTeams";
import { Preferences } from "../api/types";
import { useMutation, useQueryClient } from "react-query";
import { preferenceUpdater } from "../api/preferences";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import usePreventScroll from "../hooks/usePreventScroll";

export default function Preferences() {
  usePreventScroll();
  const {
    data: preferences,
    isError: preferenceError,
    isLoading: preferenceLoading,
  } = usePreferences();

  const {
    data: sports,
    isError: sportsError,
    isLoading: sportsLoading,
  } = useSports();

  const {
    data: teams,
    isError: teamsError,
    isLoading: teamsLoading,
  } = useTeams();

  const isError = preferenceError || sportsError || teamsError;
  const isLoading = preferenceLoading || sportsLoading || teamsLoading;

  const queryClient = useQueryClient();
  const mutatePreferences = useMutation(
    ["updatePreferences"],
    preferenceUpdater,
    {
      onSuccess: (preferences) => {
        queryClient.setQueryData(["preferences"], preferences);
      },
    }
  );

  const navigate = useNavigate();

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const shouldCheckSport = (sportId: number) => {
    if (!preferences?.hasPreferences) return true;

    return preferences.favorateSports.some(({ id }) => sportId == id);
  };

  const shouldCheckTeam = (teamId: number) => {
    if (!preferences?.hasPreferences) return true;

    return preferences.favorateTeams.some(({ id }) => teamId == id);
  };

  return ReactDOM.createPortal(
    <div
      className="flex justify-center fixed z-10 top-0 bottom-0 left-0 right-0"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="rounded text-md relative flex flex-col bg-white max-w-lg m-auto p-5">
        <div className="flex justify-center border-b pb-2">
          <h2 className="text-2xl font-bold">Preferences</h2>
          <button
            className="p-2 border ml-auto border-red-500 text-red-500 rounded"
            onClick={() => navigate("/")}
          >
            Close
          </button>
        </div>
        <h3 className="text-xl font-bold">Favorate Sports</h3>

        <form
          className="gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            const preferences: Preferences = {
              hasPreferences: true,
              favorateSports: formData
                .getAll("sports")
                .map((sportJSON) => JSON.parse(sportJSON as string)),
              favorateTeams: formData
                .getAll("teams")
                .map((teamJSON) => JSON.parse(teamJSON as string)),
            };

            mutatePreferences.mutate(preferences, {
              onSuccess: () => {
                navigate("/");
              },
            });
          }}
        >
          <div className="flex flex-wrap text-center gap-2">
            {sports?.map((sport) => {
              return (
                <label key={sport.id}>
                  <input
                    type="checkbox"
                    name="sports"
                    value={JSON.stringify(sport)}
                    defaultChecked={shouldCheckSport(sport.id)}
                  />
                  &nbsp;&nbsp;
                  {sport.name}
                </label>
              );
            })}
          </div>
          <h3 className="mt-4 text-xl font-bold">Favorate Teams</h3>
          <div className="flex flex-wrap gap-2 text-center">
            {teams?.map((team) => {
              return (
                <label key={team.id}>
                  <input
                    type="checkbox"
                    name="teams"
                    value={JSON.stringify(team)}
                    defaultChecked={shouldCheckTeam(team.id)}
                  />
                  &nbsp;&nbsp;
                  {team.name}
                </label>
              );
            })}
          </div>

          <button
            type="submit"
            className="p-2 border border-green-500 text-green-500 rounded mt-2"
          >
            Save Preferences
          </button>

          {mutatePreferences.isError && "Failed to save preferences"}
        </form>
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
