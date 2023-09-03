import Error from "../common/Error";
import Loading from "../common/Loading";
import { useMatch, useMatches } from "../../hooks/useMatches";
import { Match } from "../../api/types";
import { usePreferences } from "../../hooks/usePreferences";

export function MatchCard(props: Match) {
  const { data: match, refetch } = useMatch(props.id, props);

  return (
    <div className="flex-col flex border p-2 shrink-0 min-w-[300px]">
      <div className="flex justify-between">
        <span className="text-bold p-1 self-start rounded  border">
          {match?.sportName}
        </span>
        <button className="ml-auto" onClick={()=>refetch()}>Refresh</button>
      </div>
      {match?.location}

      <ul>
        {match?.score &&
          Object.entries(match?.score).map(([teamName, score]) => (
            <li key={teamName}>
              {teamName} - {score}{" "}
            </li>
          ))}
      </ul>
    </div>
  );
}

function sortByNewest(matchA: Match, matchB: Match): number {
  const dateA = new Date(matchA.endsAt).getTime();
  const dateB = new Date(matchB.endsAt).getTime();

  return dateB - dateA;
}

export function LiveGames() {
  const { data: matches, isLoading, isError } = useMatches();
  const { data: preferences } = usePreferences();
  if (isError) {
    <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const shouldDisplayMatch = (match: Match) => {
    if (preferences?.hasPreferences) {
      return (
        preferences.favorateTeams.some(({ id: teamId }) =>
          match.teams.some((team) => team.id == teamId)
        ) &&
        preferences.favorateSports.some(
          ({ name: sportName }) => match.sportName == sportName
        )
      );
    }
    return true;
  };
  return (
    <div className="flex gap-2 overflow-x-scroll">
      {matches
        ?.sort(sortByNewest)
        .filter(shouldDisplayMatch)
        .slice(0, 5)
        .map((match) => (
          <MatchCard key={match.id} {...match} />
        ))}
    </div>
  );
}
