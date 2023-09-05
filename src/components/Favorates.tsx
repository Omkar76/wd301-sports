import { useState } from "react";
import { Article, Sport, Team } from "../api/types";
import { useArticles } from "../hooks/useArticle";
import { usePreferences } from "../hooks/usePreferences";
import { useSports } from "../hooks/useSports";
import { useTeams } from "../hooks/useTeams";
import { Link } from "react-router-dom";
import Select from "react-select";
export default function Favorates() {
  const { data: sports } = useSports();
  const { data: teams } = useTeams();
  const { data: article } = useArticles();
  const { data: preferences } = usePreferences();

  const shouldShowSport = (sport: Sport) => {
    if (preferences?.hasPreferences) {
      return preferences.favorateSports.some(
        ({ id: sportId }) => sport.id === sportId
      );
    }
    return true;
  };
  const shouldShowTeam = (team: Team) => {
    if (preferences?.hasPreferences) {
      return (
        preferences.favorateTeams.some(
          ({ id: teamId }) => team.id === teamId
        ) && team.plays == selectedSport?.name
      );
    }
    return team.plays == selectedSport?.name;
  };

  const [selectedSport, setSelectedSport] = useState<Sport>();
  const [selectedTeam, setSelectedTeam] = useState<Team>();

  const shouldShowArticle = (article: Article) => {
    return (
      article.teams.some(({ id: teamId }) => selectedTeam?.id === teamId) &&
      article.sport.id == selectedSport?.id
    );
  };

  return (
    <div className="sticky top-5 w-80 h-screen self-start ml-auto bg-gray-100 max-h-screen p-2 gap-2 pt-0 overflow-scroll">
      <div className="flex flex-col sticky top-0 bg-inherit pb-2 mx-2">
        <h2 className="text-lg p-2 text-bold shrink-0">Favorates</h2>
        <div className="flex flex-col gap-3">
          <Select
            options={sports?.filter(shouldShowSport)}
            styles={{
              option: (base, state) => {
                return {
                  ...base,
                  backgroundColor: state.isFocused ? "rgb(34 197 94)" : "white",
                  color: state.isFocused ? "white" : "black",
                };
              },
            }}
            value={selectedSport}
            formatOptionLabel={(sport) => sport.name}
            onChange={(newSport) => {
              setSelectedSport(newSport!);
              setSelectedTeam(
                teams?.find((team) => team.plays == newSport?.name)
              );
            }}
          />

          <Select
            options={teams?.filter(shouldShowTeam)}
            styles={{
              option: (base, state) => {
                return {
                  ...base,
                  backgroundColor: state.isFocused ? "rgb(34 197 94)" : "white",
                  color: state.isFocused ? "white" : "black",
                };
              },
            }}
            value={selectedTeam}
            formatOptionLabel={(team) => team.name}
            onChange={(newTeam) => setSelectedTeam(newTeam!)}
          />
        </div>
      </div>

      {article?.filter(shouldShowArticle).map((article) => {
        return (
          <div key={article.id} className="border p-2">
            <h3 className="text-lg font-bold">{article.title}</h3>
            <p className="line-clamp-2">{article.summary}</p>
            <Link
              to={`/articles/${article.id}`}
              className="text-center block w-full border border-green-500 text-green-500 p-2"
            >
              READ MORE
            </Link>
          </div>
        );
      })}
    </div>
  );
}
