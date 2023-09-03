import NewsCard from "./NewsCard";
import Error from "./common/Error";
import Loading from "./common/Loading";
import { useArticles } from "../hooks/useArticle";
import { usePreferences } from "../hooks/usePreferences";
import { Article, Sport } from "../api/types";
import { useSports } from "../hooks/useSports";
import { useState } from "react";

const yourNewsSport = { id: -1, name: "Your news" };

export default function Articles() {
  const { isError, isLoading, data: articles } = useArticles();
  const { data: preferences } = usePreferences();
  const { data: allSports } = useSports();
  const sportsList = preferences?.favorateSports ?? allSports;
  const [selectedSport, selectSport] = useState<Sport>(yourNewsSport);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const shouldShowArticle = (article: Article) => {
    if (!preferences?.hasPreferences) {
      return true;
    }

    return (
      preferences.favorateSports.some(
        ({ id: sportId }) => sportId == article.sport.id
      ) &&
      preferences.favorateTeams.some(({ id: teamId }) =>
        article.teams.some((team) => team.id == teamId)
      ) &&
      (selectedSport.id == yourNewsSport.id ||
        selectedSport.id == article.sport.id)
    );
  };

  return (
    <div>
      <ul className="flex flex-wrap text-md font-medium text-center border-gray-200">
        <li
          onClick={() => selectSport(yourNewsSport)}
          aria-current="page"
          className={
            "inline-block  p-4 text-green-600  rounded-t-lg" +
            (selectedSport?.id == yourNewsSport.id
              ? "bg-gray-100 border-t border-x rounded-t"
              : "border border-b")
          }
        >
          {yourNewsSport.name}
        </li>

        {sportsList?.map((sport) => (
          <li
            onClick={() => selectSport(sport)}
            aria-current="page"
            className={
              "inline-block  p-4 text-green-600  rounded-t-lg" +
              (selectedSport?.id == sport.id
                ? "bg-gray-100 border-t border-x rounded-t"
                : "border border-b")
            }
          >
            {sport.name}
          </li>
        ))}
      </ul>

      {articles?.filter(shouldShowArticle).map((article) => {
        return <NewsCard {...article} key={article.id} />;
      })}
    </div>
  );
}
